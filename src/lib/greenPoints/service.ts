import { supabase } from '../supabase';
import type { 
  GreenPoints, 
  GreenPointTransaction, 
  GreenPointReward,
  UserType,
  Tier,
  TransactionType,
  TransactionStatus
} from './types';
import { TIER_THRESHOLDS } from './types';
import { VitaGreenLinkService } from '../vitaScore/linkService';
import { UnifiedUserService, type PlatformSource } from '../users/unifiedUserService';

// Get current user ID (mock - replace with actual auth)
const getCurrentUserId = (): string => {
  // In real app, get from auth context
  return sessionStorage.getItem('user_id') || 'demo-user';
};

// Get current platform source
const getCurrentPlatformSource = (): PlatformSource => {
  // Detect platform from URL or environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('nguyenmanhthuan')) {
      return 'nguyenmanhthuan';
    }
  }
  return 'vita'; // Default to VITA
};

// Calculate tier based on total points
export const calculateTier = (totalPoints: number): Tier => {
  if (totalPoints >= TIER_THRESHOLDS.diamond.min) return 'diamond';
  if (totalPoints >= TIER_THRESHOLDS.platinum.min) return 'platinum';
  if (totalPoints >= TIER_THRESHOLDS.gold.min) return 'gold';
  if (totalPoints >= TIER_THRESHOLDS.silver.min) return 'silver';
  return 'bronze';
};

// Get points needed for next tier
export const getTierPoints = (currentTier: Tier, totalPoints: number): number => {
  const tiers: Tier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const currentIndex = tiers.indexOf(currentTier);
  
  if (currentIndex === tiers.length - 1) {
    // Already at max tier
    return 0;
  }
  
  const nextTier = tiers[currentIndex + 1];
  const nextTierMin = TIER_THRESHOLDS[nextTier].min;
  return Math.max(0, nextTierMin - totalPoints);
};

