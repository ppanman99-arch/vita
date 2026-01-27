import type { AggregatedESGPortfolio } from '../domain/PersonalESG';

/**
 * Calculate impact score and equivalents from portfolio and footprint data.
 */
export class ImpactCalculatorService {
  /**
   * Impact score 0–100 from total value, green points, and carbon offset.
   */
  calculateImpactScore(params: {
    totalESGValueVnd: number;
    greenPoints: number;
    carbonOffsetTonnes: number;
  }): number {
    const { totalESGValueVnd, greenPoints, carbonOffsetTonnes } = params;
    let score = 0;
    if (totalESGValueVnd >= 100_000_000) score += 35;
    else if (totalESGValueVnd >= 50_000_000) score += 25;
    else if (totalESGValueVnd >= 10_000_000) score += 15;
    else if (totalESGValueVnd > 0) score += 10;
    if (greenPoints >= 5000) score += 35;
    else if (greenPoints >= 1000) score += 25;
    else if (greenPoints >= 200) score += 15;
    else if (greenPoints > 0) score += 5;
    if (carbonOffsetTonnes >= 1) score += 30;
    else if (carbonOffsetTonnes >= 0.2) score += 20;
    else if (carbonOffsetTonnes > 0) score += 10;
    return Math.min(100, score);
  }

  /** Trees equivalent: rough 1 tree ~ 20 kg CO2/year. */
  treesEquivalent(carbonOffsetTonnes: number): number {
    return Math.round((carbonOffsetTonnes * 1000) / 20);
  }

  /** Carbon offset from investment: 1M VND green investment ≈ 0.01 t CO2 offset (simplified). */
  carbonOffsetFromValue(vnd: number): number {
    return (vnd / 1_000_000) * 0.01;
  }
}

export const impactCalculatorService = new ImpactCalculatorService();
