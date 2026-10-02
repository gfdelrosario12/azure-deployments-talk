## Purpose

Recovers the presentation-composition and diagram-engine work that was implemented but not recorded: consistent centred slide composition, a defined type scale with responsive subtext sizing, the collision-free architecture diagram engine, viewport zoom, three new slide primitives, and the browser tab identity. Also corrects the navigation model to match the implementation.

## MODIFIED Requirements

### Requirement: Slide Navigation and State
The system SHALL provide full-screen slide-deck navigation through keyboard shortcuts and on-screen controls, tracking the current slide index and rendering the matching slide. Navigation state is synchronized across same-browser windows and paired devices; URL-hash synchronization is not part of the implementation.

#### Scenario: Advancing a slide
- **WHEN** the user presses the Right Arrow key, Space bar, or PageDown key, or clicks the next control
- **THEN** the system advances to the next slide, clamps at the final slide, and updates the slide counter and progress bar

#### Scenario: Reversing a slide
- **WHEN** the user presses the Left Arrow key, Backspace key, or PageUp key, or clicks the previous control
- **THEN** the system returns to the previous slide, clamps at the first slide, and updates the slide counter and progress bar

#### Scenario: Jumping to the first or last slide
- **WHEN** the user presses the Home key or the End key
- **THEN** the system navigates to the first or last slide respectively

#### Scenario: Toggling presentation chrome
- **WHEN** the user presses N, F, or M
- **THEN** the system toggles the speaker-notes drawer, fullscreen mode, and the navigation bar respectively

### Requirement: Dark Developer Visual Theme and Type Scale
The system SHALL render the deck with a dark developer theme: a near-black background, high-contrast light text, Geist sans and Geist Mono typefaces, a subtle grid backdrop, and cyan/purple/amber/emerald accents, with a defined type scale for headings, body copy, and captions.

#### Scenario: Applying the type scale
- **WHEN** any slide primitive renders body copy, summaries, or bullet points
- **THEN** the system renders them at the `text-sub` size (21.6px) and captions or helper text at the `text-cap` size (16.8px), against headings that use the stock Tailwind steps

### Requirement: Reusable Slide Layout Primitives
The system SHALL provide a set of reusable slide primitives so the deck can compose statements, section headers, text-visual walkthroughs, architecture diagrams, comparisons, interactive question-and-reveal slides, case studies, closing takeaways, image slides, social link slides, and before/after code comparisons, each around a consistent centred composition.

#### Scenario: Rendering a statement slide
- **WHEN** a `statement` slide is active
- **THEN** the system displays centered headline text with an optional subtitle, section chip, motif badge, logos, and a presentation link card, with no competing visual elements

#### Scenario: Rendering a text-visual slide
- **WHEN** a `text-visual` slide is active
- **THEN** the system renders a header, then content blocks (optionally bulleted, accent-styled, or headed with an icon) beside an optional image with affiliations and an optional compact visual-cards sidebar

#### Scenario: Rendering a comparison slide
- **WHEN** a `comparison` slide is active
- **THEN** the system renders two side-by-side panels with distinct accent borders and an optional takeaway banner

#### Scenario: Rendering an interactive question-reveal slide
- **WHEN** a `question-reveal` slide is active
- **THEN** the system presents the question, the option choices, and a reveal control that transitions to the revealed answer and its explanation

#### Scenario: Rendering a code-compare slide
- **WHEN** a `code-compare` slide is active
- **THEN** the system renders two syntax-highlighted code panes labelled before and after, with an optional callout

#### Scenario: Rendering a socials slide
- **WHEN** a `socials` slide is active
- **THEN** the system renders a headline, the speaker identity card, and a grid of social link cards and the presentation card, each with a QR code

### Requirement: Architecture Diagram Engine
The system SHALL render architecture slides as a vector diagram in which nodes are colour-coded cards and edges are routed connectors that never cross an unrelated card. (Replaces the earlier progressive sub-step reveal behaviour, which the implementation does not provide; diagrams render in full.)

#### Scenario: Laying out diagram nodes
- **WHEN** an `architecture` slide renders its diagram
- **THEN** the system places nodes on columns derived from their dependency depth, wraps the flow into at most two bands, and chooses the column count that best fills the available space

#### Scenario: Routing diagram edges
- **WHEN** the diagram renders its edges
- **THEN** the system draws each edge as right-angled runs joined by rounded elbows, tries candidate routes from straight runs through corridor elbows to outer detours, and selects the first route that clears every other card

#### Scenario: Separating parallel edges
- **WHEN** several edges leave or enter the same card
- **THEN** the system fans them onto separate channels and arrowhead mouths so they do not overlap

#### Scenario: Placing edge labels
- **WHEN** an edge carries a label
- **THEN** the system anchors the label in the corridor of its route, in a position that does not overlap any card

#### Scenario: Layering the drawing
- **WHEN** the diagram paints
- **THEN** the system paints edges first, then edge labels, then node cards, so connectors sit behind the components they connect

#### Scenario: Re-laying-out a diagram
- **WHEN** the diagram container is resized
- **THEN** the system re-measures the container and re-lays-out and re-routes the diagram to fill the new aspect ratio

## ADDED Requirements

### Requirement: Responsive Composition and Subtext Sizing
The system SHALL keep every slide composition within the viewport: dense text-visual slides step their body-copy size down a fixed ladder only while the slide is actually overflowing.

#### Scenario: Fitting a dense slide
- **WHEN** a `text-visual` slide's content is taller than the viewport
- **THEN** the system reduces the subtext size one step at a time down the ladder (21.6, 20, 18, 16.8, 15.4 px) and stops at the 15.4px floor rather than clipping content

### Requirement: Viewport Zoom
The system SHALL let the presenter zoom the slide stage uniformly between 0.5x and 2.0x in 0.1 steps, scaled from the centre, with an on-screen zoom control that shows the current zoom percentage.

#### Scenario: Zooming the stage
- **WHEN** the presenter uses the zoom controls
- **THEN** the system scales the entire slide uniformly from its centre and clamps the zoom between the minimum and maximum

#### Scenario: Hiding chrome for the audience
- **WHEN** the deck is in audience mode
- **THEN** the system hides the zoom controls

### Requirement: Browser Tab Title and Favicon
The system SHALL set the browser tab title, meta description, and favicon for the presentation.

#### Scenario: Loading the presentation
- **WHEN** the presentation page loads in a browser
- **THEN** the tab shows the title 'Still on Localhost? - Microsoft Azure Deployment Methodologies' with the Azure App Service favicon
