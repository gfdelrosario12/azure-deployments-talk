## Purpose

Modifies the presentation-foundation view system from a dual presenter/public view to a three-role view system (presenter, audience, remote) with synchronized navigation state.

## MODIFIED Requirements

### Requirement: Multi-Role Presentation Views
The system SHALL support three roles — presenter, audience, and remote — where the presenter and remote can drive navigation, the audience view is read-only, and navigation state is synchronized across same-browser windows and across devices.

#### Scenario: Rendering the presenter console
- **WHEN** the presenter opens the presenter view
- **THEN** the system renders the current slide preview, the next slide thumbnail, a jump-to control, the speaker notes, a slide strip, and the remote pairing panel

#### Scenario: Rendering the read-only audience view
- **WHEN** a viewer opens the audience view
- **THEN** the system renders the current slide full-screen with no navigation, zoom, or notes controls

#### Scenario: Synchronizing navigation across windows and devices
- **WHEN** the presenter advances a slide
- **THEN** the system propagates the new slide index to other same-browser windows through a broadcast channel and to paired remote devices through the presentation session
