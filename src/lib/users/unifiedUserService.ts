import { supabase } from '../supabase';

export type PlatformSource = 'vita' | 'nguyenmanhthuan';

export interface UnifiedUser {
  id: string;
  email?: string;
  phone?: string;
  platformSource: PlatformSource;
  externalId?: string; // ID từ nền tảng gốc (nếu có)
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserMapping {
  id: string;
  vitaUserId?: string;
  nguyenmanhthuanUserId?: string;
  unifiedUserId: string;
  createdAt: string;
}

/**
 * Unified User Service
 * Quản lý users từ cả 2 nền tảng (VITA và nguyenmanhthuan)
 */
export class UnifiedUserService {
  /**
   * Tìm hoặc tạo unified user từ platform cụ thể
   */
  static async getOrCreateUnifiedUser(
    platformSource: PlatformSource,
    identifier: {
      email?: string;
      phone?: string;
      externalId?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<UnifiedUser> {
    try {
      // Tìm user đã tồn tại
      let query = supabase.from('users').select('*');
      
      const conditions: string[] = [];
      if (identifier.email) {
        conditions.push(`email.eq.${identifier.email}`);
      }
      if (identifier.phone) {
        conditions.push(`phone.eq.${identifier.phone}`);
      }
      if (identifier.externalId) {
        conditions.push(`external_id.eq.${identifier.externalId}`);
      }

      if (conditions.length > 0) {
        query = query.or(conditions.join(','));
      }

      const { data: existing, error: queryError } = await query.maybeSingle();

      if (existing && !queryError) {
        // User đã tồn tại
        return {
          id: existing.id,
          email: existing.email,
          phone: existing.phone,
          platformSource: existing.platform_source,
          externalId: existing.external_id,
          metadata: existing.metadata || {},
          createdAt: existing.created_at,
          updatedAt: existing.updated_at,
        };
      }

      // Tạo user mới
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email: identifier.email,
          phone: identifier.phone,
          platform_source: platformSource,
          external_id: identifier.externalId,
          metadata: identifier.metadata || {},
        })
        .select()
        .single();

      if (insertError || !newUser) {
        throw new Error(`Failed to create user: ${insertError?.message}`);
      }

      return {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        platformSource: newUser.platform_source,
        externalId: newUser.external_id,
        metadata: newUser.metadata || {},
        createdAt: newUser.created_at,
        updatedAt: newUser.updated_at,
      };
    } catch (error) {
      console.error('Error in getOrCreateUnifiedUser:', error);
      throw error;
    }
  }

  /**
   * Đảm bảo có bản ghi unified user cho auth user (sau đăng nhập/đăng ký từ một portal).
   * Dùng auth user id làm external_id để tra cứu/ghi.
   */
  static async ensureUnifiedUserForAuth(
    authUserId: string,
    platformSource: PlatformSource,
    options: { email?: string; phone?: string; metadata?: Record<string, unknown> } = {}
  ): Promise<UnifiedUser> {
    const { email, phone, metadata } = options;
    const existing = await supabase
      .from('users')
      .select('*')
      .eq('external_id', authUserId)
      .maybeSingle();

    if (existing.data) {
      return {
        id: existing.data.id,
        email: existing.data.email,
        phone: existing.data.phone,
        platformSource: existing.data.platform_source,
        externalId: existing.data.external_id,
        metadata: existing.data.metadata || {},
        createdAt: existing.data.created_at,
        updatedAt: existing.data.updated_at,
      };
    }

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email || null,
        phone: phone || null,
        platform_source: platformSource,
        external_id: authUserId,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (insertError || !newUser) {
      throw new Error(`Failed to ensure unified user: ${insertError?.message}`);
    }

    return {
      id: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      platformSource: newUser.platform_source,
      externalId: newUser.external_id,
      metadata: newUser.metadata || {},
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };
  }

  /**
   * Link 2 user accounts từ 2 platforms (nếu cùng 1 người dùng)
   */
  static async linkUsers(
    vitaUserId: string,
    nguyenmanhthuanUserId: string
  ): Promise<UserMapping> {
    try {
      // Chọn 1 trong 2 làm unified_user_id (hoặc tạo mới)
      const unifiedUserId = vitaUserId; // Hoặc logic khác tùy business

      const { data: mapping, error } = await supabase
        .from('user_mappings')
        .insert({
          vita_user_id: vitaUserId,
          nguyenmanhthuan_user_id: nguyenmanhthuanUserId,
          unified_user_id: unifiedUserId,
        })
        .select()
        .single();

      if (error || !mapping) {
        throw new Error(`Failed to link users: ${error?.message}`);
      }

      return {
        id: mapping.id,
        vitaUserId: mapping.vita_user_id,
        nguyenmanhthuanUserId: mapping.nguyenmanhthuan_user_id,
        unifiedUserId: mapping.unified_user_id,
        createdAt: mapping.created_at,
      };
    } catch (error) {
      console.error('Error in linkUsers:', error);
      throw error;
    }
  }

  /**
   * Tìm unified user ID từ platform-specific user ID
   */
  static async getUnifiedUserId(
    platformUserId: string,
    platformSource: PlatformSource
  ): Promise<string | null> {
    try {
      // Tìm trong user_mappings
      const mappingField = platformSource === 'vita' 
        ? 'vita_user_id' 
        : 'nguyenmanhthuan_user_id';

      const { data: mapping } = await supabase
        .from('user_mappings')
        .select('unified_user_id')
        .eq(mappingField, platformUserId)
        .single();

      if (mapping) {
        return mapping.unified_user_id;
      }

      // Nếu không có mapping, trả về chính user ID đó (có thể là unified user)
      return platformUserId;
    } catch (error) {
      console.error('Error in getUnifiedUserId:', error);
      return null;
    }
  }

  /**
   * Lấy user theo ID
   */
  static async getUserById(userId: string): Promise<UnifiedUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        phone: data.phone,
        platformSource: data.platform_source,
        externalId: data.external_id,
        metadata: data.metadata || {},
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error in getUserById:', error);
      return null;
    }
  }

  /**
   * Tìm user theo email hoặc phone
   */
  static async findUser(
    email?: string,
    phone?: string
  ): Promise<UnifiedUser | null> {
    try {
      let query = supabase.from('users').select('*');

      if (email) {
        query = query.eq('email', email);
      } else if (phone) {
        query = query.eq('phone', phone);
      } else {
        return null;
      }

      const { data, error } = await query.single();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        phone: data.phone,
        platformSource: data.platform_source,
        externalId: data.external_id,
        metadata: data.metadata || {},
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error in findUser:', error);
      return null;
    }
  }
}
