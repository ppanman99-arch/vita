export type ContractType = 'offtake' | 'investment' | 'supply';
export type ContractStatus = 'draft' | 'pending' | 'signed' | 'active' | 'expired' | 'cancelled';

export interface Contract {
  id: string;
  cooperativeId: string;
  memberId?: string;
  enterpriseId?: string;
  type: ContractType;
  status: ContractStatus;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  signedDate?: Date;
  // Contract details
  terms?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
