import { supabase } from '../supabase';
import { getUserGreenPoints, earnPoints, redeemPoints } from '../greenPoints/service';
import type { VitaScore, VitaGreenLink, VitaScoreChange, CombinedTier, CombinedBenefit } from './types';
import { VITA_SCORE_THRESHOLDS, GREEN_POINTS_TO_VITA } from './types';

const VITA_SCORE_TABLE = 'vita_scores';
const VITA_GREEN_LINK_TABLE = 'vita_green_links';
const VITA_SCORE_HISTORY_TABLE = 'vita_score_history';

export class VitaGreenLinkService {
  /**
   * Tính bonus Green Points dựa trên VITA Score
   */
  static async calculateVitaBonus(
    userId: string,
    monthlyGreenPoints: number
  ): Promise<number> {
    const vitaScore = await this.getVitaScore(userId);
    if (!vitaScore) return 0;

    const tier = this.getVitaTier(vitaScore.score);
    const multiplier = VITA_SCORE_THRESHOLDS[tier].bonusMultiplier;
    
    // Bonus = (Multiplier - 1) * Monthly Points
    const bonus = Math.floor(monthlyGreenPoints * (multiplier - 1));
    
    return bonus;
  }

  /**
   * Áp dụng bonus Green Points hàng tháng từ VITA Score
   */
  static async applyMonthlyVitaBonus(userId: string): Promise<boolean> {
    try {
      const greenPoints = await getUserGreenPoints(userId);
      if (!greenPoints) return false;

      const monthlyEarned = greenPoints.stats.earnedThisMonth;
      const bonus = await this.calculateVitaBonus(userId, monthlyEarned);

      if (bonus > 0) {
        await earnPoints(
          userId,
          greenPoints.userType,
          bonus,
          `Bonus VITA Score (${this.getVitaTierName((await this.getVitaScore(userId))?.score || 0)})`,
          'vita_bonus',
          'vita-green-link',
          {
            monthlyEarned,
            bonus,
            vitaScore: (await this.getVitaScore(userId))?.score || 0,
          }
        );
      }

      return true;
    } catch (error) {
      console.error('Error applying monthly VITA bonus:', error);
      return false;
    }
  }

  /**
   * Đổi Green Points để tăng VITA Score (qua đào tạo)
   */
  static async exchangeGreenPointsForVita(
    userId: string,
    points: number,
    trainingType: 'basic' | 'advanced' | 'expert' | 'gap' | 'organic' | 'gacp'
  ): Promise<boolean> {
    try {
      const greenPoints = await getUserGreenPoints(userId);
      if (!greenPoints || greenPoints.availablePoints < points) {
        return false;
      }

      const conversion = (GREEN_POINTS_TO_VITA.training as any)[trainingType] || 
                        (GREEN_POINTS_TO_VITA.certification as any)[trainingType];
      
      if (!conversion || points < conversion.points) {
        return false;
      }

      // Redeem Green Points
      await redeemPoints(
        userId,
        `training-${trainingType}`,
        conversion.points,
        `Đào tạo ${trainingType} - Tăng VITA Score`
      );

      // Increase VITA Score
      await this.increaseVitaScore(
        userId,
        conversion.vitaScore,
        `Đào tạo ${trainingType} (đổi ${conversion.points} Green Points)`,
        'training',
        { trainingType, pointsUsed: conversion.points }
      );

      return true;
    } catch (error) {
      console.error('Error exchanging Green Points for VITA:', error);
      return false;
    }
  }

