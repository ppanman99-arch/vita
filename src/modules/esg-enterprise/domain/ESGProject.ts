/** Domain entity for ESG projects (enterprise-owned). */

export type ESGProjectStatus = 'draft' | 'active' | 'completed';

export interface ESGProject {
  id: string;
  enterpriseId: string;
  name: string;
  description?: string;
  goals?: string;
  /** Carbon target (tons CO2) */
  carbonTarget?: number;
  /** Area (ha) */
  area?: number;
  /** Tree count */
  treesPlanted?: number;
  /** 0–100 */
  progress: number;
  status: ESGProjectStatus;
  timeline?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  /** Evidence / image URLs */
  evidenceUrls?: string[];
}
