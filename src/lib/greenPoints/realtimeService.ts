import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { GreenPoints, GreenPointTransaction } from './types';
import { calculateTier, getTierPoints } from './service';
import type { PlatformSource } from '../users/unifiedUserService';

/**
 * Transform database row to GreenPoints type
 */
function transformGreenPoints(data: any): GreenPoints {
  return {
    userId: data.user_id,
    userType: data.user_type,
    totalPoints: data.total_points || 0,
    availablePoints: data.available_points || 0,
    lockedPoints: data.locked_points || 0,
    lifetimePoints: data.lifetime_points || 0,
    tier: calculateTier(data.total_points || 0),
    tierPoints: getTierPoints(
      calculateTier(data.total_points || 0),
      data.total_points || 0
    ),
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

/**
 * Subscribe to Green Points changes in real-time
 */
export function subscribeToGreenPoints(
  userId: string,
  callback: (points: GreenPoints | null) => void
): () => void {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'realtimeService.ts:38',message:'subscribeToGreenPoints called',data:{userId,hasSupabase:!!supabase,hasChannel:typeof supabase?.channel==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  if (!supabase || typeof supabase.channel !== 'function') {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'realtimeService.ts:42',message:'Channel not available - returning no-op unsubscribe',data:{hasSupabase:!!supabase,channelType:typeof supabase?.channel},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    console.warn('Supabase realtime not available. Realtime updates disabled.');
    return () => {}; // Return no-op unsubscribe function
  }
  
  const channel = supabase
    .channel(`green_points:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'green_points',
        filter: `user_id=eq.${userId}`,
      },
      async (payload) => {
        console.log('Green Points changed:', payload);
        
        if (payload.eventType === 'DELETE') {
          callback(null);
          return;
        }

        // Fetch updated data
        let data, error;
        try {
          const result = await supabase
            .from('green_points')
            .select('*')
            .eq('user_id', userId)
            .single();
          data = result.data;
          error = result.error;
        } catch (networkError: any) {
          // Network errors - silently fail (expected when offline)
          if (networkError?.message?.includes('Failed to fetch') || 
              networkError?.message?.includes('ERR_NAME_NOT_RESOLVED')) {
            return;
          }
          // Log unexpected errors
          console.error('Error fetching updated green points:', networkError);
          return;
        }
        
        if (error) {
          // Only log non-network errors
          if (!error.message?.includes('Failed to fetch') && 
              !error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
            console.error('Error fetching updated green points:', error);
          }
          return;
        }

        if (data) {
          callback(transformGreenPoints(data));
        }
      }
    );
  
  // Subscribe - WebSocket errors are expected when offline
  // Supabase client handles connection errors and retries automatically
  // We don't need to handle errors here as they're expected when Supabase is unavailable
  channel.subscribe();

  return () => {
    if (supabase && typeof supabase.removeChannel === 'function') {
      supabase.removeChannel(channel);
    }
  };
}

/**
 * Subscribe to Green Points transactions
 */
export function subscribeToGreenPointsTransactions(
  userId: string,
  callback: (transaction: GreenPointTransaction) => void
): () => void {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'realtimeService.ts:87',message:'subscribeToGreenPointsTransactions called',data:{userId,hasChannel:typeof supabase?.channel==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  
  if (!supabase || typeof supabase.channel !== 'function') {
    console.warn('Supabase realtime not available. Realtime updates disabled.');
    return () => {}; // Return no-op unsubscribe function
  }
  
  const channel = supabase
    .channel(`green_points_transactions:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'green_point_transactions',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const transaction: GreenPointTransaction = {
          id: payload.new.id,
          userId: payload.new.user_id,
          type: payload.new.type,
          points: payload.new.points,
          activity: payload.new.activity,
          category: payload.new.category,
          portal: payload.new.portal,
          timestamp: payload.new.timestamp,
          status: payload.new.status,
          metadata: payload.new.metadata || {},
        };
        callback(transaction);
      }
    )
    .subscribe();

  return () => {
    if (supabase && typeof supabase.removeChannel === 'function') {
      supabase.removeChannel(channel);
    }
  };
}

/**
 * React Hook for real-time Green Points
 */
export function useGreenPointsRealtime(
  userId: string,
  platformSource?: PlatformSource
): { points: GreenPoints | null; loading: boolean; error: Error | null } {
  const [points, setPoints] = useState<GreenPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Initial load
    const loadInitialData = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('green_points')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        if (data) {
          setPoints(transformGreenPoints(data));
        }
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    loadInitialData();

    // Subscribe to real-time changes
    const unsubscribe = subscribeToGreenPoints(userId, (updatedPoints) => {
      setPoints(updatedPoints);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId, platformSource]);

  return { points, loading, error };
}

/**
 * React Hook for real-time Green Points transactions
 */
export function useGreenPointsTransactionsRealtime(
  userId: string,
  limit: number = 10
): { transactions: GreenPointTransaction[]; loading: boolean } {
  const [transactions, setTransactions] = useState<GreenPointTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Initial load
    const loadInitialData = async () => {
      try {
        const { data, error } = await supabase
          .from('green_point_transactions')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false })
          .limit(limit);

        if (error) throw error;

        if (data) {
          const transformed = data.map((row: any) => ({
            id: row.id,
            userId: row.user_id,
            type: row.type,
            points: row.points,
            activity: row.activity,
            category: row.category,
            portal: row.portal,
            timestamp: row.timestamp,
            status: row.status,
            metadata: row.metadata || {},
          }));
          setTransactions(transformed);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading transactions:', err);
        setLoading(false);
      }
    };

    loadInitialData();

    // Subscribe to new transactions
    const unsubscribe = subscribeToGreenPointsTransactions(userId, (newTransaction) => {
      setTransactions((prev) => [newTransaction, ...prev.slice(0, limit - 1)]);
    });

    return () => {
      unsubscribe();
    };
  }, [userId, limit]);

  return { transactions, loading };
}
