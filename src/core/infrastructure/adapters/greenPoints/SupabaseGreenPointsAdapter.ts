import { IGreenPointsPort, EarnPointsParams } from '../../ports/IGreenPointsPort';
import { GreenPoints } from '../../../domain/greenPoints/GreenPoints';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

export class SupabaseGreenPointsAdapter implements IGreenPointsPort {
  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .insert({
          user_id: params.userId,
          points: params.points,
          activity: params.activity,
          category: params.category,
          portal: params.portal,
          platform_source: params.platformSource,
          metadata: params.metadata,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        userId: data.user_id,
        points: data.points,
        activity: data.activity,
        category: data.category,
        portal: data.portal,
        platformSource: data.platform_source,
        metadata: data.metadata,
        createdAt: new Date(data.created_at),
      };
    } catch (error) {
      throw new Error(`Failed to earn points: ${error}`);
    }
  }

  async getUserGreenPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .select('points')
        .eq('user_id', userId);

      if (error) throw error;

      return data.reduce((sum, record) => sum + (record.points || 0), 0);
    } catch (error) {
      console.error('Failed to get user green points:', error);
      return 0;
    }
  }

  async getGreenPointsHistory(userId: string, limit: number = 50): Promise<GreenPoints[]> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || []).map((record) => ({
        id: record.id,
        userId: record.user_id,
        points: record.points,
        activity: record.activity,
        category: record.category,
        portal: record.portal,
        platformSource: record.platform_source,
        metadata: record.metadata,
        createdAt: new Date(record.created_at),
      }));
    } catch (error) {
      console.error('Failed to get green points history:', error);
      return [];
    }
  }
}
