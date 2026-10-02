## 1. Session Store and PIN Authentication

- [x] 1.1 Implement the in-memory session store on `globalThis` with 12-hour expiry
- [x] 1.2 Implement session creation (random id) and active-session resolution
- [x] 1.3 Implement constant-time PIN comparison and the two-credential resolver (PIN or session id)
- [x] 1.4 Apply NEXT/PREV/GOTO commands with bounds clamping and fan the resulting state out to listeners

## 2. Session API

- [x] 2.1 `POST /api/session` — create a pairing session, returning only id/slide/total (never the PIN)
- [x] 2.2 `GET /api/session` — verify a PIN or session id and resolve the live session
- [x] 2.3 `POST /api/session/command` — apply a navigation command, returning 401 for an invalid credential and 400 for a bad action
- [x] 2.4 `GET /api/session/stream` — Server-Sent Events stream of deck state with immediate current-state frame, 25s keepalive ping, and 401 for an invalid credential

## 3. Presentation Channel and Controls

- [x] 3.1 Extend `usePresentationChannel` with BroadcastChannel same-browser sync and a SYNC_REQUEST/SYNC_RESPONSE handshake
- [x] 3.2 Add presenter session pairing on load and the SSE state subscription
- [x] 3.3 Add `publish` (presenter-side) and `send` (remote-side) with optimistic broadcast
- [x] 3.4 Make `useSlideControls` role-aware: read-only audience, publishing presenter/remote, and pairing/connection state

## 4. Views

- [x] 4.1 Build the `/presenter` console: current preview, next thumbnail, jump-to, speaker notes, slide strip, pairing panel, audience opener
- [x] 4.2 Build the read-only `/audience` view with all chrome hidden
- [x] 4.3 Build the `/remote` PIN-gate (six-digit numeric entry, PAIR action) and the paired remote (status, counter, progress, prev/next, jump grid)
- [x] 4.4 Build the `PairingPanel` remote QR (encodes the `/remote` URL, never the PIN)
- [x] 4.5 Add audience and presenter window openers to the navigation bar
