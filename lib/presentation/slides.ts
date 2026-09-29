import { SlideData } from './types';
import { openingSlides } from './openingSlides';
import { cloudBasicsSlides } from './cloudBasicsSlides';
import { vmAppServiceSlides } from './vmAppServiceSlides';

export * from './types';
export * from './useSlideControls';
export * from './openingSlides';
export * from './cloudBasicsSlides';
export * from './vmAppServiceSlides';

export const presentationSlides: SlideData[] = [
  ...openingSlides,
  ...cloudBasicsSlides,
  ...vmAppServiceSlides,
];
