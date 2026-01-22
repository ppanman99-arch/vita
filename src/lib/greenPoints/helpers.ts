// Helper functions for Green Points integration

import { earnPoints } from './service';
import { DEFAULT_ACTIVITIES } from './types';
import type { UserType } from './types';
import type { PlatformSource } from '../users/unifiedUserService';

// Get current platform source
const getCurrentPlatformSource = (): PlatformSource => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('nguyenmanhthuan')) {
      return 'nguyenmanhthuan';
    }
  }
  return 'vita'; // Default to VITA
};

/**
 * Get points for a specific activity
 */
export const getActivityPoints = (activityId: string): number => {
  const activity = DEFAULT_ACTIVITIES.find(a => a.id === activityId);
  return activity?.points || 0;
};

/**
 * Earn points for purchase (consumer)
 */
export const earnPurchasePoints = async (
  userId: string,
  userType: UserType,
  amount: number, // VNĐ
  isOrganic: boolean = false,
  portal: string = 'farmer-consumer',
  platformSource?: PlatformSource
): Promise<void> => {
  const pointsPer10k = isOrganic ? 2 : 1;
  const points = Math.floor(amount / 10000) * pointsPer10k;
  const platform = platformSource || getCurrentPlatformSource();
  
  if (points > 0) {
    await earnPoints(
      userId,
      userType,
      points,
      isOrganic ? 'Mua sản phẩm hữu cơ' : 'Mua sản phẩm',
      'purchase',
      portal,
      { amount, isOrganic },
      platform
    );
  }
};

/**
 * Earn points for investment
 */
export const earnInvestmentPoints = async (
  userId: string,
  userType: UserType,
  amount: number, // VNĐ
  isLongTerm: boolean = false,
  isESG: boolean = false,
  portal: string = 'investor-portal',
  platformSource?: PlatformSource
): Promise<void> => {
  const basePoints = isESG ? 2 : 1; // 2 điểm / 1 triệu cho ESG, 1 điểm / 1 triệu cho thường
  const points = Math.floor(amount / 1000000) * basePoints;
  const platform = platformSource || getCurrentPlatformSource();
  
  if (points > 0) {
    await earnPoints(
      userId,
      userType,
      points,
      isESG ? 'Đầu tư ESG' : 'Đầu tư vào dự án',
      isESG ? 'esg' : 'investment',
      portal,
      { amount, isLongTerm, isESG },
      platform
    );
    
    // Bonus for long-term investment
    if (isLongTerm) {
      await earnPoints(
        userId,
        userType,
        50,
        'Đầu tư dài hạn',
        'investment',
        portal,
        { amount, duration: 'long-term' },
        platform
      );
    }
  }
};

/**
 * Earn points for ESG sponsorship
 */
export const earnESGSponsorPoints = async (
  userId: string,
  userType: UserType,
  amount: number, // VNĐ
  type: 'cash' | 'seeds',
  portal: string = 'esg-portal',
  platformSource?: PlatformSource
): Promise<void> => {
  const platform = platformSource || getCurrentPlatformSource();
  
  if (type === 'cash') {
    const points = Math.floor(amount / 100000) * 5; // 5 điểm / 100k VNĐ
    if (points > 0) {
      await earnPoints(
        userId,
        userType,
        points,
        'Tài trợ dự án ESG',
        'esg',
        portal,
        { amount, type: 'cash' },
        platform
      );
    }
  } else if (type === 'seeds') {
    const points = Math.floor(amount / 1000) * 100; // 100 điểm / 1000 cây
    if (points > 0) {
      await earnPoints(
        userId,
        userType,
        points,
        'Tài trợ giống',
        'esg',
        portal,
        { amount, type: 'seeds' },
        platform
      );
    }
  }
};

/**
 * Earn points for Carbon Credit purchase
 */
export const earnCarbonCreditPoints = async (
  userId: string,
  userType: UserType,
  tons: number,
  portal: string = 'esg-portal',
  platformSource?: PlatformSource
): Promise<void> => {
  const points = Math.floor(tons) * 2; // 2 điểm / 1 tấn CO2
  const platform = platformSource || getCurrentPlatformSource();
  
  if (points > 0) {
    await earnPoints(
      userId,
      userType,
      points,
      'Mua Carbon Credit',
      'esg',
      portal,
      { tons },
      platform
    );
  }
};

/**
 * Check if user can earn points for activity (respect maxPerDay)
 */
export const canEarnPoints = async (
  userId: string,
  activityId: string
): Promise<boolean> => {
  const activity = DEFAULT_ACTIVITIES.find(a => a.id === activityId);
  if (!activity || !activity.maxPerDay) {
    return true; // No limit
  }
  
  // Check today's transactions (simplified - in real app, query from DB)
  const today = new Date().toISOString().split('T')[0];
  const key = `green_points_activity_${userId}_${activityId}_${today}`;
  const count = parseInt(localStorage.getItem(key) || '0', 10);
  
  return count < activity.maxPerDay;
};

/**
 * Record activity for daily limit tracking
 */
export const recordActivity = (userId: string, activityId: string): void => {
  const today = new Date().toISOString().split('T')[0];
  const key = `green_points_activity_${userId}_${activityId}_${today}`;
  const count = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, String(count + 1));
};
