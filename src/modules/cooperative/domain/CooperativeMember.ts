export type MemberRole = 'producer' | 'investor' | 'consumer' | 'admin';
export type MemberStatus = 'active' | 'pending' | 'suspended';

export interface CooperativeMember {
  id: string;
  cooperativeId: string;
  userId: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: Date;
  // Additional fields
  name?: string;
  email?: string;
  phone?: string;
  vitaScore?: number;
  area?: number; // hectares
  compliance?: number; // percentage
  createdAt: Date;
  updatedAt: Date;
}
