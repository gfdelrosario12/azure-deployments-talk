## Context

The presentation already supported a presenter window and a public window in the same browser. Extending that to a phone remote requires a server-held session, because the phone and the presenter may be on different devices. The remote must be useless to anyone who does not have the PIN, and the PIN must not be exposed to any client — not in the pairing QR, not in an API response, and not by response timing.

## Goals / Non-Goals

**Goals:**
- A presenter console with a next-slide preview and the full speaker script.
- A read-only audience screen with no controls.
- A phone remote that only works after entering the correct PIN.
- Navigation state that stays in sync across same-browser windows and paired devices.
- A PIN that is never disclosed to any client and is compared in constant time.

**Non-Goals:**
- Multi-presenter collaboration (one live session drives the deck).
- Persisting sessions across server restarts (the store is in-memory and survives hot reloads via `globalThis`).
- Rendering the PIN anywhere in the UI.

## Decisions

- **Server-held session state.** `lib/sessionStore.ts` keeps sessions in an in-memory `Map` on `globalThis` (so it survives Next.js hot reloads). Each session holds the current slide, the total, a creation time, and a set of SSE listeners. Sessions older than 12 hours are dropped. Rationale: the server is the single source of truth that both the presenter and the remote subscribe to.
- **Two credentials, one resolver.** A caller is resolved to the live session by either the secret PIN (which resolves to the most recently created session) or a session id (used by the pairing QR link). `resolveSession` accepts both; anything else is rejected. Rationale: the PIN is what a human types; the session id is what a QR link can carry.
- **Constant-time PIN comparison.** `pinMatches` length-checks then XORs every character, so the PIN does not leak through response timing. Rationale: a plain string equality short-circuits and leaks the prefix length.
- **PIN never leaves the server.** `POST /api/session` returns only the session id, slide, and total — never the PIN. The pairing QR encodes the `/remote` URL, not the PIN. The remote prompts for the PIN and presents it only to `/api/session` verification and `/api/session/command`. Rationale: the PIN is a shared secret between the presenter and their own devices.
- **Optimistic remote updates.** The remote applies NEXT/PREV/GOTO locally before the server confirms, so control feels instant, then POSTs the command. Rationale: the remote is on a phone on a possibly-latent network.
- **SSE for state, keepalive for proxies.** `GET /api/session/stream` sends the current state immediately on connect, then a `: ping` comment every 25 seconds so proxies do not drop the connection. Rationale: Server-Sent Events give the server a push channel to every paired remote with no polling.
- **BroadcastChannel for same-browser sync.** A `presentation-sync` channel carries GOTO/NEXT/PREV/SYNC messages between same-browser windows; non-presenter windows request a sync on load and the presenter answers. Rationale: same-browser windows need no server round-trip.
- **Role-aware controls.** `useSlideControls` takes a role; the audience role is read-only (keyboard handler returns early), and the presenter and remote roles publish their moves. Rationale: one hook drives all three views with the right permissions.

## Risks / Trade-offs

- **In-memory, single-process state.** Sessions do not survive a server restart and are not shared across horizontally-scaled instances. Acceptable for a single-presenter talk; the default PIN is overridden in production via `PRESENTATION_PIN`.
- **Default PIN.** The fallback PIN is a constant (`040202`); it must be overridden with `PRESENTATION_PIN` in production. The remote is useless without it, but a known default is still a weak secret.
- **Optimistic updates can diverge.** If the server rejects a command, the remote's optimistic state can drift until the next SSE `STATE` frame corrects it.
