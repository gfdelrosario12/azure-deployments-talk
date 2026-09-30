import { SlideData } from './types';
import { openingSlides } from './openingSlides';
import { cloudBasicsSlides } from './cloudBasicsSlides';
import { vmAppServiceSlides } from './vmAppServiceSlides';
import { functionsSwaSlides } from './functionsSwaSlides';
import { containerSlides } from './containerSlides';
import { aksSpectrumSlides } from './aksSpectrumSlides';
import { caseStudiesSlides } from './caseStudiesSlides';
import { conclusionSlides } from './conclusionSlides';
import { socialsSlides } from './socialsSlides';

export * from './types';
export * from './useSlideControls';
export * from './openingSlides';
export * from './cloudBasicsSlides';
export * from './vmAppServiceSlides';
export * from './functionsSwaSlides';
export * from './containerSlides';
export * from './aksSpectrumSlides';
export * from './caseStudiesSlides';
export * from './conclusionSlides';
export * from './socialsSlides';

export const presentationSlides: SlideData[] = [
  ...openingSlides,
  ...cloudBasicsSlides,
  ...vmAppServiceSlides,
  ...functionsSwaSlides,
  ...containerSlides,
  ...aksSpectrumSlides,
  ...caseStudiesSlides,
  ...conclusionSlides,
  ...socialsSlides,
];