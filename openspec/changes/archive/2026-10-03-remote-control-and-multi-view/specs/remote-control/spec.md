## Purpose

Defines the PIN-authenticated remote-control capability: pairing, the session API, the state stream, command application, and the phone remote experience, with the PIN never disclosed to any client.

## ADDED Requirements

### Requirement: PIN-Authenticated Remote Control
The system SHALL provide a phone remote that is gated behind a six-digit PIN before any control is shown, and once paired lets the holder advance, reverse, and jump to slides.

#### Scenario: Requesting control
- **WHEN** a viewer opens the remote view
- **THEN** the system renders a PIN-entry form (six-digit numeric input, a PAIR action enabled only when six digits are entered) and does not show any navigation control until a valid PIN is presented

#### Scenario: Rejecting an invalid PIN
- **WHEN** the viewer submits an incorrect PIN
- **THEN** the system displays an error and does not pair

#### Scenario: Controlling the deck once paired
- **WHEN** a valid PIN is presented
- **THEN** the system shows the connection status, the current slide counter and total, a progress bar, large previous and next controls, and a per-slide jump grid, and applies navigation optimistically before the server confirms

### Requirement: Session Pairing
The system SHALL let the presenter create a pairing session and let a remote resolve the live session by PIN or by a session id carried in the pairing link.

#### Scenario: Creating a pairing session
- **WHEN** the presenter view loads
- **THEN** the system creates a session and returns only the session id, the current slide, and the total — never the PIN — and renders a pairing QR that encodes the remote URL

#### Scenario: Resolving the live session
- **WHEN** a caller presents a credential
- **THEN** the system resolves the most recently created session when the credential is the PIN, or the matching session when the credential is a session id, and rejects anything else

### Requirement: Command Application and State Sync
The system SHALL apply navigation commands to the live session and push the resulting state to every listener.

#### Scenario: Applying a command
- **WHEN** a paired remote sends NEXT, PREV, or GOTO
- **THEN** the system validates the action, clamps the target slide to the deck bounds, updates the session, and returns the new slide index

#### Scenario: Streaming deck state
- **WHEN** a client subscribes to the session stream
- **THEN** the system sends the current state immediately, keeps the connection alive with a periodic ping, and pushes a state frame whenever the slide changes

#### Scenario: Synchronizing same-browser windows
- **WHEN** the presenter advances a slide in one window
- **THEN** other same-browser windows receive the new slide index through a broadcast channel, and windows that load after the presenter request a sync

### Requirement: PIN Security
The system SHALL keep the PIN secret: it is compared in constant time, never returned by any endpoint, never rendered in any view, and every command and stream request without a valid credential is rejected.

#### Scenario: Comparing the PIN
- **WHEN** a credential is checked against the PIN
- **THEN** the system length-checks and compares every character without short-circuiting, so the PIN does not leak through response timing

#### Scenario: Rejecting unauthenticated requests
- **WHEN** a command or stream request carries no valid PIN or session id
- **THEN** the system rejects it with an unauthorized response
