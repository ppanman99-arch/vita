/**
 * Shared type for green investment opportunities (HTX / admin-forest-funding).
 * Compatible with InvestmentOpportunity; consumed by Member Capital and ESG Cá nhân.
 */
export interface GreenInvestmentOpportunity {
  id: string;
  name: string;
  cooperative: string;
  cooperativeId?: string;
  image?: string;
  targetAmount: number;
  raised: number;
  minInvest: number;
  expectedReturn: number;
  duration: string;
  investors: number;
  description?: string;
  benefits?: string[];
  /** ESG: ước tính tín chỉ CO2 (tấn) */
  carbonCreditsEstimate?: number;
  /** ESG: thể loại (rừng, dược liệu, ...) */
  esgCategory?: string;
  /** Nguồn tạo: HTX hoặc admin forest funding */
  source?: 'htx' | 'admin_forest_funding';
  /** Thời điểm tạo/cập nhật */
  createdAt?: string;
  updatedAt?: string;
}
