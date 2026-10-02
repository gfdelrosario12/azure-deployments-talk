## 1. Consistent Slide Composition

- [x] 1.1 Recompose every primitive around a centred header / summary / body / highlights composition with compact grouping and reduced spacing
- [x] 1.2 Add the `image` slide primitive for full-bleed image interludes with captions
- [x] 1.3 Add the `socials` slide primitive for the speaker identity card and social/presentation link grid with QR codes
- [x] 1.4 Add the `code-compare` slide primitive with a minimal JS/TS/Dart syntax highlighter and before/after panes

## 2. Type Scale and Responsive Subtext

- [x] 2.1 Define the `text-sub` (21.6px) and `text-cap` (16.8px) type-scale tokens in the Tailwind theme
- [x] 2.2 Implement the responsive subtext ladder in `lib/presentation/typeScale.ts` (strictly descending, 15.4px floor)
- [x] 2.3 Wire `TextVisualSlide` to measure overflow and step the ladder down monotonically via `useLayoutEffect` and `ResizeObserver`
- [x] 2.4 Cover the ladder guarantees in `tests/typeScale.test.mjs`

## 3. Architecture Diagram Engine

- [x] 3.1 Implement dependency-depth node layout with band wrapping in `lib/presentation/diagramRouting.ts`
- [x] 3.2 Choose the column count that best fills the available box aspect
- [x] 3.3 Implement tiered edge routing (straight, corridor elbows, outer detours) with collision rejection and cushion
- [x] 3.4 Fan parallel edges onto separate channels and arrowhead mouths
- [x] 3.5 Render rounded-elbow connectors and place edge labels in clear corridors
- [x] 3.6 Paint edges first, then labels, then node cards, so connectors sit behind components
- [x] 3.7 Build the `DiagramEngine` SVG renderer with colour-coded node types, optional icons, and text wrapping
- [x] 3.8 Re-layout and re-route the diagram when its container is resized (`ResizeObserver`)
- [x] 3.9 Support a secondary 'Containerized Variation' diagram on architecture slides
- [x] 3.10 Cover the routing geometry in `tests/diagramRouting.test.mjs` (including the `crosses` fuzz oracle)

## 4. Viewport Zoom and Browser Identity

- [x] 4.1 Add uniform stage zoom (0.5x–2.0x, 0.1 steps, scaled from the centre) with a zoom control and percentage readout
- [x] 4.2 Hide the zoom controls, navigation bar, and notes drawer in audience mode
- [x] 4.3 Set the browser tab title, meta description, and Azure App Service favicon in the root layout

## 5. Navigation Model Correction

- [x] 5.1 Correct the navigation spec to describe keyboard- and control-driven navigation synchronized across windows and devices, removing the unimplemented URL-hash synchronization
