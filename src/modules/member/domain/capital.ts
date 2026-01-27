/** Domain types for Member Capital (Góp vốn) sub-module. */

export interface InvestmentOpportunity {
  id: string;
  name: string;
  cooperative: string;
  cooperativeId?: string;
  image?: string;
  targetAmount: number;
  raised: number;
  minInvest: number;
  expectedReturn: number; // % per year
  duration: string;
  investors: number;
  description?: string;
  benefits?: string[];
}

export interface Investment {
  id: string;
  opportunityId: string;
  projectName: string;
  cooperative: string;
  cooperativeId?: string;
  image?: string;
  invested: number;
  currentValue: number;
  profitPercent: number;
  status: 'active' | 'completed' | 'withdrawn';
  nextDividend?: string;
  dividendAmount?: number;
  investedAt: string;
}

export interface Portfolio {
  userId: string;
  totalInvested: number;
  totalCurrentValue: number;
  totalProfitAmount: number;
  totalProfitPercent: number;
  activeInvestments: number;
  investments: Investment[];
}

export interface Dividend {
  id: string;
  userId: string;
  investmentId: string;
  projectName: string;
  cooperative: string;
  amount: number;
  paidAt: string;
  period?: string; // e.g. "Q1/2025"
}

export type TransactionType = 'invest' | 'withdraw' | 'dividend';

export interface CapitalTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  projectName?: string;
  cooperative?: string;
  createdAt: string;
  relatedId?: string; // investment or dividend id
}
