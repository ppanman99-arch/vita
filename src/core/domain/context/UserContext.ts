import { Role } from '../user/Role';
import { Permission } from '../user/Permission';

export interface UserContext {
  userId: string;
  activeRole: Role;
  availableRoles: Role[];
  permissions: Permission[];
  moduleAccess: string[];
  contextData?: Record<string, any>; // Additional context-specific data
  lastSwitchedAt?: Date;
}
