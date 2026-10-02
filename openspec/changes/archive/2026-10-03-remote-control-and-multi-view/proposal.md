## Why

The deck could only be driven from the window that had it open. A presenter needed a dedicated console with a next-slide preview and speaker notes, an audience needed a read-only screen, and a phone remote was impossible without a control channel. Any control channel also had to be locked down, so that only someone holding the presenter's PIN can move the deck.

## What Changes

- Add a presenter console at `/presenter`: current-slide preview, next-slide thumbnail, a jump-to control, the speaker notes, a slide strip, and a remote-pairing panel with a QR code.
- Add a read-only audience view at `/audience` that renders the current slide full-screen with no navigation, zoom, or notes controls.
- Add a phone remote at `/remote` that is gated behind a six-digit PIN before any control is shown, and once paired shows the connection status, the slide counter, a progress bar, large previous/next controls, and a per-slide jump grid.
- Add a session API: `POST /api/session` to create a pairing session, `GET /api/session` to verify a credential, `POST /api/session/command` to apply a navigation command, and `GET /api/session/stream` to stream deck state over Server-Sent Events.
- Gate every command and stream behind a PIN (or a session id): unauthenticated requests receive 401. The PIN is compared in constant time and is never sent to any client or rendered anywhere.
- Synchronize navigation across same-browser windows through a `BroadcastChannel` and across devices through the session state stream.

## Capabilities

### New Capabilities

- `remote-control`: the PIN-authenticated remote-control channel — pairing, the session API, the state stream, and the `/remote` experience

### Modified Capabilities

- `presentation-foundation`: the dual-view system becomes a three-role view system (presenter, audience, remote) with synchronized navigation state

## Impact

- `app/remote/page.tsx` — PIN-gated remote control
- `app/presenter/page.tsx` — presenter console
- `app/audience/page.tsx` — read-only audience view
- `app/api/session/route.ts`, `app/api/session/command/route.ts`, `app/api/session/stream/route.ts` — session API
- `lib/sessionStore.ts` — in-memory session store, PIN handling, command application, listener fan-out
- `lib/presentation/usePresentationChannel.ts` — BroadcastChannel + SSE sync, publish/send
- `lib/presentation/useSlideControls.ts` — role-aware controls, pairing and connection state
- `components/presentation/primitives/PairingPanel.tsx` — remote-pairing QR panel
- `components/presentation/NavigationBar.tsx` — audience/presenter window openers
