import type { UserContext } from '../../domain/context/UserContext';
import type { Role } from '../../domain/user/Role';

export interface IContextPort {
  getCurrentContext(userId: string): Promise<UserContext | null>;
  switchContext(userId: string, newRole: Role): Promise<UserContext>;
  getAvailableRoles(userId: string): Promise<Role[]>;
  saveContext(context: UserContext): Promise<void>;
}
