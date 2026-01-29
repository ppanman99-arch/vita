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

function mapRow(row: any): GreenInvestmentOpportunity {
  return {
    id: row.id,
    name: row.name,
    cooperative: row.cooperative ?? '',
    cooperativeId: row.cooperative_id,
    image: row.image,
    targetAmount: Number(row.target_amount ?? 0),
    raised: Number(row.raised ?? 0),
    minInvest: Number(row.min_invest ?? 0),
    expectedReturn: Number(row.expected_return ?? 0),
    duration: row.duration ?? '',
    investors: Number(row.investors ?? 0),
    description: row.description,
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    carbonCreditsEstimate: row.carbon_credits_estimate != null ? Number(row.carbon_credits_estimate) : undefined,
    esgCategory: row.esg_category,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Shared service for green investment opportunities.
 * HTX / cooperative projects write to Supabase; Member Capital and ESG read from Supabase (fallback localStorage).
 */
export class GreenInvestmentOpportunityService {
  async getOpportunitiesForIndividuals(): Promise<GreenInvestmentOpportunity[]> {
    try {
      const { supabase } = await import('../../../lib/supabase');
      const { data, error } = await supabase
        .from('green_investment_opportunities')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(mapRow);
      }
    } catch {
      // Supabase not configured or table missing: use localStorage
    }
    const list = load();
    return Promise.resolve(list.length > 0 ? [...list] : []);
  }

  async getByCooperative(cooperativeId: string): Promise<GreenInvestmentOpportunity[]> {
    try {
      const { supabase } = await import('../../../lib/supabase');
      const { data, error } = await supabase
        .from('green_investment_opportunities')
        .select('*')
        .eq('cooperative_id', cooperativeId)
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(mapRow);
      }
    } catch {
      // fallback
    }
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
    try {
      const { supabase } = await import('../../../lib/supabase');
      const { data: row, error } = await supabase
        .from('green_investment_opportunities')
        .select('*')
        .eq('id', opportunityId)
        .single();
      if (!error && row) {
        const raised = Number(row.raised ?? 0) + additionalRaised;
        const investors = Number(row.investors ?? 0) + 1;
        const { data: updated, error: updateError } = await supabase
          .from('green_investment_opportunities')
          .update({ raised, investors, updated_at: new Date().toISOString() })
          .eq('id', opportunityId)
          .select()
          .single();
        if (!updateError && updated) return mapRow(updated);
      }
    } catch {
      // fallback to localStorage
    }
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