  /**
   * Tăng VITA Score
   */
  static async increaseVitaScore(
    userId: string,
    amount: number,
    reason: string,
    category: VitaScoreChange['category'],
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      const currentScore = await this.getVitaScore(userId);
      if (!currentScore) return false;

      const newScore = Math.min(1000, currentScore.score + amount);
      const change = newScore - currentScore.score;

      // Update VITA Score (fallback to localStorage if Supabase not available)
      try {
        const { error: updateError } = await supabase
          .from(VITA_SCORE_TABLE)
          .update({
            score: newScore,
            tier: this.getVitaTier(newScore),
            previous_score: currentScore.score,
            last_updated: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (updateError && updateError.code !== 'PGRST116') {
          // If table doesn't exist, use localStorage
          this.saveVitaScoreToLocalStorage(userId, {
            ...currentScore,
            score: newScore,
            tier: this.getVitaTier(newScore),
            previousScore: currentScore.score,
            lastUpdated: new Date().toISOString(),
          });
        }
      } catch (error) {
        // Fallback to localStorage
        this.saveVitaScoreToLocalStorage(userId, {
          ...currentScore,
          score: newScore,
          tier: this.getVitaTier(newScore),
          previousScore: currentScore.score,
          lastUpdated: new Date().toISOString(),
        });
      }

      // Log change
      const changeRecord: VitaScoreChange = {
        id: crypto.randomUUID(),
        userId,
        change,
        reason,
        category,
        timestamp: new Date().toISOString(),
        metadata,
      };

      this.saveVitaScoreChangeToLocalStorage(changeRecord);

      return true;
    } catch (error) {
      console.error('Error increasing VITA Score:', error);
      return false;
    }
  }

  /**
   * Giảm VITA Score (khi vi phạm)
   */
  static async decreaseVitaScore(
    userId: string,
    amount: number,
    reason: string,
    category: VitaScoreChange['category'],
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      const currentScore = await this.getVitaScore(userId);
      if (!currentScore) return false;

      const newScore = Math.max(0, currentScore.score - amount);
      const change = newScore - currentScore.score;

      // Update VITA Score
      try {
        await supabase
          .from(VITA_SCORE_TABLE)
          .update({
            score: newScore,
            tier: this.getVitaTier(newScore),
            previous_score: currentScore.score,
            last_updated: new Date().toISOString(),
          })
          .eq('user_id', userId);
      } catch (error) {
        // Fallback to localStorage
        this.saveVitaScoreToLocalStorage(userId, {
          ...currentScore,
          score: newScore,
          tier: this.getVitaTier(newScore),
          previousScore: currentScore.score,
          lastUpdated: new Date().toISOString(),
        });
      }

      // Log change
      const changeRecord: VitaScoreChange = {
        id: crypto.randomUUID(),
        userId,
        change,
        reason,
        category,
        timestamp: new Date().toISOString(),
        metadata,
      };

      this.saveVitaScoreChangeToLocalStorage(changeRecord);

      return true;
    } catch (error) {
      console.error('Error decreasing VITA Score:', error);
      return false;
    }
  }

  /**
   * Lấy VITA Score
   */
  static async getVitaScore(userId: string): Promise<VitaScore | null> {
    try {
      // Try Supabase first
      try {
        const { data, error } = await supabase
          .from(VITA_SCORE_TABLE)
          .select('*')
          .eq('user_id', userId)
          .single();

        if (!error && data) {
          return {
            userId: data.user_id,
            score: data.score || 0,
            tier: this.getVitaTier(data.score || 0),
            previousScore: data.previous_score || 0,
            lastUpdated: data.last_updated || new Date().toISOString(),
            breakdown: {
              vitality: data.vitality || 125,
              integrity: data.integrity || 125,
              trust: data.trust || 125,
              account: data.account || 125,
            },
            stats: {
              complianceRate: data.compliance_rate || 50,
              qualityScore: data.quality_score || 50,
              paymentOnTime: data.payment_on_time || 50,
              reportCompleteness: data.report_completeness || 50,
            },
            history: [],
          };
        }
      } catch (error) {
        // Fallback to localStorage
      }

      // Try localStorage
      const stored = localStorage.getItem(`vita_score_${userId}`);
      if (stored) {
        return JSON.parse(stored);
      }

      // Create default
      const defaultScore = this.createDefaultVitaScore(userId);
      this.saveVitaScoreToLocalStorage(userId, defaultScore);
      return defaultScore;
    } catch (error) {
      console.error('Error getting VITA Score:', error);
      return this.createDefaultVitaScore(userId);
    }
  }

  /**
   * Lấy liên kết VITA-Green
   */
  static async getVitaGreenLink(userId: string): Promise<VitaGreenLink | null> {
    try {
      const [vitaScore, greenPoints] = await Promise.all([
        this.getVitaScore(userId),
        getUserGreenPoints(userId),
      ]);

      if (!vitaScore || !greenPoints) return null;

      const vitaTier = this.getVitaTier(vitaScore.score);
      const greenTier = greenPoints.tier;
      const combinedTier = this.getCombinedTier(vitaTier, greenTier);

      const monthlyBonus = await this.calculateVitaBonus(
        userId,
        greenPoints.stats.earnedThisMonth
      );

      return {
        userId,
        vitaBonusMultiplier: VITA_SCORE_THRESHOLDS[vitaTier].bonusMultiplier,
        monthlyVitaBonus: monthlyBonus,
        greenPointsUsedForTraining: 0, // TODO: Get from history
        vitaScoreFromTraining: 0, // TODO: Get from history
        combinedTier,
        benefits: this.getCombinedBenefits(vitaScore.score, greenPoints.totalPoints),
      };
    } catch (error) {
      console.error('Error getting VITA-Green link:', error);
      return null;
    }
  }

