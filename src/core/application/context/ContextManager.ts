import type { IContextPort } from '../../infrastructure/ports/IContextPort';
import type { UserContext } from '../../domain/context/UserContext';
import type { Role } from '../../domain/user/Role';
import type { Permission } from '../../domain/user/Permission';

export class ContextManager {
  private contextPort: IContextPort;

  constructor(contextPort: IContextPort) {
    this.contextPort = contextPort;
  }

  async getCurrentContext(userId: string): Promise<UserContext | null> {
    return this.contextPort.getCurrentContext(userId);
  }

  async switchContext(userId: string, newRole: Role): Promise<UserContext> {
    return this.contextPort.switchContext(userId, newRole);
  }

  async getAvailableRoles(userId: string): Promise<Role[]> {
    return this.contextPort.getAvailableRoles(userId);
  }

  hasPermission(context: UserContext, permission: Permission): boolean {
    return context.permissions.includes(permission);
  }

  canAccessModule(context: UserContext, module: string): boolean {
    return context.moduleAccess.includes(module);
  }
}
