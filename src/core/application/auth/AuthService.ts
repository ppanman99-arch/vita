import type { IAuthPort, SignInCredentials, AuthResult } from '../../infrastructure/ports/IAuthPort';
import type { User } from '../../domain/user/User';

export class AuthService {
  private authPort: IAuthPort;

  constructor(authPort: IAuthPort) {
    this.authPort = authPort;
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    // Business logic: validate, transform, etc.
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
}
