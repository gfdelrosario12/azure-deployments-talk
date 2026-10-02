/**
 * Subtext sizing for height-constrained slides.
 *
 * The deck renders at 1:1 CSS pixels (PresentationViewport scales by `zoom`, not
 * to a design size), so how much subtext fits depends on the presenter's window,
 * not just on the slide. A single fixed size therefore cannot both be large and
 * never clip: on a short window the densest walkthrough slides overflow at any
 * size, and they already overflowed slightly at the original 16.8px.
 *
 * So subtext starts at the size the deck's type scale wants and steps down this
 * ladder only while the slide is actually overflowing. Stepping is monotonic,
 * which means it converges and cannot oscillate.
 */
export const SUBTEXT_LADDER_PX = [21.6, 20, 18, 16.8, 15.4] as const;

/** 15.4px is the last step, and it is only reached by the densest walkthrough
 *  slide (aks-full-deployment) on a window shorter than ~900px. That slide does
 *  not fit at 16.8px either -- it overflowed before this scale existed -- so the
 *  choice there is slightly smaller text or clipped text, and clipped wins no
 *  argument. Everything else stops at 16.8px or higher. */
export const SUBTEXT_FLOOR_PX = 15.4;

/** Next ladder index. Returns `current` unchanged when there is room to spare, or
 *  when the floor is already reached. */
export function nextSubtextStep(current: number, overflowing: boolean): number {
  if (!overflowing) return current;
  return Math.min(current + 1, SUBTEXT_LADDER_PX.length - 1);
}
