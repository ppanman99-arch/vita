import type { IContextPort } from '../../../ports/IContextPort';
import type { UserContext } from '../../../domain/context/UserContext';
import type { Role } from '../../../domain/user/Role';
import type { Permission } from '../../../domain/user/Permission';
import { Role as RoleConst } from '../../../domain/user/Role';
import { Permission as Perm } from '../../../domain/user/Permission';

const STORAGE_KEY = 'vita_member_context';

function storageKey(userId: string): string {
  return `${STORAGE_KEY}_${userId}`;
}

const DEFAULT_ROLES: Role[] = [
  RoleConst.FARMER,
  RoleConst.INVESTOR,
  RoleConst.CONSUMER,
];

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [RoleConst.FARMER]: [Perm.FARMER_VIEW_DASHBOARD, Perm.FARMER_CREATE_DIARY],
  [RoleConst.INVESTOR]: [Perm.INVESTOR_VIEW_PORTFOLIO],
  [RoleConst.CONSUMER]: [Perm.CONSUMER_VIEW_WALLET, Perm.CONSUMER_MAKE_PURCHASE],
  [RoleConst.COOPERATIVE]: [Perm.ADMIN_MANAGE_MEMBERS, Perm.ADMIN_VIEW_DASHBOARD],
  [RoleConst.ENTERPRISE]: [Perm.ENTERPRISE_VIEW_PROJECTS],
  [RoleConst.EXPERT]: [Perm.EXPERT_VIEW_CONSULTATIONS],
  [RoleConst.RESEARCH]: [Perm.RESEARCH_VIEW_LAB],
};

const ROLE_MODULES: Record<string, string[]> = {
  [RoleConst.FARMER]: ['farmer', 'member'],
  [RoleConst.INVESTOR]: ['investor', 'member'],
  [RoleConst.CONSUMER]: ['consumer', 'member', 'nguyenmanhthuan'],
  [RoleConst.COOPERATIVE]: ['cooperative'],
  [RoleConst.ENTERPRISE]: ['esg-enterprise'],
  [RoleConst.EXPERT]: ['expert'],
  [RoleConst.RESEARCH]: ['research'],
};

export class LocalStorageContextAdapter implements IContextPort {
  async getCurrentContext(userId: string): Promise<UserContext | null> {
    try {
      const raw = localStorage.getItem(storageKey(userId));
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Record<string, any>;
      return {
        userId: parsed.userId,
        activeRole: parsed.activeRole,
        availableRoles: parsed.availableRoles || DEFAULT_ROLES,
        permissions: parsed.permissions || [],
        moduleAccess: parsed.moduleAccess || [],
        contextData: parsed.contextData,
        lastSwitchedAt: parsed.lastSwitchedAt ? new Date(parsed.lastSwitchedAt) : undefined,
      };
    } catch {
      return null;
    }
  }

  async switchContext(userId: string, newRole: Role): Promise<UserContext> {
    const roles = await this.getAvailableRoles(userId);
    if (!roles.includes(newRole)) {
      throw new Error(`User does not have role: ${newRole}`);
    }
    const permissions = ROLE_PERMISSIONS[newRole] || [];
    const moduleAccess = ROLE_MODULES[newRole] || ['member'];
    const ctx: UserContext = {
      userId,
      activeRole: newRole,
      availableRoles: roles,
      permissions,
      moduleAccess,
      lastSwitchedAt: new Date(),
    };
    await this.saveContext(ctx);
    return ctx;
  }

  async getAvailableRoles(userId: string): Promise<Role[]> {
    const ctx = await this.getCurrentContext(userId);
    if (ctx?.availableRoles?.length) return ctx.availableRoles;
    return [...DEFAULT_ROLES];
  }

  async saveContext(context: UserContext): Promise<void> {
    const payload = {
      ...context,
      lastSwitchedAt: context.lastSwitchedAt?.toISOString?.(),
    };
    localStorage.setItem(storageKey(context.userId), JSON.stringify(payload));
  }
}