// Get user's Green Points
export const getUserGreenPoints = async (
  userId?: string,
  platformSource?: PlatformSource
): Promise<GreenPoints | null> => {
  const uid = userId || getCurrentUserId();
  const platform = platformSource || getCurrentPlatformSource();
  
  try {
    // Get unified user ID if needed
    let unifiedUserId = uid;
    if (platform) {
      const unifiedId = await UnifiedUserService.getUnifiedUserId(uid, platform);
      if (unifiedId) {
        unifiedUserId = unifiedId;
      }
    }

    // Try to get from Supabase
    let data, error;
    try {
      const result = await supabase
        .from('green_points')
        .select('*')
        .eq('user_id', unifiedUserId)
        .single();
      data = result.data;
      error = result.error;
    } catch (networkError: any) {
      // Network errors (offline, DNS failure, etc.) - silently fail
      // These are expected when Supabase is unavailable
      if (networkError?.message?.includes('Failed to fetch') || 
          networkError?.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        return null; // Return null instead of throwing
      }
      // Re-throw unexpected errors
      throw networkError;
    }
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      // Only log non-network errors
      if (!error.message?.includes('Failed to fetch') && 
          !error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        console.error('Error fetching green points:', error);
      }
    }
    
    if (data) {
      return {
        userId: data.user_id,
        userType: data.user_type,
        totalPoints: data.total_points || 0,
        availablePoints: data.available_points || 0,
        lockedPoints: data.locked_points || 0,
        lifetimePoints: data.lifetime_points || 0,
        tier: calculateTier(data.total_points || 0),
        tierPoints: getTierPoints(calculateTier(data.total_points || 0), data.total_points || 0),
        stats: {
          earnedThisMonth: data.earned_this_month || 0,
          earnedThisYear: data.earned_this_year || 0,
          redeemedThisMonth: data.redeemed_this_month || 0,
          redeemedThisYear: data.redeemed_this_year || 0,
          topActivity: data.top_activity || '',
        },
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
    
    // If not found, return default
    return createDefaultGreenPoints(unifiedUserId);
  } catch (error) {
    console.error('Error in getUserGreenPoints:', error);
    // Fallback to localStorage
    return getGreenPointsFromLocalStorage(uid);
  }
};

// Create default Green Points
const createDefaultGreenPoints = (userId: string, userType: UserType = 'consumer'): GreenPoints => {
  return {
    userId,
    userType,
    totalPoints: 0,
    availablePoints: 0,
    lockedPoints: 0,
    lifetimePoints: 0,
    tier: 'bronze',
    tierPoints: TIER_THRESHOLDS.silver.min,
    stats: {
      earnedThisMonth: 0,
      earnedThisYear: 0,
      redeemedThisMonth: 0,
      redeemedThisYear: 0,
      topActivity: '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Get from localStorage (fallback)
const getGreenPointsFromLocalStorage = (userId: string): GreenPoints => {
  const key = `green_points_${userId}`;
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Invalid data, create new
    }
  }
  
  const defaultPoints = createDefaultGreenPoints(userId);
  saveGreenPointsToLocalStorage(defaultPoints);
  return defaultPoints;
};

// Save to localStorage (fallback)
const saveGreenPointsToLocalStorage = (points: GreenPoints): void => {
  const key = `green_points_${points.userId}`;
  localStorage.setItem(key, JSON.stringify(points));
};

// Save Green Points (to Supabase or localStorage)
const saveGreenPoints = async (
  points: GreenPoints,
  platformSource?: PlatformSource
): Promise<void> => {
  try {
    const platform = platformSource || getCurrentPlatformSource();
    
    // Try Supabase first
    const { error } = await supabase
      .from('green_points')
      .upsert({
        user_id: points.userId,
        user_type: points.userType,
        total_points: points.totalPoints,
        available_points: points.availablePoints,
        locked_points: points.lockedPoints,
        lifetime_points: points.lifetimePoints,
        tier: points.tier,
        earned_this_month: points.stats.earnedThisMonth,
        earned_this_year: points.stats.earnedThisYear,
        redeemed_this_month: points.stats.redeemedThisMonth,
        redeemed_this_year: points.stats.redeemedThisYear,
        top_activity: points.stats.topActivity,
        platform_source: platform, // Add platform source
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });
    
    if (error) {
      console.error('Error saving green points to Supabase:', error);
      // Fallback to localStorage
      saveGreenPointsToLocalStorage(points);
    }
  } catch (error) {
    console.error('Error in saveGreenPoints:', error);
    // Fallback to localStorage
    saveGreenPointsToLocalStorage(points);
  }
};

// Earn points
export const earnPoints = async (
  userId: string,
  activity: string,
  points: number,
  category: string = 'general',
  portal: string = 'unknown',
  metadata?: Record<string, any>
): Promise<GreenPointTransaction> => {
  const currentPoints = await getUserGreenPoints(userId);
  if (!currentPoints) {
    throw new Error('Failed to get user green points');
  }
  
  const now = new Date();
  const transaction: GreenPointTransaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type: 'earn',
    points,
    activity,
    category,
    portal,
    timestamp: now.toISOString(),
    status: 'completed',
    metadata,
  };
  
  // Update points
  const updatedPoints: GreenPoints = {
    ...currentPoints,
    totalPoints: currentPoints.totalPoints + points,
    availablePoints: currentPoints.availablePoints + points,
    lifetimePoints: currentPoints.lifetimePoints + points,
    tier: calculateTier(currentPoints.totalPoints + points),
    tierPoints: getTierPoints(
      calculateTier(currentPoints.totalPoints + points),
      currentPoints.totalPoints + points
    ),
    stats: {
      ...currentPoints.stats,
      earnedThisMonth: currentPoints.stats.earnedThisMonth + points,
      earnedThisYear: currentPoints.stats.earnedThisYear + points,
      topActivity: activity, // Simple: last activity becomes top
    },
    updatedAt: now.toISOString(),
  };
  
  // Save transaction
  try {
    await supabase.from('green_point_transactions').insert({
      id: transaction.id,
      user_id: userId,
      type: transaction.type,
      points: transaction.points,
      activity: transaction.activity,
      category: transaction.category,
      portal: transaction.portal,
      timestamp: transaction.timestamp,
      status: transaction.status,
      metadata: transaction.metadata,
    });
  } catch (error) {
    console.error('Error saving transaction:', error);
    // Save to localStorage as fallback
    const key = `green_points_transactions_${userId}`;
    const stored = localStorage.getItem(key);
    const transactions = stored ? JSON.parse(stored) : [];
    transactions.push(transaction);
    localStorage.setItem(key, JSON.stringify(transactions));
  }
  
  // Save updated points
  await saveGreenPoints(updatedPoints);
  
  return transaction;
};

// Redeem points
export const redeemPoints = async (
  userId: string,
  rewardId: string,
  points: number,
  rewardName: string,
  platformSource?: PlatformSource
): Promise<GreenPointTransaction> => {
  const platform = platformSource || getCurrentPlatformSource();
  
  // Get unified user ID
  let unifiedUserId = userId;
  if (platform) {
    const unifiedId = await UnifiedUserService.getUnifiedUserId(userId, platform);
    if (unifiedId) {
      unifiedUserId = unifiedId;
    }
  }

  const currentPoints = await getUserGreenPoints(unifiedUserId, platform);
  if (!currentPoints) {
    throw new Error('Failed to get user green points');
  }
  
  if (currentPoints.availablePoints < points) {
    throw new Error('Insufficient points');
  }
  
  const now = new Date();
  const transaction: GreenPointTransaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: unifiedUserId,
    type: 'redeem',
    points: -points, // Negative for redeem
    activity: `Đổi điểm: ${rewardName}`,
    category: 'redemption',
    portal: 'green-points',
    timestamp: now.toISOString(),
    status: 'completed',
    metadata: {
      rewardId,
      platform_source: platform,
      original_user_id: userId,
    },
  };
  
  // Update points
  const updatedPoints: GreenPoints = {
    ...currentPoints,
    availablePoints: currentPoints.availablePoints - points,
    stats: {
      ...currentPoints.stats,
      redeemedThisMonth: currentPoints.stats.redeemedThisMonth + points,
      redeemedThisYear: currentPoints.stats.redeemedThisYear + points,
    },
    updatedAt: now.toISOString(),
  };
  
  // Save transaction
  try {
    await supabase.from('green_point_transactions').insert({
      id: transaction.id,
      user_id: unifiedUserId,
      type: transaction.type,
      points: transaction.points,
      activity: transaction.activity,
      category: transaction.category,
      portal: transaction.portal,
      timestamp: transaction.timestamp,
      status: transaction.status,
      metadata: transaction.metadata,
      platform_source: platform,
    });
  } catch (error) {
    console.error('Error saving transaction:', error);
    // Save to localStorage as fallback
    const key = `green_points_transactions_${unifiedUserId}`;
    const stored = localStorage.getItem(key);
    const transactions = stored ? JSON.parse(stored) : [];
    transactions.push(transaction);
    localStorage.setItem(key, JSON.stringify(transactions));
  }
  
  // Save updated points
  await saveGreenPoints(updatedPoints, platform);
  
  return transaction;
};

