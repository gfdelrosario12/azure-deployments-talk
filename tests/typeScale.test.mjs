// The subtext ladder is what stops dense slides from being clipped, so its two
// guarantees are worth pinning: it never steps when there is room, and it never
// steps past the floor.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SUBTEXT_LADDER_PX, SUBTEXT_FLOOR_PX, nextSubtextStep } from '../lib/presentation/typeScale.ts';

test('nextSubtextStep: holds its size when the slide is not overflowing', () => {
  for (let s = 0; s < SUBTEXT_LADDER_PX.length; s++) {
    assert.equal(nextSubtextStep(s, false), s);
  }
});

test('nextSubtextStep: steps down exactly one size per overflowing render', () => {
  assert.equal(nextSubtextStep(0, true), 1);
  assert.equal(nextSubtextStep(1, true), 2);
  assert.equal(nextSubtextStep(2, true), 3);
});

test('nextSubtextStep: stops at the floor instead of shrinking forever', () => {
  const last = SUBTEXT_LADDER_PX.length - 1;
  assert.equal(nextSubtextStep(last, true), last);
  assert.equal(nextSubtextStep(last + 5, true), last);
});

test('nextSubtextStep: converges from any starting point', () => {
  for (let start = 0; start < SUBTEXT_LADDER_PX.length; start++) {
    let s = start;
    for (let i = 0; i < 50; i++) s = nextSubtextStep(s, true);
    assert.equal(s, SUBTEXT_LADDER_PX.length - 1, `did not settle from ${start}`);
  }
});

test('the ladder is strictly descending, so each step really does reduce height', () => {
  for (let i = 1; i < SUBTEXT_LADDER_PX.length; i++) {
    assert.ok(SUBTEXT_LADDER_PX[i] < SUBTEXT_LADDER_PX[i - 1], `step ${i} did not shrink`);
  }
});

test('the floor is the last rung, and is still a readable body size', () => {
  assert.equal(SUBTEXT_FLOOR_PX, SUBTEXT_LADDER_PX[SUBTEXT_LADDER_PX.length - 1]);
  assert.ok(SUBTEXT_FLOOR_PX >= 15, 'floor fell below a readable body size');
  assert.ok(SUBTEXT_LADDER_PX[0] >= 21, 'top of the ladder is below the target subtext size');
});
