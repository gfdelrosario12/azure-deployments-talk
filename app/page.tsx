'use client';

import { PresentationViewport } from '@/components/presentation/PresentationViewport';
import { presentationSlides } from '@/lib/presentation/slides';

export default function PresentationPage() {
  return <PresentationViewport slides={presentationSlides} />;
}
