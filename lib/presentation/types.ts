export type SlideType =
  | 'statement'
  | 'section-header'
  | 'text-visual'
  | 'architecture'
  | 'comparison'
  | 'question-reveal'
  | 'case-study'
  | 'closing-takeaway'
  | 'socials'
  | 'image';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  type?: 'source' | 'compute' | 'storage' | 'network' | 'user' | 'badge';
  status?: 'active' | 'success' | 'warning' | 'neutral';
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface DiagramData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface BaseSlide {
  id: string;
  title: string;
  section: string;
  type: SlideType;
  speakerNotes: string[];
  motifBadge?: string;
}

export interface StatementSlideData extends BaseSlide {
  type: 'statement';
  statement: string;
  subtitle?: string;
  accentColor?: string;
  logos?: { src: string; alt: string; className?: string }[];
  presentationLink?: {
    label: string;
    url: string;
    qrSrc: string;
  };
}

export interface SectionHeaderSlideData extends BaseSlide {
  type: 'section-header';
  sectionNumber?: string;
  description?: string;
}

export interface TextVisualSlideData extends BaseSlide {
  type: 'text-visual';
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  affiliations?: {
    src: string;
    alt: string;
    label?: string;
  }[];
  contentBlocks: {
    heading?: string;
    body: string[];
    highlight?: string;
    /** Renders the block as an emphasised definition panel instead of a code example. */
    accent?: boolean;
  }[];
  visualCards?: {
    title: string;
    items: string[];
    tag?: string;
    badgeColor?: string;
  }[];
}

export interface ArchitectureSlideData extends BaseSlide {
  type: 'architecture';
  summary: string;
  diagram: DiagramData;
  secondaryDiagram?: DiagramData;
  highlights?: string[];
}

export interface ComparisonItem {
  title: string;
  subtitle?: string;
  points: string[];
  tag?: string;
  isPrimary?: boolean;
}

export interface ComparisonSlideData extends BaseSlide {
  type: 'comparison';
  left: ComparisonItem;
  right: ComparisonItem;
  takeaway?: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  count?: string;
}

export interface QuestionRevealSlideData extends BaseSlide {
  type: 'question-reveal';
  question: string;
  options: QuestionOption[];
  revealedAnswer?: string;
  explanation?: string;
}

export interface CaseStudySlideData extends BaseSlide {
  type: 'case-study';
  scenarioTitle: string;
  problemStatement: string;
  solutionItems: string[];
  outcome: string;
}

export interface ClosingTakeawaySlideData extends BaseSlide {
  type: 'closing-takeaway';
  takeaways: {
    title: string;
    description: string;
  }[];
  callToAction?: string;
}

export interface ImageSlideData extends BaseSlide {
  type: 'image';
  image: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  qrSrc: string;
  icon: 'link' | 'linkedin' | 'facebook' | 'globe';
}

export interface SocialsSlideData extends BaseSlide {
  type: 'socials';
  headline: string;
  subline?: string;
  speaker?: {
    src: string;
    alt: string;
    name: string;
    titles: string[];
  };
  socials: SocialLink[];
  presentation: {
    label: string;
    url: string;
    qrSrc: string;
  };
}

export type SlideData =
  | StatementSlideData
  | SectionHeaderSlideData
  | TextVisualSlideData
  | ArchitectureSlideData
  | ComparisonSlideData
  | QuestionRevealSlideData
  | CaseStudySlideData
  | ClosingTakeawaySlideData
  | ImageSlideData
  | SocialsSlideData;
