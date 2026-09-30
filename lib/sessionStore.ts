// Shared in-memory store — persists across hot reloads via globalThis

export interface Session {
  id: string;
  slide: number;
  total: number;
  createdAt: number;
  listeners: Set<ReadableStreamDefaultController>;
}

declare global {
  var __sessions: Map<string, Session> | undefined;
}

export const sessions: Map<string, Session> =
  globalThis.__sessions ?? (globalThis.__sessions = new Map());

/**
 * The single secret that unlocks remote control.
 * Override in production with PRESENTATION_PIN. Never sent to any client.
 */
export const REMOTE_PIN: string = process.env.PRESENTATION_PIN || '040202';

function randomId(len: number, chars: string) {
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function createSession(total: number): Session {
  const id = randomId(12, 'abcdefghijklmnopqrstuvwxyz0123456789');

  const session: Session = { id, slide: 0, total, createdAt: Date.now(), listeners: new Set() };
  sessions.set(id, session);

  // Drop sessions older than 12 hours
  const cutoff = Date.now() - 12 * 60 * 60 * 1000;
  for (const [sid, s] of sessions) {
    if (s.createdAt < cutoff) sessions.delete(sid);
  }

  return session;
}

/** The most recently created session — the live deck the remote should drive. */
export function activeSession(): Session | undefined {
  let latest: Session | undefined;
  for (const s of sessions.values()) {
    if (!latest || s.createdAt > latest.createdAt) latest = s;
  }
  return latest;
}

/** Constant-time-ish compare so the PIN does not leak by response timing. */
function pinMatches(candidate: string): boolean {
  if (typeof candidate !== 'string' || candidate.length !== REMOTE_PIN.length) return false;
  let diff = 0;
  for (let i = 0; i < REMOTE_PIN.length; i++) {
    diff |= candidate.charCodeAt(i) ^ REMOTE_PIN.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Resolve a caller to the live session.
 * Accepts either the secret PIN or a known session id (used by the QR link).
 * Returns undefined for anything else.
 */
export function resolveSession(credential: string): Session | undefined {
  if (!credential) return undefined;
  if (pinMatches(credential)) return activeSession();
  return sessions.get(credential);
}

export function pushToListeners(session: Session, data: object) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const ctrl of session.listeners) {
    try { ctrl.enqueue(payload); } catch { session.listeners.delete(ctrl); }
  }
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
