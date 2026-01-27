import type { AggregatedESGPortfolio, ESGPortfolioItem } from '../domain/PersonalESG';
import { capitalService } from '@/modules/member/application/CapitalService';
import { getUserGreenPoints } from '@/lib/greenPoints/service';
import { impactCalculatorService } from './ImpactCalculatorService';

const DEMO_USER = 'demo-user';

function getUserId(): string {
  if (typeof window === 'undefined') return DEMO_USER;
  return sessionStorage.getItem('user_id') || localStorage.getItem('user_id') || DEMO_USER;
}

/**
 * Aggregate ESG-related data from all related modules for the individual's ESG dashboard.
 *
 * Data sources:
 * - Member Capital (CapitalService.getPortfolio): góp vốn HTX, total value and investments.
 * - Green Points (getUserGreenPoints): điểm xanh từ tiêu dùng, tích lũy.
 * - Carbon offset: derived from capital value (ImpactCalculatorService.carbonOffsetFromValue).
 * - Future: investor/ESG enterprise investments (bySource.investor), carbon offset from actions (e.g. redeem points for trees).
 */
export class ESGInvestmentAggregatorService {
  async getAggregatedESGPortfolio(userId?: string): Promise<AggregatedESGPortfolio> {
    const uid = userId || getUserId();

    const [portfolio, greenPointsData] = await Promise.all([
      capitalService.getPortfolio(uid),
      getUserGreenPoints(uid),
    ]);

    const totalGreenPoints = greenPointsData?.totalPoints ?? greenPointsData?.availablePoints ?? 0;
    const totalESGValue = portfolio.totalCurrentValue;
    const carbonOffsetTonnes = impactCalculatorService.carbonOffsetFromValue(portfolio.totalCurrentValue);

    const items: ESGPortfolioItem[] = [];

    portfolio.investments.forEach((inv) => {
      items.push({
        id: inv.id,
        source: 'capital',
        name: inv.projectName,
        amount: inv.currentValue,
        unit: 'VND',
        projectOrDescription: inv.cooperative,
        date: inv.investedAt,
      });
    });

    if (totalGreenPoints > 0) {
      items.push({
        id: 'gp-1',
        source: 'consumer',
        name: 'Điểm Xanh',
        amount: totalGreenPoints,
        unit: 'points',
        date: new Date().toISOString(),
      });
    }

    const impactScore = impactCalculatorService.calculateImpactScore({
      totalESGValueVnd: totalESGValue,
      greenPoints: totalGreenPoints,
      carbonOffsetTonnes,
    });

    return {
      totalESGValue,
      totalGreenPoints,
      carbonOffsetTonnes,
      impactScore,
      items,
      bySource: {
        capital: portfolio.totalCurrentValue,
        investor: 0,
        consumer: totalGreenPoints,
      },
    };
  }
}

export const esgInvestmentAggregatorService = new ESGInvestmentAggregatorService();
