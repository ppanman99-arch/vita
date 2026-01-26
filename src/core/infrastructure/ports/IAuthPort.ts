import { User } from '../../domain/user/User';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User | null;
  session: any; // Supabase session type
  error?: string;
}

export interface IAuthPort {
  signIn(credentials: SignInCredentials): Promise<AuthResult>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getCurrentSession(): Promise<any | null>;
}
