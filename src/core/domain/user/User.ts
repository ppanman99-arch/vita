import { Role } from './Role';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
