export interface Cooperative {
  id: string;
  authUserId?: string;
  name: string;
  taxCode?: string;
  establishedYear?: number;
  memberCount?: number;
  totalForestArea?: number;
  location?: string;
  representative?: string;
  representativePosition?: string;
  phone?: string;
  email: string;
  currentActivities?: string;
  interests?: string[];
  additionalInfo?: string;
  logoUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  createdAt: Date;
  updatedAt: Date;
}
