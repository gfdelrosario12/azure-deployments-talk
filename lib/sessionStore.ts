// Shared in-memory store — persists across hot reloads via globalThis

export interface Session {
  id: string;
  pin: string;
  slide: number;
  total: number;
  createdAt: number;
  listeners: Set<ReadableStreamDefaultController>;
}

declare global {
  // eslint-disable-next-line no-var
  var __sessions: Map<string, Session> | undefined;
  // eslint-disable-next-line no-var
  var __pinIndex: Map<string, string> | undefined;
}

export const sessions: Map<string, Session> =
  globalThis.__sessions ?? (globalThis.__sessions = new Map());

export const pinIndex: Map<string, string> =
  globalThis.__pinIndex ?? (globalThis.__pinIndex = new Map());

function randomId(len: number, chars: string) {
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function createSession(total: number): Session {
  const id  = randomId(12, 'abcdefghijklmnopqrstuvwxyz0123456789');
  let pin: string;
  do { pin = randomId(6, '0123456789'); } while (pinIndex.has(pin));

  const session: Session = { id, pin, slide: 0, total, createdAt: Date.now(), listeners: new Set() };
  sessions.set(id, session);
  pinIndex.set(pin, id);

  // Clean up sessions older than 12 hours
  const cutoff = Date.now() - 12 * 60 * 60 * 1000;
  for (const [sid, s] of sessions) {
    if (s.createdAt < cutoff) { pinIndex.delete(s.pin); sessions.delete(sid); }
  }

  return session;
}

export function pushToListeners(session: Session, data: object) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const ctrl of session.listeners) {
    try { ctrl.enqueue(payload); } catch { session.listeners.delete(ctrl); }
  }
}

/** Resolve a session by its id, or by the 6-digit PIN. */
export function resolveSession(idOrPin: string): Session | undefined {
  const id = /^[0-9]{6}$/.test(idOrPin) ? pinIndex.get(idOrPin) : idOrPin;
  if (!id) return undefined;
  return sessions.get(id);
}

/** Apply a command from a remote and fan the new state out to every listener. */
export function applyCommand(
  session: Session,
  cmd: { action: 'NEXT' | 'PREV' | 'GOTO'; slide?: number },
) {
  const last = Math.max(0, session.total - 1);
  let next = session.slide;
  if (cmd.action === 'NEXT') next = Math.min(session.slide + 1, last);
  else if (cmd.action === 'PREV') next = Math.max(session.slide - 1, 0);
  else if (cmd.action === 'GOTO' && typeof cmd.slide === 'number') {
    next = Math.max(0, Math.min(Math.round(cmd.slide), last));
  }
  if (next === session.slide) return session.slide;
  session.slide = next;
  pushToListeners(session, { type: 'STATE', slide: next });
  return next;
}

/** Publish state the presenter changed locally (keyboard, clicks) to all listeners. */
export function publishState(session: Session, slide: number) {
  session.slide = slide;
  pushToListeners(session, { type: 'STATE', slide });
}
