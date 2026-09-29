## Purpose

Defines the presentation system baseline for the 'Still on localhost:8080? Not Anymore!' talk, establishing slide navigation, visual pixel/terminal design tokens, layout primitives, dual presenter/public views, and progressive diagram animations.

## ADDED Requirements

### Requirement: Slide Navigation and URL State Management
The system SHALL provide full-screen slide deck navigation via keyboard shortcuts and URL hash synchronization while maintaining current slide index state across view reloads.

#### Scenario: Advancing slide via keyboard
- **WHEN** user presses the Right Arrow key, Down Arrow key, or Space bar
- **THEN** system advances to the next slide in sequence and updates the URL hash identifier

#### Scenario: Reversing slide via keyboard
- **WHEN** user presses the Left Arrow key, Up Arrow key, or PageUp key
- **THEN** system returns to the previous slide in sequence and updates the URL hash identifier

#### Scenario: Direct navigation via URL hash
- **WHEN** user loads a URL with a specific slide hash parameter `#slide-4`
- **THEN** system renders slide 4 directly and synchronizes internal index state

### Requirement: Pixel-Inspired Developer Visual Theme & Typography
The system SHALL enforce a cohesive developer dark-theme visual design system featuring terminal green/cyan/pink accent palettes, crisp high-contrast monospaced and sans-serif typography, subtle grid pattern backgrounds, and pixel-inspired border/accent tokens.

#### Scenario: Displaying slide background and typography styling
- **WHEN** any slide primitive is rendered
- **THEN** system applies dark terminal background tokens, high-contrast monospace code headers, and crisp readable body text adhering to the defined visual hierarchy

#### Scenario: Displaying the localhost:8080 narrative badge motif
- **WHEN** slide layout header or status bar renders
- **THEN** system displays a styled `localhost:8080` badge motif in the slide perimeter to anchor the talk narrative

### Requirement: Layout Primitives Hierarchy
The system SHALL provide a set of reusable slide layout primitives ensuring varied composition across statement, section, text-visual, architecture diagram, comparison, interactive question, answer reveal, case study, and closing takeaway slides.

#### Scenario: Rendering full-screen statement slide
- **WHEN** a `StatementSlide` component is active
- **THEN** system displays centered, high-contrast headline text with high vertical margin and no competing visual elements for visual breathing room

#### Scenario: Rendering architecture diagram slide
- **WHEN** an `ArchitectureDiagramSlide` component is active
- **THEN** system allocates prominent viewport area for system component blocks while maintaining concise accompanying explanation text

#### Scenario: Rendering comparison slide
- **WHEN** a `ComparisonSlide` component is active
- **THEN** system renders side-by-side or matrix comparison panels with distinct accent borders for contrasting concepts

### Requirement: Dual Presenter View and Speaker Notes Synchronization
The system SHALL support speaker notes containing detailed talk script and cues without displaying the speaker notes on the public presentation view.

#### Scenario: Opening presenter mode window
- **WHEN** speaker toggles presenter view mode or opens presenter window
- **THEN** system renders the current slide view, next slide preview, elapsed timer, and full speaker notes script synchronized with public slide state

#### Scenario: Syncing slide navigation across dual screens
- **WHEN** presenter advances slide in presenter view
- **THEN** public presentation view updates simultaneously to reflect the active slide index

### Requirement: Progressive Technical Architecture Diagrams and Animations
The system SHALL support step-by-step progressive diagram reveals and animations that illustrate component relationships, request paths, and deployment evolutions as slides advance.

#### Scenario: Stepping through progressive diagram stages
- **WHEN** user advances through sub-steps within an architecture diagram slide
- **THEN** system animates the addition of new components, network flows, or container boundaries without resetting existing diagram nodes

### Requirement: Interactive Audience Participation Slide Workflow
The system SHALL provide interactive question and answer reveal slide primitives to facilitate audience polling and case-study guessing.

#### Scenario: Displaying interactive question slide
- **WHEN** an `InteractiveQuestionSlide` is active
- **THEN** system presents the prompt question and option choices with hidden answer highlights

#### Scenario: Triggering answer reveal state
- **WHEN** presenter triggers reveal key or click action on an `AnswerRevealSlide`
- **THEN** system smoothly transitions choices to highlight correct answers and display explanatory breakdown text
