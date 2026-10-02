## Context

The presentation renders at 1:1 CSS pixels and the viewport scales by zoom rather than to a fixed design size, so how much content fits depends on the presenter's window. The previous diagram renderer drew arrows as straight lines between card centres with no collision handling, so flows crossed unrelated cards and parallel edges overlapped. The deck also lacked a defined body-text size, so dense slides clipped at the top and bottom edges of the overflow-hidden stage.

## Goals / Non-Goals

**Goals:**
- Every slide shares a consistent, centred composition that never clips.
- Body copy is large and readable, and shrinks only as far as the floor needed to fit.
- Architecture diagrams route every connector so it clears every unrelated card, with parallel edges fanned apart and labels placed in clear corridors.
- The presenter can zoom the stage to fit any projector or window.
- The three missing slide kinds are available as primitives.

**Non-Goals:**
- Progressive sub-step diagram reveals (the earlier spec described step-by-step reveals; the implementation renders each diagram in full, so that behaviour is removed from the spec rather than built).
- Animated edge flows (the data model carries an `animated` flag, but the renderer does not animate edges; not claimed as a requirement).
- URL-hash navigation (not implemented; navigation is keyboard-, control-, and sync-driven).

## Decisions

- **Measure, don't guess, for subtext.** `TextVisualSlide` measures its own overflow (`scrollHeight > clientHeight`) with `useLayoutEffect` and a `ResizeObserver`, and steps down a fixed, strictly-descending ladder `[21.6, 20, 18, 16.8, 15.4]` px, saturating at a 15.4px floor. Monotonic stepping converges and cannot oscillate. Rationale: a single fixed size cannot be both large and never-clipping across arbitrary window heights.
- **Dependency-depth layout with band wrapping.** Nodes are placed on columns derived from BFS depth and wrapped into at most two bands; the column count is chosen from the reachable range to maximise the fraction of the available box the scaled drawing covers. Rationale: keeps every slide on the same composition and fills the space on any aspect ratio.
- **Tiered edge routing with collision rejection.** Candidate routes are generated in the order a reader expects — straight run, elbow through the corridor beside or below the source, then outer detours — ranked by tier then cost, and the first route that clears every other card (with a cushion) is used. Rationale: a flow can never cross a box, and the most readable route is preferred when nothing is in the way.
- **Fan parallel edges.** Edges sharing a source or target card get their own channel (`SPREAD`) and arrowhead mouth (`FAN`). Rationale: parallel arrows never overlap on the way out or on the way in.
- **Rounded elbows via tangent arcs.** Each right-angle corner becomes an arc whose centre is `from + to − corner`, with the sweep flag selected by the cross product so the arc is tangent to both runs. Rationale: one arrow language — rounded corners, one stroke weight, one arrowhead.
- **Paint connectors behind components.** Edges are painted first, then edge labels, then node cards. Rationale: arrows sit behind the components they connect and a label is never drawn under a neighbouring arrow.
- **Derive label clearance from the one font size.** Edge-label metrics are derived from `EDGE_FS` rather than hardcoded, so the clearance test always matches the rendered text.

## Risks / Trade-offs

- **Smaller text on very short windows.** The densest walkthrough slide reaches the 15.4px floor on windows shorter than ~900px; that slide does not fit at 16.8px either, so the choice is slightly smaller text or clipped text, and clipped text is worse.
- **Geometry is unit-tested, rendering is not.** The routing geometry (`crosses`, `routes`, `routeEdge`, `elbow`, `labelSpot`, `layout`) is covered by `tests/diagramRouting.test.mjs` (including a 100,000-case fuzz of `crosses` against an independent oracle); the SVG rendering itself is not automated-tested.
- **`crosses` is easy to get backwards.** The Liang–Barsky bound direction decides almost every case; the direction of each bound matters and is pinned by the fuzz test.
