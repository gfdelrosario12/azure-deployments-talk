export type SlideType =
  | 'statement'
  | 'section-header'
  | 'text-visual'
  | 'architecture'
  | 'comparison'
  | 'question-reveal'
  | 'case-study'
  | 'closing-takeaway';

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
}

export interface SectionHeaderSlideData extends BaseSlide {
  type: 'section-header';
  sectionNumber?: string;
  description?: string;
}

export interface TextVisualSlideData extends BaseSlide {
  type: 'text-visual';
  contentBlocks: {
    heading?: string;
    body: string[];
    highlight?: string;
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

export type SlideData =
  | StatementSlideData
  | SectionHeaderSlideData
  | TextVisualSlideData
  | ArchitectureSlideData
  | ComparisonSlideData
  | QuestionRevealSlideData
  | CaseStudySlideData
  | ClosingTakeawaySlideData;
