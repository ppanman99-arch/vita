import type { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';
import type { GreenInvestmentOpportunity } from '../../member/domain/greenInvestmentOpportunity';

function mapRow(row: any): GreenInvestmentOpportunity {
  return {
    id: row.id,
    name: row.name,
    cooperative: row.cooperative,
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
    source: row.source ?? 'htx',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface CreateProjectInput {
  cooperativeId: string;
  cooperativeName: string;
  name: string;
  targetAmount: number;
  minInvest: number;
  expectedReturn: number;
  duration: string;
  description?: string;
  benefits?: string[];
  image?: string;
  carbonCreditsEstimate?: number;
  esgCategory?: string;
}

export class CooperativeProjectService {
  private db: IDatabasePort;

  constructor(db: IDatabasePort = new SupabaseDatabaseAdapter()) {
    this.db = db;
  }

  async listByCooperative(cooperativeId: string): Promise<GreenInvestmentOpportunity[]> {
    const rows = await this.db.query<any>({
      table: 'green_investment_opportunities',
      filters: { cooperative_id: cooperativeId },
      orderBy: { column: 'created_at', ascending: false },
    });
    return rows.map(mapRow);
  }

  async create(input: CreateProjectInput): Promise<GreenInvestmentOpportunity> {
    const now = new Date().toISOString();
    const row = await this.db.create<any>('green_investment_opportunities', {
      cooperative_id: input.cooperativeId,
      name: input.name,
      cooperative: input.cooperativeName,
      image: input.image ?? null,
      target_amount: input.targetAmount,
      raised: 0,
      min_invest: input.minInvest,
      expected_return: input.expectedReturn,
      duration: input.duration,
      investors: 0,
      description: input.description ?? null,
      benefits: input.benefits ?? [],
      carbon_credits_estimate: input.carbonCreditsEstimate ?? null,
      esg_category: input.esgCategory ?? null,
      source: 'htx',
      status: 'published',
      created_at: now,
      updated_at: now,
    });
    return mapRow(row);
  }
}
