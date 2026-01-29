import type { Cooperative } from '../domain/Cooperative';
import type { CooperativeMember, MemberRole, MemberStatus } from '../domain/CooperativeMember';
import type { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';
import { supabase } from '../../../../src/lib/supabase';

export class CooperativeService {
  private dbAdapter: IDatabasePort;

  constructor(dbAdapter: IDatabasePort = new SupabaseDatabaseAdapter()) {
    this.dbAdapter = dbAdapter;
  }

  async registerCooperative(data: Partial<Cooperative>): Promise<Cooperative> {
    // Validate data
    if (!data.name || !data.email) {
      throw new Error('Name and email are required');
    }

    // Prepare data for database
    const dbData: any = {
      name: data.name,
      email: data.email,
      auth_user_id: data.authUserId || null,
      tax_code: data.taxCode || null,
      established_year: data.establishedYear || null,
      member_count: data.memberCount || null,
      total_forest_area: data.totalForestArea || null,
      location: data.location || null,
      representative: data.representative || null,
      representative_position: data.representativePosition || null,
      phone: data.phone || null,
      current_activities: data.currentActivities || null,
      interests: data.interests || null,
      additional_info: data.additionalInfo || null,
      logo_url: data.logoUrl || null,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save to database
    const result = await this.dbAdapter.create<any>('cooperatives', dbData);

    // Map database result back to domain entity
    return this.mapDbRowToCooperative(result);
  }

  async getCooperativeById(id: string): Promise<Cooperative | null> {
    const result = await this.dbAdapter.read<any>('cooperatives', id);
    if (!result) return null;
    return this.mapDbRowToCooperative(result);
  }

  async updateCooperative(id: string, data: Partial<Cooperative>): Promise<Cooperative> {
    const dbData: any = {
      updated_at: new Date().toISOString(),
    };

    if (data.name !== undefined) dbData.name = data.name;
    if (data.email !== undefined) dbData.email = data.email;
    if (data.taxCode !== undefined) dbData.tax_code = data.taxCode;
    if (data.establishedYear !== undefined) dbData.established_year = data.establishedYear;
    if (data.memberCount !== undefined) dbData.member_count = data.memberCount;
    if (data.totalForestArea !== undefined) dbData.total_forest_area = data.totalForestArea;
    if (data.location !== undefined) dbData.location = data.location;
    if (data.representative !== undefined) dbData.representative = data.representative;
    if (data.representativePosition !== undefined) dbData.representative_position = data.representativePosition;
    if (data.phone !== undefined) dbData.phone = data.phone;
    if (data.currentActivities !== undefined) dbData.current_activities = data.currentActivities;
    if (data.interests !== undefined) dbData.interests = data.interests;
    if (data.additionalInfo !== undefined) dbData.additional_info = data.additionalInfo;
    if (data.logoUrl !== undefined) dbData.logo_url = data.logoUrl;
    if (data.status !== undefined) dbData.status = data.status;

    const result = await this.dbAdapter.update<any>('cooperatives', id, dbData);
    return this.mapDbRowToCooperative(result);
  }

  async getAllCooperatives(filters?: Record<string, any>): Promise<Cooperative[]> {
    const results = await this.dbAdapter.query<any>({
      table: 'cooperatives',
      filters,
      orderBy: { column: 'created_at', ascending: false },
    });

    return results.map(row => this.mapDbRowToCooperative(row));
  }

  /**
   * Get cooperative by Supabase Auth user id (for login flow).
   */
  async getCooperativeByAuthUserId(authUserId: string): Promise<Cooperative | null> {
    const results = await this.dbAdapter.query<any>({
      table: 'cooperatives',
      filters: { auth_user_id: authUserId },
      orderBy: { column: 'created_at', ascending: false },
    });
    if (!results.length) return null;
    return this.mapDbRowToCooperative(results[0]);
  }

  /**
   * Get cooperative statistics
   */
  async getCooperativeStats(cooperativeId: string): Promise<{
    totalMembers: number;
    totalArea: number;
    monthlyRevenue: number;
    activeContracts: number;
    pendingTasks: number;
  }> {
    try {
      // For now, return mock data
      // TODO: Implement real aggregation queries when database schema is ready
      return {
        totalMembers: 187,
        totalArea: 245.8,
        monthlyRevenue: 50000000,
        activeContracts: 5,
        pendingTasks: 3,
      };
    } catch (error) {
      console.error('Error fetching cooperative stats:', error);
      throw error;
    }
  }

  /**
   * Upload logo to Supabase Storage
   */
  async uploadLogo(cooperativeId: string, file: File): Promise<string> {
    try {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Kích thước file không được vượt quá 5MB');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${cooperativeId}/${Date.now()}.${fileExt}`;
      const filePath = `cooperative-logos/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('cooperative-logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new Error(`Lỗi upload: ${error.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('cooperative-logos')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Không thể lấy URL công khai của logo');
      }

      // Update cooperative record with logo URL
      await this.updateCooperative(cooperativeId, {
        logoUrl: urlData.publicUrl,
      });

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  }

  /**
   * Get all members of a cooperative
   */
  async getMembers(cooperativeId: string): Promise<CooperativeMember[]> {
    try {
      const results = await this.dbAdapter.query<any>({
        table: 'cooperative_members',
        filters: { cooperative_id: cooperativeId },
        orderBy: { column: 'joined_at', ascending: false },
      });

      return results.map(row => this.mapDbRowToMember(row));
    } catch (error) {
      console.error('Error fetching members:', error);
      // Return mock data if table doesn't exist yet
      return [];
    }
  }

  /**
   * Add a new member to cooperative
   */
  async addMember(
    cooperativeId: string,
    userId: string,
    role: MemberRole
  ): Promise<CooperativeMember> {
    try {
      const dbData: any = {
        cooperative_id: cooperativeId,
        user_id: userId,
        role: role,
        status: 'pending',
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = await this.dbAdapter.create<any>('cooperative_members', dbData);
      return this.mapDbRowToMember(result);
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  }

  /**
   * Remove a member from cooperative
   */
  async removeMember(memberId: string): Promise<void> {
    try {
      await this.dbAdapter.delete('cooperative_members', memberId);
    } catch (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  }

  /**
   * Update member role
   */
  async updateMemberRole(memberId: string, role: MemberRole): Promise<CooperativeMember> {
    try {
      const dbData: any = {
        role: role,
        updated_at: new Date().toISOString(),
      };

      const result = await this.dbAdapter.update<any>('cooperative_members', memberId, dbData);
      return this.mapDbRowToMember(result);
    } catch (error) {
      console.error('Error updating member role:', error);
      throw error;
    }
  }

  /**
   * Update member status
   */
  async updateMemberStatus(memberId: string, status: MemberStatus): Promise<CooperativeMember> {
    try {
      const dbData: any = {
        status: status,
        updated_at: new Date().toISOString(),
      };

      const result = await this.dbAdapter.update<any>('cooperative_members', memberId, dbData);
      return this.mapDbRowToMember(result);
    } catch (error) {
      console.error('Error updating member status:', error);
      throw error;
    }
  }

  private mapDbRowToCooperative(row: any): Cooperative {
    return {
      id: row.id,
      authUserId: row.auth_user_id,
      name: row.name,
      taxCode: row.tax_code,
      establishedYear: row.established_year,
      memberCount: row.member_count,
      totalForestArea: row.total_forest_area,
      location: row.location,
      representative: row.representative,
      representativePosition: row.representative_position,
      phone: row.phone,
      email: row.email,
      currentActivities: row.current_activities,
      interests: row.interests || [],
      additionalInfo: row.additional_info,
      logoUrl: row.logo_url,
      status: row.status || 'pending',
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  private mapDbRowToMember(row: any): CooperativeMember {
    return {
      id: row.id,
      cooperativeId: row.cooperative_id,
      userId: row.user_id,
      role: row.role || 'producer',
      status: row.status || 'pending',
      joinedAt: new Date(row.joined_at),
      name: row.name || undefined,
      email: row.email || undefined,
      phone: row.phone || undefined,
      vitaScore: row.vita_score || undefined,
      area: row.area || undefined,
      compliance: row.compliance || undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
