import { Permission } from './Permission';

export const Role = {
  FARMER: 'farmer',
  INVESTOR: 'investor',
  ADMIN: 'admin',
  CONSUMER: 'consumer',
  COOPERATIVE: 'cooperative',
  ENTERPRISE: 'enterprise',
  EXPERT: 'expert',
  RESEARCH: 'research',
  PARTNER: 'partner',
  PHYSICIAN: 'physician',
  GOVERNMENT: 'government',
} as const;

export type Role = typeof Role[keyof typeof Role];

/*export enum Role {
  FARMER = 'farmer',
  INVESTOR = 'investor',
  ADMIN = 'admin',
  CONSUMER = 'consumer',
  COOPERATIVE = 'cooperative',
  ENTERPRISE = 'enterprise',
  EXPERT = 'expert',
  RESEARCH = 'research',
  PARTNER = 'partner',
  PHYSICIAN = 'physician',
  GOVERNMENT = 'government',
}*/

export interface RoleMetadata {
  id: Role;
  name: string;
  displayName: string;
  permissions: Permission[];
}
