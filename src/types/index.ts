export type PartnershipModelId = 'retainer' | 'embedding' | 'diagnostic';

export interface PartnershipPathway {
  id: PartnershipModelId;
  tierNumber: '01' | '02' | '03';
  name: string;
  tagline: string;
  investmentAnchor: string;
  cadence: string;
  thePain: string;
  theDesire: string;
  theOutcome: string;
  deliverables: string[];
  idealClient: string;
}

export type FrictionLevel = 'low' | 'moderate' | 'acute' | 'critical';

export interface DiagnosticLevers {
  decisionVelocity: 'consensus-stalled' | 'hybrid-friction' | 'autonomous-cadence';
  boardAlignment: 'factional-impasse' | 'reactive-review' | 'sovereign-coherence';
  successionResilience: 'single-point-fragile' | 'ad-hoc-bench' | 'multi-tier-runway';
}

export interface DiagnosticResult {
  frictionScore: number;
  frictionLevel: FrictionLevel;
  velocityDragPercent: number;
  primaryVulnerability: string;
  recommendedModel: PartnershipModelId;
  executivePrescription: string;
  boardMemorandumPreview: string;
}

export interface CouncilChamberFellowship {
  city: 'zurich' | 'london' | 'singapore' | 'newyork';
  name: string;
  cohort: string;
  seatLimit: number;
  seatsRemaining: number;
  investment: string;
  benefits: string[];
}

export interface CaseStudy {
  id: string;
  organizationType: string;
  sector: string;
  scale: string;
  challenge: string;
  modelApplied: string;
  interventions: string[];
  quantifiedImpact: {
    primaryMetric: string;
    primaryContext: string;
    secondaryMetric: string;
    secondaryContext: string;
  };
  executiveQuote: {
    quote: string;
    author: string;
    title: string;
  };
}

export interface ConsultationInquiry {
  fullName: string;
  corporateEmail: string;
  role: string;
  organization: string;
  enterpriseScale: string;
  selectedPartnership: PartnershipModelId | 'council-chambers' | 'general';
  frictionNotes: string;
  ndaRequired: boolean;
  meetingPreference: 'virtual-briefing' | 'private-suite' | 'board-session';
}
