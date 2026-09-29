## 1. Visual System & Design Token Setup

- [x] 1.1 Configure pixel/terminal theme tokens, dark palette, crisp monospace font stack, and retro border/accent utilities in CSS/Tailwind
- [x] 1.2 Define presentation data types, slide metadata interfaces, and sub-step action models in `lib/presentation/types.ts`

## 2. Navigation Architecture & Presenter Sync Engine

- [x] 2.1 Implement `useSlideControls` hook supporting keyboard navigation (Left/Right/Space/PageUp/PageDown), sub-step advancement, and URL hash synchronization
- [x] 2.2 Build cross-window `BroadcastChannel` synchronization layer for presenter view state sync (`azure_deck_sync`)
- [x] 2.3 Create `PresentationViewport` canvas component enforcing 16:9 ratio scaling and full-screen toggle support

## 3. Reusable Presentation Layout Primitives

- [x] 3.1 Build `StatementSlide` layout primitive for high-impact full-screen text and visual breathing room
- [x] 3.2 Build `SectionHeaderSlide` primitive with section counter, title, and topic breadcrumbs
- [x] 3.3 Build `TextVisualSlide` primitive balancing explanation text panels with visual callout cards
- [x] 3.4 Build `ArchitectureDiagramSlide` primitive for step-by-step progressive architecture reveals
- [x] 3.5 Build `ComparisonSlide` primitive for side-by-side matrices and technical trade-off evaluation
- [x] 3.6 Build `InteractiveQuestionSlide` and `AnswerRevealSlide` primitives for audience participation and scenario outcomes
- [x] 3.7 Build `CaseStudySlide` primitive for real-world scenario architecture transitions
- [x] 3.8 Build `ClosingTakeawaySlide` primitive for talk conclusions and resource reference links

## 4. Perimeter UI, Narrative Motif & Presenter View

- [x] 4.1 Build `NavigationBar` featuring the `localhost:8080` pixel badge motif, slide counter, and section progress bar
- [x] 4.2 Build `/presenter` route page with dual-view rendering: active slide preview, next slide preview, speaker notes script container, and presentation timer

## 5. Deck Configuration & Verification

- [x] 5.1 Assemble starter foundation deck configuration in `lib/presentation/slides.ts` demonstrating every slide primitive, progressive diagram steps, and presenter notes
- [x] 5.2 Verify keyboard navigation, URL hash sync, presenter mode sync, and responsive viewport scaling in dev build
