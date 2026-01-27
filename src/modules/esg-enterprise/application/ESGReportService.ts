import type { ESGCertification } from '../domain/ESGCertification';
import { esgProjectService } from './ESGProjectService';

function getEnterpriseId(): string {
  if (typeof window === 'undefined') return 'demo-enterprise';
  return sessionStorage.getItem('esg_email') || sessionStorage.getItem('esg_company_name') || 'demo-enterprise';
}

export interface ESGScoreReport {
  enterpriseId: string;
  score: number; // 0–100
  activeProjects: number;
  completedProjects: number;
  carbonOffsetTotal: number; // tons CO2
  certifications: ESGCertification[];
}

const MOCK_CERTS: ESGCertification[] = [
  { id: 'c1', name: 'Carbon Neutral Pledge', issuer: 'VITA', issuedAt: '2024-06-01', type: 'carbon' },
  { id: 'c2', name: 'Green Enterprise', issuer: 'VITA', issuedAt: '2024-09-01', expiryAt: '2025-09-01', type: 'green' },
];

/** ESG score, carbon offset, certifications. */
export class ESGReportService {
  async getESGScore(enterpriseId?: string): Promise<ESGScoreReport> {
    const eid = enterpriseId || getEnterpriseId();
    const projects = await esgProjectService.getProjects(eid);
    const active = projects.filter((p) => p.status === 'active').length;
    const completed = projects.filter((p) => p.status === 'completed').length;
    let carbonOffsetTotal = 0;
    for (const p of projects) {
      if (p.carbonTarget != null && p.progress != null) {
        carbonOffsetTotal += (p.carbonTarget * p.progress) / 100;
      }
    }
    // Simple score: base 50 + active*10 + completed*5 + carbon tier
    const carbonTier = carbonOffsetTotal >= 10000 ? 20 : carbonOffsetTotal >= 5000 ? 15 : carbonOffsetTotal >= 1000 ? 10 : 5;
    const score = Math.min(100, 50 + active * 10 + completed * 5 + carbonTier);
    return {
      enterpriseId: eid,
      score: Math.round(score),
      activeProjects: active,
      completedProjects: completed,
      carbonOffsetTotal: Math.round(carbonOffsetTotal),
      certifications: [...MOCK_CERTS],
    };
  }
}

export const esgReportService = new ESGReportService();
