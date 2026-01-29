import type { IAuthPort, SignInCredentials, SignUpCredentials, AuthResult } from '../../infrastructure/ports/IAuthPort';
import type { User } from '../../domain/user/User';

export class AuthService {
  private authPort: IAuthPort;

  constructor(authPort: IAuthPort) {
    this.authPort = authPort;
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    if (!credentials.email || !credentials.password) {
      return { user: null, session: null, error: 'Email and password are required' };
    }
    if (credentials.password.length < 6) {
      return { user: null, session: null, error: 'Mật khẩu phải có ít nhất 6 ký tự' };
    }
    if (!this.authPort.signUp) {
      return { user: null, session: null, error: 'Sign up not supported' };
    }
    return this.authPort.signUp(credentials);
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    if (!credentials.email || !credentials.password) {
      return {
        user: null,
        session: null,
        error: 'Email and password are required',
      };
    }

    return this.authPort.signIn(credentials);
  }

  async signOut(): Promise<void> {
    return this.authPort.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authPort.getCurrentUser();
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  async resetPasswordForEmail(email: string): Promise<{ error?: string }> {
    if (!email?.trim()) {
      return { error: 'Email là bắt buộc' };
    }
    if (!this.authPort.resetPasswordForEmail) {
      return { error: 'Khôi phục mật khẩu chưa được hỗ trợ' };
    }
    return this.authPort.resetPasswordForEmail(email.trim());
  }
}
