import type { Role } from '@core/domain/user/Role';

export interface Member {
  id: string;
  userId: string;
  availableRoles: Role[];
  activeRole: Role;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
