/**
 * Assessment Scorer Service
 * SOLID:
 * - Single Responsibility: Mathematical calculation of scores and tax estimation
 * - Open/Closed: Coordinates registered IAssessmentContextStrategy instances
 * - Dependency Inversion: Exposes contract IAssessmentScorer
 */

import { 
  AssessmentCalculationResult, 
  AssessmentContextType, 
  DomainScore, 
  IAssessmentContextStrategy, 
  IAssessmentScorer 
} from '../contracts/assessment';
import { 
  DynamicScaleupContextStrategy, 
  EstablishedEnterpriseContextStrategy, 
  GenerationalHoldingContextStrategy 
} from '../strategies/AssessmentStrategies';

export class AssessmentScorer implements IAssessmentScorer {
  private strategies = new Map<AssessmentContextType, IAssessmentContextStrategy>();

  constructor() {
    this.registerStrategy(new DynamicScaleupContextStrategy());
    this.registerStrategy(new EstablishedEnterpriseContextStrategy());
    this.registerStrategy(new GenerationalHoldingContextStrategy());
  }

  registerStrategy(strategy: IAssessmentContextStrategy): void {
    this.strategies.set(strategy.contextType, strategy);
  }

  calculateScores(
    answers: Record<number, number>,
    context: AssessmentContextType,
    questionsCount: number
  ): AssessmentCalculationResult {
    const strategy = this.strategies.get(context) || this.strategies.get('dynamic')!;
    const weights = strategy.calculateDomainWeights();

    // Default 5 foundational domains
    const domains: Record<string, { total: number; max: number }> = {
      'Cognitive Clarity': { total: 0, max: 0 },
      'Systemic Integrity': { total: 0, max: 0 },
      'Strategic Velocity': { total: 0, max: 0 },
      'Relational Infrastructure': { total: 0, max: 0 },
      'Adaptive Logic Layers': { total: 0, max: 0 }
    };

    let totalScore = 0;
    const maxScore = questionsCount * 5;

    // Distribute answer values across domains based on question indices
    const domainKeys = Object.keys(domains);
    Object.entries(answers).forEach(([indexStr, scoreVal]) => {
      const idx = parseInt(indexStr, 10);
      const score = Number(scoreVal) || 0;
      totalScore += score;

      const targetDomain = domainKeys[idx % domainKeys.length];
      domains[targetDomain].total += score;
      domains[targetDomain].max += 5;
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    // Build structured domain output
    const domainScores: Record<string, DomainScore> = {};
    Object.entries(domains).forEach(([name, data]) => {
      const max = Math.max(1, data.max);
      const weight = weights[name] || 1.0;
      const rawPct = Math.round((data.total / max) * 100);
      const weightedPct = Math.min(100, Math.round(rawPct * weight));

      let status: DomainScore['status'] = 'Critical Lag';
      if (weightedPct >= 80) status = 'Sovereign Alignment';
      else if (weightedPct >= 65) status = 'High Velocity';
      else if (weightedPct >= 45) status = 'Moderate Drag';

      domainScores[name] = {
        name,
        score: data.total,
        maxScore: data.max,
        percentage: weightedPct,
        status
      };
    });

    let grade = 'D - Severe Structural Drag';
    if (percentage >= 85) grade = 'A+ - Sovereign Architecture';
    else if (percentage >= 75) grade = 'A - High Operational Leverage';
    else if (percentage >= 60) grade = 'B - Emerging Systemic Bottleneck';
    else if (percentage >= 45) grade = 'C - Reactive Coordination Friction';

    return {
      totalScore,
      maxScore,
      percentage,
      grade,
      domains: domainScores,
      cognitiveTaxAnnualUsd: strategy.estimateCognitiveTax(percentage),
      primaryRecommendation: strategy.evaluateRecommendation(percentage)
    };
  }
}
