import type {
  CarbonFootprint,
  CarbonReport,
  CarbonCredit,
  CarbonTransaction,
} from '../domain/carbon';

const STORAGE_CREDITS = 'vita_esg_carbon_credits';
const STORAGE_TXS = 'vita_esg_carbon_transactions';

function getEnterpriseId(): string {
  if (typeof window === 'undefined') return 'demo-enterprise';
  return sessionStorage.getItem('esg_email') || sessionStorage.getItem('esg_company_name') || 'demo-enterprise';
}

function loadCredits(): CarbonCredit[] {
  try {
    const raw = localStorage.getItem(STORAGE_CREDITS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCredits(credits: CarbonCredit[]): void {
  localStorage.setItem(STORAGE_CREDITS, JSON.stringify(credits));
}

function loadTransactions(): CarbonTransaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_TXS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTransactions(txs: CarbonTransaction[]): void {
  localStorage.setItem(STORAGE_TXS, JSON.stringify(txs));
}

const MOCK_CREDITS: CarbonCredit[] = [
  { id: 'cc-1', sellerName: 'HTX Dược liệu Kon Tum', amount: 500, pricePerTon: 500_000, status: 'available', projectName: 'Rừng Sâm Ngọc Linh', issuedAt: '2024-06' },
  { id: 'cc-2', sellerName: 'HTX Nông nghiệp Sạch Đà Lạt', amount: 300, pricePerTon: 450_000, status: 'available', projectName: 'Vườn ươm công nghệ cao', issuedAt: '2024-09' },
  { id: 'cc-3', sellerName: 'HTX Dược liệu Lâm Đồng', amount: 200, pricePerTon: 480_000, status: 'available', projectName: 'Đương Quy hữu cơ', issuedAt: '2024-12' },
];

const MOCK_MONTHLY = [
  { month: 'T1', emissions: 120, quota: 150 },
  { month: 'T2', emissions: 135, quota: 150 },
  { month: 'T3', emissions: 128, quota: 150 },
  { month: 'T4', emissions: 142, quota: 150 },
  { month: 'T5', emissions: 138, quota: 150 },
  { month: 'T6', emissions: 125, quota: 150 },
];

/**
 * Carbon footprint, reports, and credits marketplace.
 */
export class CarbonService {
  async calculateCarbonFootprint(enterpriseId?: string, period?: string): Promise<CarbonFootprint> {
    const eid = enterpriseId || getEnterpriseId();
    const p = period || '2025-Q1';
    const total = 788; // sum of 6 months mock
    return {
      enterpriseId: eid,
      period: p,
      totalEmissions: total,
      quota: 900,
      byScope: { scope1: 200, scope2: 350, scope3: 238 },
    };
  }

  async generateCarbonReport(enterpriseId?: string, period?: string): Promise<CarbonReport> {
    const footprint = await this.calculateCarbonFootprint(enterpriseId, period);
    return {
      enterpriseId: footprint.enterpriseId,
      period: footprint.period,
      footprint,
      comparison: [
        { period: '2024-Q4', emissions: 820 },
        { period: '2024-Q3', emissions: 850 },
        { period: footprint.period, emissions: footprint.totalEmissions },
      ],
      recommendations: [
        'Chuyển đổi năng lượng văn phòng sang năng lượng tái tạo (giảm Scope 2).',
        'Ưu tiên nhà cung cấp có báo cáo carbon (giảm Scope 3).',
        'Bù đắp phát thải còn lại bằng mua tín chỉ Carbon trên Sàn VITA.',
      ],
    };
  }

  async listCarbonCredits(): Promise<CarbonCredit[]> {
    let stored = loadCredits();
    if (stored.length === 0) {
      stored = MOCK_CREDITS.map((c) => ({ ...c }));
      saveCredits(stored);
    }
    return stored.filter((c) => c.status === 'available');
  }

  async buyCarbonCredits(creditId: string, amount: number): Promise<CarbonTransaction> {
    const credits = loadCredits();
    const list = credits.length ? credits : (() => { const s = MOCK_CREDITS.map((c) => ({ ...c })); saveCredits(s); return s; })();
    const credit = list.find((c) => c.id === creditId);
    if (!credit || credit.status !== 'available') throw new Error('Tín chỉ không khả dụng');
    if (amount > credit.amount) throw new Error('Số lượng vượt quá');
    const eid = getEnterpriseId();
    const totalAmount = amount * credit.pricePerTon;
    const tx: CarbonTransaction = {
      id: `tx-${Date.now()}`,
      enterpriseId: eid,
      type: 'buy',
      amount,
      pricePerTon: credit.pricePerTon,
      totalAmount,
      creditId,
      counterparty: credit.sellerName,
      createdAt: new Date().toISOString(),
    };
    const txs = loadTransactions();
    txs.push(tx);
    saveTransactions(txs);
    const idx = list.findIndex((c) => c.id === creditId);
    if (idx >= 0) {
      if (list[idx].amount === amount) list[idx].status = 'sold';
      else list[idx] = { ...list[idx], amount: list[idx].amount - amount };
      saveCredits(list);
    }
    return tx;
  }

  async sellCarbonCredits(amount: number, pricePerTon: number): Promise<CarbonCredit> {
    const eid = getEnterpriseId();
    const credit: CarbonCredit = {
      id: `cc-sell-${Date.now()}`,
      sellerId: eid,
      sellerName: eid,
      amount,
      pricePerTon,
      status: 'available',
      projectName: 'Từ dự án ESG',
      issuedAt: new Date().toISOString().slice(0, 7),
    };
    const credits = loadCredits();
    credits.push(credit);
    saveCredits(credits);
    return credit;
  }

  async getTransactionHistory(enterpriseId?: string): Promise<CarbonTransaction[]> {
    const eid = enterpriseId || getEnterpriseId();
    const txs = loadTransactions().filter((t) => t.enterpriseId === eid);
    return txs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const carbonService = new CarbonService();
