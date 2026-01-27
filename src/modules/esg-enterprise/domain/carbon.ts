/** Domain types for Carbon footprint, credits, and marketplace. */

export interface CarbonFootprint {
  enterpriseId: string;
  period: string; // e.g. "2025-Q1"
  totalEmissions: number; // tons CO2e
  quota?: number; // allowed limit (tons)
  byScope: {
    scope1?: number;
    scope2?: number;
    scope3?: number;
  };
}

export interface CarbonReport {
  enterpriseId: string;
  period: string;
  footprint: CarbonFootprint;
  comparison?: { period: string; emissions: number }[];
  recommendations?: string[];
}

export interface CarbonCredit {
  id: string;
  sellerId?: string;
  sellerName?: string;
  amount: number; // tons CO2
  pricePerTon: number; // VND
  status: 'available' | 'sold' | 'reserved';
  projectName?: string;
  issuedAt?: string;
}

export interface CarbonTransaction {
  id: string;
  enterpriseId: string;
  type: 'buy' | 'sell';
  amount: number;
  pricePerTon: number;
  totalAmount: number;
  creditId?: string;
  counterparty?: string;
  createdAt: string;
}
