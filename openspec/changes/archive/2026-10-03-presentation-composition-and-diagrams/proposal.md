## Why

The deck's slides were composed inconsistently: dense walkthrough slides overflowed and clipped on short projector windows, spacing was awkward, typography had no defined scale, and the architecture diagrams had no collision-aware routing — arrows crossed unrelated cards and parallel arrows stacked on top of each other. There was also no way to zoom the stage, and three slide kinds the talk needed (image interludes, a social-links outro, and before/after code comparisons) had no primitive. The browser tab also had no title or favicon.

## What Changes

- Recompose every slide primitive around a consistent, centred composition: a header, a tight summary, the body, and optional highlights, with compact grouping of related content and reduced spacing.
- Introduce a defined type scale (`text-sub` 21.6px for body copy, `text-cap` 16.8px for captions) and a responsive subtext ladder that steps dense slides down only while they actually overflow, so content is never clipped.
- Replace the diagram rendering with an architecture diagram engine: dependency-depth layout wrapped into bands, a column count chosen to fill the available space, tiered edge routing that never crosses an unrelated card, parallel-edge fanning, rounded elbows, collision-free label placement, connectors painted behind the components, and re-layout on container resize.
- Add viewport zoom (0.5x–2.0x, 0.1 steps, uniform scale from the centre).
- Add three slide primitives: `image`, `socials`, and `code-compare` (with a small syntax highlighter).
- Set the browser tab title, meta description, and favicon.
- Correct the navigation model: navigation is keyboard- and control-driven and synchronized across windows and devices; the previously specified URL-hash synchronization is not part of the implementation and is removed from the spec.

## Capabilities

### New Capabilities

(none — this change modifies the existing presentation foundation)

### Modified Capabilities

- `presentation-foundation`: composition, type scale, diagram engine, zoom, the three new primitives, tab title/favicon, and the corrected navigation model

## Impact

- `components/presentation/primitives/*` — recomposed slides; new `ImageSlide`, `SocialsSlide`, `CodeCompareSlide`
- `components/presentation/DiagramEngine.tsx` — new diagram renderer
- `components/presentation/PresentationViewport.tsx` — zoom controls and centred stage
- `lib/presentation/diagramRouting.ts` — layout and edge-routing geometry (unit-tested in `tests/diagramRouting.test.mjs`)
- `lib/presentation/typeScale.ts` — subtext ladder (unit-tested in `tests/typeScale.test.mjs`)
- `app/globals.css` — `text-sub` / `text-cap` type-scale tokens
- `app/layout.tsx` — tab title, description, favicon
