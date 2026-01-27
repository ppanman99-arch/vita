import type { GreenInvestmentOpportunity } from '../domain/greenInvestmentOpportunity';

const STORAGE_KEY = 'vita_green_investment_opportunities';

function load(): GreenInvestmentOpportunity[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(opportunities: GreenInvestmentOpportunity[]): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    }
  } catch {
    // ignore
  }
}

/**
 * Shared service for green investment opportunities.
 * HTX / admin-forest-funding write; Member Capital and ESG Cá nhân read.
 */
export class GreenInvestmentOpportunityService {
  async getOpportunitiesForIndividuals(): Promise<GreenInvestmentOpportunity[]> {
    const list = load();
    return Promise.resolve(list.length > 0 ? [...list] : []);
  }

  async getByCooperative(cooperativeId: string): Promise<GreenInvestmentOpportunity[]> {
    const list = load();
    return Promise.resolve(
      list.filter(
        (o) => o.cooperativeId === cooperativeId || o.cooperative.toLowerCase().includes(cooperativeId.toLowerCase())
      )
    );
  }

  async addOpportunity(data: Omit<GreenInvestmentOpportunity, 'createdAt' | 'updatedAt'>): Promise<GreenInvestmentOpportunity> {
    const list = load();
    const now = new Date().toISOString();
    const existing = list.findIndex((o) => o.id === data.id);
    const opportunity: GreenInvestmentOpportunity = {
      ...data,
      createdAt: existing >= 0 ? list[existing].createdAt : now,
      updatedAt: now,
    };
    if (existing >= 0) {
      list[existing] = opportunity;
    } else {
      list.push(opportunity);
    }
    save(list);
    return Promise.resolve(opportunity);
  }

  async updateRaised(opportunityId: string, additionalRaised: number): Promise<GreenInvestmentOpportunity | null> {
    const list = load();
    const idx = list.findIndex((o) => o.id === opportunityId);
    if (idx < 0) return Promise.resolve(null);
    list[idx].raised = (list[idx].raised || 0) + additionalRaised;
    list[idx].investors = (list[idx].investors || 0) + 1;
    list[idx].updatedAt = new Date().toISOString();
    save(list);
    return Promise.resolve(list[idx]);
  }
}

export const greenInvestmentOpportunityService = new GreenInvestmentOpportunityService();
