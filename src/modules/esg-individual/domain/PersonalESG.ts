/** Domain types for ESG Cá nhân (Individual). */

export interface PersonalESGProfile {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  memberSince: string;
  tier: GreenCitizenTier;
  impactScore: number; // 0–100
  totalGreenPoints: number;
  totalESGValue: number; // VND from investments + contributions
  carbonOffsetTonnes: number;
  treesEquivalent: number;
}

export type GreenCitizenTier =
  | 'seed'
  | 'sprout'
  | 'tree'
  | 'forest'
  | 'guardian';

export interface ESGBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'carbon' | 'investment' | 'community' | 'learning' | 'habit';
}

export interface ESGPortfolioItem {
  id: string;
  source: 'capital' | 'investor' | 'consumer';
  name: string;
  amount: number;
  unit: 'VND' | 'points';
  projectOrDescription?: string;
  date: string;
}

export interface AggregatedESGPortfolio {
  totalESGValue: number;
  totalGreenPoints: number;
  carbonOffsetTonnes: number;
  impactScore: number;
  items: ESGPortfolioItem[];
  bySource: {
    capital: number;
    investor: number;
    consumer: number;
  };
}