  /**
   * Tính Combined Tier
   */
  static getCombinedTier(
    vitaTier: VitaScoreTier,
    greenTier: string
  ): CombinedTier {
    const tierMap: Record<string, CombinedTier> = {
      'bronze-bronze': 'bronze-bronze',
      'bronze-silver': 'bronze-silver',
      'bronze-gold': 'bronze-gold',
      'silver-bronze': 'silver-bronze',
      'silver-silver': 'silver-silver',
      'silver-gold': 'silver-gold',
      'silver-platinum': 'silver-platinum',
      'gold-silver': 'gold-silver',
      'gold-gold': 'gold-gold',
      'gold-platinum': 'gold-platinum',
      'gold-diamond': 'gold-diamond',
      'platinum-gold': 'platinum-gold',
      'platinum-platinum': 'platinum-platinum',
      'platinum-diamond': 'platinum-diamond',
      'diamond-platinum': 'diamond-platinum',
      'diamond-diamond': 'diamond-diamond',
    };

    return tierMap[`${vitaTier}-${greenTier}`] || 'bronze-bronze';
  }

  /**
   * Lấy quyền lợi kết hợp
   */
  static getCombinedBenefits(
    vitaScore: number,
    greenPoints: number
  ): CombinedBenefit[] {
    const benefits: CombinedBenefit[] = [
      {
        id: 'priority-support',
        name: 'Hỗ trợ ưu tiên',
        description: 'Được hỗ trợ ưu tiên khi có vấn đề',
        vitaRequirement: 700,
        greenPointsRequirement: 1000,
        unlocked: vitaScore >= 700 && greenPoints >= 1000,
        category: 'priority',
      },
      {
        id: 'higher-credit',
        name: 'Hạn mức tín dụng cao hơn',
        description: 'Tăng hạn mức tín dụng sản xuất',
        vitaRequirement: 850,
        greenPointsRequirement: 2000,
        unlocked: vitaScore >= 850 && greenPoints >= 2000,
        category: 'credit',
      },
      {
        id: 'exclusive-access',
        name: 'Truy cập độc quyền',
        description: 'Truy cập các dự án đầu tư độc quyền',
        vitaRequirement: 900,
        greenPointsRequirement: 5000,
        unlocked: vitaScore >= 900 && greenPoints >= 5000,
        category: 'access',
      },
      {
        id: 'vip-status',
        name: 'Thành viên VIP',
        description: 'Quyền lợi VIP đặc biệt',
        vitaRequirement: 950,
        greenPointsRequirement: 10000,
        unlocked: vitaScore >= 950 && greenPoints >= 10000,
        category: 'special',
      },
    ];

    return benefits;
  }

  /**
   * Helper functions
   */
  static getVitaTier(score: number): VitaScoreTier {
    if (score >= 950) return 'diamond';
    if (score >= 850) return 'platinum';
    if (score >= 700) return 'gold';
    if (score >= 500) return 'silver';
    return 'bronze';
  }

  static getVitaTierName(score: number): string {
    return VITA_SCORE_THRESHOLDS[this.getVitaTier(score)].name;
  }

  static createDefaultVitaScore(userId: string): VitaScore {
    return {
      userId,
      score: 500, // Starting score
      tier: 'silver',
      previousScore: 500,
      lastUpdated: new Date().toISOString(),
      breakdown: {
        vitality: 125,
        integrity: 125,
        trust: 125,
        account: 125,
      },
      stats: {
        complianceRate: 50,
        qualityScore: 50,
        paymentOnTime: 50,
        reportCompleteness: 50,
      },
      history: [],
    };
  }

  /**
   * LocalStorage helpers
   */
  static saveVitaScoreToLocalStorage(userId: string, score: VitaScore): void {
    localStorage.setItem(`vita_score_${userId}`, JSON.stringify(score));
  }

  static saveVitaScoreChangeToLocalStorage(change: VitaScoreChange): void {
    const key = `vita_score_history_${change.userId}`;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.push(change);
    localStorage.setItem(key, JSON.stringify(history));
  }
}
