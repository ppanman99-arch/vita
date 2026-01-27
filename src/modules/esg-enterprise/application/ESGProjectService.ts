import type { ESGProject } from '../domain/ESGProject';

const STORAGE_KEY = 'vita_esg_projects';

function getEnterpriseId(): string {
  if (typeof window === 'undefined') return 'demo-enterprise';
  return sessionStorage.getItem('esg_email') || sessionStorage.getItem('esg_company_name') || 'demo-enterprise';
}

function loadProjects(): ESGProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: ESGProject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

const MOCK: ESGProject[] = [
  {
    id: 'esg-1',
    enterpriseId: 'demo-enterprise',
    name: 'Trồng rừng ngập mặn Cần Giờ',
    description: 'Dự án trồng và phục hồi rừng ngập mặn, hấp thụ CO2.',
    goals: 'Carbon offset, đa dạng sinh học',
    carbonTarget: 5000,
    area: 20,
    treesPlanted: 8000,
    progress: 65,
    status: 'active',
    timeline: '2024–2026',
    location: 'Cần Giờ, TP.HCM',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'esg-2',
    enterpriseId: 'demo-enterprise',
    name: 'Vườn ươm cây xanh đô thị',
    description: 'Ươm cây giống phục vụ công viên, đường phố.',
    goals: 'Xanh hóa đô thị, giáo dục môi trường',
    carbonTarget: 500,
    area: 2,
    treesPlanted: 1500,
    progress: 100,
    status: 'completed',
    timeline: '2024',
    location: 'Quận 7, TP.HCM',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
];

/** ESG project CRUD and progress updates. */
export class ESGProjectService {
  async getProjects(enterpriseId?: string): Promise<ESGProject[]> {
    const eid = enterpriseId || getEnterpriseId();
    let stored = loadProjects();
    const fromStorage = stored.filter((p) => p.enterpriseId === eid);
    if (fromStorage.length > 0) return fromStorage;
    const seed = MOCK.filter((p) => p.enterpriseId === eid || p.enterpriseId === 'demo-enterprise');
    if (seed.length > 0) {
      for (const p of seed) stored.push({ ...p, enterpriseId: eid });
      saveProjects(stored);
      return seed.map((p) => ({ ...p, enterpriseId: eid }));
    }
    return [];
  }

  async createProject(data: Partial<ESGProject>): Promise<ESGProject> {
    const eid = getEnterpriseId();
    const now = new Date().toISOString();
    const project: ESGProject = {
      id: `esg-${Date.now()}`,
      enterpriseId: eid,
      name: data.name ?? 'Dự án mới',
      description: data.description,
      goals: data.goals,
      carbonTarget: data.carbonTarget,
      area: data.area,
      treesPlanted: data.treesPlanted ?? 0,
      progress: data.progress ?? 0,
      status: (data.status as ESGProject['status']) ?? 'draft',
      timeline: data.timeline,
      location: data.location,
      createdAt: now,
      updatedAt: now,
      evidenceUrls: data.evidenceUrls,
    };
    const all = loadProjects();
    all.push(project);
    saveProjects(all);
    return project;
  }

  async updateProject(id: string, data: Partial<ESGProject>): Promise<ESGProject> {
    const all = loadProjects();
    const idx = all.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error('Dự án không tồn tại');
    const updated = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    all[idx] = updated;
    saveProjects(all);
    return updated;
  }

  async getProjectById(id: string): Promise<ESGProject | null> {
    const all = loadProjects();
    const found = all.find((p) => p.id === id);
    if (found) return found;
    return MOCK.find((p) => p.id === id) ?? null;
  }

  async updateProgress(projectId: string, progress: number, evidenceUrls?: string[]): Promise<void> {
    const p = await this.getProjectById(projectId);
    if (!p) throw new Error('Dự án không tồn tại');
    const updates: Partial<ESGProject> = { progress: Math.min(100, Math.max(0, progress)), updatedAt: new Date().toISOString() };
    if (evidenceUrls?.length) updates.evidenceUrls = [...(p.evidenceUrls ?? []), ...evidenceUrls];
    await this.updateProject(projectId, updates);
  }
}

export const esgProjectService = new ESGProjectService();
