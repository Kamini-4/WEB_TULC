/**
 * Assessment & Scoring Contracts
 * SOLID:
 * - Single Responsibility: Decouples domain scoring algorithms from rendering and persistence
 * - Open/Closed: Context-specific scoring strategies can be extended without modifying the scoring coordinator
 * - Liskov Substitution: All scoring strategies obey the exact same contract
 */

export type AssessmentContextType = 'dynamic' | 'established' | 'generational';

export interface DomainScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'Critical Lag' | 'Moderate Drag' | 'High Velocity' | 'Sovereign Alignment';
}

export interface AssessmentCalculationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  domains: Record<string, DomainScore>;
  cognitiveTaxAnnualUsd: number;
  primaryRecommendation: string;
}

export interface IAssessmentContextStrategy {
  readonly contextType: AssessmentContextType;
  calculateDomainWeights(): Record<string, number>;
  evaluateRecommendation(percentage: number): string;
  estimateCognitiveTax(percentage: number): number;
}

export interface IAssessmentScorer {
  registerStrategy(strategy: IAssessmentContextStrategy): void;
  calculateScores(
    answers: Record<number, number>,
    context: AssessmentContextType,
    questionsCount: number
  ): AssessmentCalculationResult;
}
