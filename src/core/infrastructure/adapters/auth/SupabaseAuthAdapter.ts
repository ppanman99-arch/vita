import { IAuthPort, SignInCredentials, SignUpCredentials, AuthResult, ResetPasswordResult } from '../../ports/IAuthPort';
import { User } from '../../../domain/user/User';
import { Role } from '../../../domain/user/Role';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

export class SupabaseAuthAdapter implements IAuthPort {
  async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.metadata?.full_name,
            coop_name: credentials.metadata?.coop_name,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      if (!data.user) {
        return { user: null, session: null, error: 'Đăng ký thất bại' };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name,
        avatarUrl: data.user.user_metadata?.avatar_url,
        roles: this.extractRoles(data.user.user_metadata),
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(data.user.updated_at || data.user.created_at),
      };

      return { user, session: data.session };
    } catch (error) {
      return { user: null, session: null, error: 'Unexpected error occurred' };
    }
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name,
        avatarUrl: data.user.user_metadata?.avatar_url,
        roles: this.extractRoles(data.user.user_metadata), // TODO: Load from database
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(data.user.updated_at || data.user.created_at),
      };

      return { user, session: data.session };
    } catch (error) {
      return { user: null, session: null, error: 'Unexpected error occurred' };
    }
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name,
      avatarUrl: user.user_metadata?.avatar_url,
      roles: this.extractRoles(user.user_metadata), // TODO: Load from database
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at || user.created_at),
    };
  }

  async getCurrentSession(): Promise<any | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  async resetPasswordForEmail(email: string): Promise<ResetPasswordResult> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/nguyen-manh-thuan/set-password`,
      });
      if (error) return { error: error.message };
      return {};
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Gửi email khôi phục mật khẩu thất bại' };
    }
  }

  private extractRoles(userMetadata: any): Role[] {
    // Extract roles from user metadata or return default
    if (userMetadata?.roles && Array.isArray(userMetadata.roles)) {
      return userMetadata.roles.filter((r: string) => Object.values(Role).includes(r as Role)) as Role[];
    }
    // Default role based on metadata or return empty
    return [];
  }
}