// Get transaction history
export const getTransactionHistory = async (
  userId: string,
  limit: number = 50
): Promise<GreenPointTransaction[]> => {
  try {
    const { data, error } = await supabase
      .from('green_point_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching transactions:', error);
      // Fallback to localStorage
      return getTransactionsFromLocalStorage(userId, limit);
    }
    
    return (data || []).map((tx: any) => ({
      id: tx.id,
      userId: tx.user_id,
      type: tx.type,
      points: tx.points,
      activity: tx.activity,
      category: tx.category,
      portal: tx.portal,
      timestamp: tx.timestamp,
      status: tx.status,
      metadata: tx.metadata,
    }));
  } catch (error) {
    console.error('Error in getTransactionHistory:', error);
    return getTransactionsFromLocalStorage(userId, limit);
  }
};

// Get from localStorage (fallback)
const getTransactionsFromLocalStorage = (
  userId: string,
  limit: number
): GreenPointTransaction[] => {
  const key = `green_points_transactions_${userId}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return [];
  
  try {
    const transactions = JSON.parse(stored) as GreenPointTransaction[];
    return transactions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
};

// Get available rewards
export const getAvailableRewards = async (): Promise<GreenPointReward[]> => {
  // Mock rewards - in real app, fetch from Supabase
  return [
    {
      id: 'discount-10k',
      name: 'Giảm giá 10.000 VNĐ',
      description: 'Giảm giá 10.000 VNĐ cho đơn hàng tiếp theo',
      pointsRequired: 100,
      category: 'discount',
      available: true,
    },
    {
      id: 'free-shipping',
      name: 'Miễn phí vận chuyển',
      description: 'Miễn phí vận chuyển cho đơn hàng',
      pointsRequired: 100,
      category: 'service',
      available: true,
    },
    {
      id: 'plant-tree',
      name: 'Trồng 1 cây',
      description: 'Đóng góp trồng 1 cây trong dự án rừng',
      pointsRequired: 50,
      category: 'environment',
      available: true,
    },
    {
      id: 'expert-consultation',
      name: 'Tư vấn chuyên gia',
      description: '1 buổi tư vấn với chuyên gia nông nghiệp',
      pointsRequired: 300,
      category: 'service',
      available: true,
    },
    {
      id: 'workshop-access',
      name: 'Tham gia Workshop',
      description: 'Tham gia 1 khóa workshop về nông nghiệp bền vững',
      pointsRequired: 500,
      category: 'service',
      available: true,
    },
  ];
};
