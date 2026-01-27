import type { Role } from '@core/domain/user/Role';

export interface MemberRole {
  role: Role;
  status: 'active' | 'inactive';
  metadata?: {
    producer?: { activeFarms: number };
    investor?: { totalInvested: number };
    consumer?: { greenPoints: number };
    resource?: { areaHa: number };
  };
}
