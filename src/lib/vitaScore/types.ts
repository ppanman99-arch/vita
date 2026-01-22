// VITA Score System Types

export type VitaScoreTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface VitaScore {
  userId: string;
  score: number; // 0-1000
  tier: VitaScoreTier;
  previousScore: number;
  lastUpdated: string;
  
  // Breakdown
  breakdown: {
    vitality: number; // Tuân thủ quy trình sản xuất
    integrity: number; // Chất lượng sản phẩm
    trust: number; // Thanh toán đúng hạn
    account: number; // Báo cáo đầy đủ
  };
  
  // Stats
  stats: {
    complianceRate: number; // % tuân thủ SOP
    qualityScore: number; // Điểm chất lượng
    paymentOnTime: number; // % thanh toán đúng hạn
    reportCompleteness: number; // % báo cáo đầy đủ
  };
  
  // History
  history: VitaScoreChange[];
}

export interface VitaScoreChange {
  id: string;
  userId: string;
  change: number; // + or -
  reason: string;
  category: 'compliance' | 'quality' | 'payment' | 'report' | 'training' | 'bonus';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface VitaGreenLink {
  userId: string;
  
  // VITA → Green Points
  vitaBonusMultiplier: number; // Multiplier dựa trên VITA Score
  monthlyVitaBonus: number; // Bonus hàng tháng từ VITA Score
  
  // Green Points → VITA
  greenPointsUsedForTraining: number; // GP đã dùng để đào tạo
  vitaScoreFromTraining: number; // VITA Score tăng từ đào tạo
  
  // Combined benefits
  combinedTier: CombinedTier;
  benefits: CombinedBenefit[];
}

export type CombinedTier = 
  | 'bronze-bronze' | 'bronze-silver' | 'bronze-gold'
  | 'silver-bronze' | 'silver-silver' | 'silver-gold' | 'silver-platinum'
  | 'gold-silver' | 'gold-gold' | 'gold-platinum' | 'gold-diamond'
  | 'platinum-gold' | 'platinum-platinum' | 'platinum-diamond'
  | 'diamond-platinum' | 'diamond-diamond';

export interface CombinedBenefit {
  id: string;
  name: string;
  description: string;
  vitaRequirement: number;
  greenPointsRequirement: number;
  unlocked: boolean;
  category: 'discount' | 'priority' | 'credit' | 'access' | 'special';
}

// VITA Score thresholds
export const VITA_SCORE_THRESHOLDS: Record<VitaScoreTier, { min: number; max: number; name: string; bonusMultiplier: number }> = {
  diamond: { min: 950, max: 1000, name: 'Kim Cương', bonusMultiplier: 1.5 },
  platinum: { min: 850, max: 949, name: 'Bạch Kim', bonusMultiplier: 1.3 },
  gold: { min: 700, max: 849, name: 'Vàng', bonusMultiplier: 1.2 },
  silver: { min: 500, max: 699, name: 'Bạc', bonusMultiplier: 1.1 },
  bronze: { min: 0, max: 499, name: 'Đồng', bonusMultiplier: 1.0 },
};

// Green Points → VITA Score conversion
export const GREEN_POINTS_TO_VITA = {
  training: {
    basic: { points: 500, vitaScore: 5 },
    advanced: { points: 1000, vitaScore: 10 },
    expert: { points: 2000, vitaScore: 20 },
  },
  certification: {
    gap: { points: 1500, vitaScore: 15 },
    organic: { points: 2000, vitaScore: 20 },
    gacp: { points: 3000, vitaScore: 30 },
  },
};
