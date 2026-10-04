/**
 * Assessment Context Strategies
 * SOLID: Open/Closed Principle
 * Context-specific scoring weights, friction evaluations, and cognitive tax models
 */

import { AssessmentContextType, IAssessmentContextStrategy } from '../contracts/assessment';

export class DynamicScaleupContextStrategy implements IAssessmentContextStrategy {
  readonly contextType: AssessmentContextType = 'dynamic';

  calculateDomainWeights(): Record<string, number> {
    return {
      'Cognitive Clarity': 1.1,
      'Systemic Integrity': 1.0,
      'Strategic Velocity': 1.2,
      'Relational Infrastructure': 0.9,
      'Adaptive Logic Layers': 1.0
    };
  }

  evaluateRecommendation(percentage: number): string {
    if (percentage < 50) {
      return 'Critical Founder Bottleneck: Immediate 72-Hour Severance Protocol required to liberate founder desk from tactical firefighting.';
    }
    if (percentage < 75) {
      return 'Emerging Coordination Friction: Implement Logic Gate Engineering to eliminate verbal approval dependencies.';
    }
    return 'High-Velocity Scaling Substrate: Retain structural discipline with bi-annual drift audits to preserve EBITDA multiples.';
  }

  estimateCognitiveTax(percentage: number): number {
    const lagPercent = Math.max(0, 100 - percentage);
    // Dynamic scaleup: ~$420k - $1.8M annual drag
    return Math.round(350000 + (lagPercent * 14500));
  }
}

export class EstablishedEnterpriseContextStrategy implements IAssessmentContextStrategy {
  readonly contextType: AssessmentContextType = 'established';

  calculateDomainWeights(): Record<string, number> {
    return {
      'Cognitive Clarity': 1.0,
      'Systemic Integrity': 1.2,
      'Strategic Velocity': 0.9,
      'Relational Infrastructure': 1.1,
      'Adaptive Logic Layers': 1.1
    };
  }

  evaluateRecommendation(percentage: number): string {
    if (percentage < 50) {
      return 'Severe Institutional Lag: Cross-divisional decision paralysis draining executive committee yield. Deploy Enterprise Mandate.';
    }
    if (percentage < 75) {
      return 'Bureaucratic Drag: Implement Invariant Decision Filters to bypass iterative slide reviews and status syncs.';
    }
    return 'Institutional Sovereignty: Systemic logic holds command fidelity across business units.';
  }

  estimateCognitiveTax(percentage: number): number {
    const lagPercent = Math.max(0, 100 - percentage);
    // Established enterprise: ~$900k - $4.2M annual drag
    return Math.round(850000 + (lagPercent * 34000));
  }
}

export class GenerationalHoldingContextStrategy implements IAssessmentContextStrategy {
  readonly contextType: AssessmentContextType = 'generational';

  calculateDomainWeights(): Record<string, number> {
    return {
      'Cognitive Clarity': 1.0,
      'Systemic Integrity': 1.3,
      'Strategic Velocity': 0.8,
      'Relational Infrastructure': 1.3,
      'Adaptive Logic Layers': 1.0
    };
  }

  evaluateRecommendation(percentage: number): string {
    if (percentage < 50) {
      return 'Generational Governance Risk: Fiduciary decisions overly tied to personal patriarch/matriarch presence. Succession protocol essential.';
    }
    if (percentage < 75) {
      return 'Trustee Alignment Friction: Establish formal Council logic gates to separate family harmony from operational asset oversight.';
    }
    return 'Generational Moat Intact: Capital governance decoupled from transient operational noise.';
  }

  estimateCognitiveTax(percentage: number): number {
    const lagPercent = Math.max(0, 100 - percentage);
    // Generational holdings: ~$1.2M - $6M annual drag
    return Math.round(1200000 + (lagPercent * 48000));
  }
}
