import type {
  InvestmentOpportunity,
  Investment,
  Portfolio,
  Dividend,
  CapitalTransaction,
} from '../domain/capital';

const DEMO_USER = 'demo-user';

const MOCK_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    id: '3',
    name: 'Dự án Đương Quy hữu cơ',
    cooperative: 'HTX Dược Liệu Lâm Đồng',
    image: 'https://readdy.ai/api/search-image?query=angelica%20herb%20farm%20organic%20farming%20vietnam%20natural%20green%20field%20simple%20background%20high%20quality&width=400&height=300&seq=project-duong-quy-003&orientation=landscape',
    targetAmount: 200_000_000,
    raised: 120_000_000,
    minInvest: 10_000_000,
    expectedReturn: 15,
    duration: '24 tháng',
    investors: 12,
    description: 'Dự án trồng Đương Quy hữu cơ quy mô 5 hecta tại vùng cao Lâm Đồng. Áp dụng công nghệ canh tác tiên tiến, đảm bảo chất lượng theo tiêu chuẩn GACP-WHO.',
    benefits: [
      'Chia cổ tức hàng quý từ doanh thu bán sản phẩm',
      'Được mua sản phẩm với giá ưu đãi xã viên',
      'Tham gia các hoạt động đào tạo và hội thảo',
      'Quyền biểu quyết trong đại hội xã viên',
    ],
  },
  {
    id: '4',
    name: 'Trại nghiên cứu Dược liệu',
    cooperative: 'HTX Khoa Học Dược Liệu Tây Nguyên',
    image: 'https://readdy.ai/api/search-image?query=medicinal%20herb%20research%20farm%20laboratory%20vietnam%20scientific%20modern%20clean%20simple%20background%20professional&width=400&height=300&seq=project-research-004&orientation=landscape',
    targetAmount: 150_000_000,
    raised: 45_000_000,
    minInvest: 5_000_000,
    expectedReturn: 18,
    duration: '36 tháng',
    investors: 5,
    description: 'Trại nghiên cứu và nhân giống các loại dược liệu quý hiếm. Hợp tác với Viện Dược liệu để phát triển giống mới có năng suất và chất lượng cao.',
    benefits: [
      'Lợi nhuận cao từ bán giống và chuyển giao công nghệ',
      'Ưu tiên mua giống với giá gốc',
      'Được đào tạo kỹ thuật canh tác miễn phí',
      'Hỗ trợ tiêu thụ sản phẩm sau thu hoạch',
    ],
  },
  {
    id: '5',
    name: 'Vườn Sâm Ngọc Linh mở rộng - Lô C',
    cooperative: 'HTX Dược Liệu Kon Tum',
    image: 'https://readdy.ai/api/search-image?query=ginseng%20farm%20plantation%20mountain%20vietnam%20natural%20organic%20farming%20simple%20clean%20background%20high%20quality&width=400&height=300&seq=project-sam-005&orientation=landscape',
    targetAmount: 500_000_000,
    raised: 280_000_000,
    minInvest: 20_000_000,
    expectedReturn: 12,
    duration: '36 tháng',
    investors: 18,
    description: 'Mở rộng vùng trồng Sâm Ngọc Linh hữu cơ, áp dụng mô hình rừng trồng kết hợp.',
  },
];

const MOCK_INVESTMENTS: Investment[] = [
  {
    id: 'inv-1',
    opportunityId: '1',
    projectName: 'Dự án Sâm Ngọc Linh - Lô B2',
    cooperative: 'HTX Dược Liệu Kon Tum',
    image: 'https://readdy.ai/api/search-image?query=ginseng%20farm%20plantation%20mountain%20vietnam%20natural%20organic%20farming%20simple%20clean%20background%20high%20quality&width=400&height=300&seq=project-sam-001&orientation=landscape',
    invested: 50_000_000,
    currentValue: 56_000_000,
    profitPercent: 12,
    status: 'active',
    nextDividend: '15/02/2025',
    dividendAmount: 1_500_000,
    investedAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'inv-2',
    opportunityId: '2',
    projectName: 'Vườn ươm công nghệ cao',
    cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
    image: 'https://readdy.ai/api/search-image?query=modern%20greenhouse%20nursery%20high%20tech%20agriculture%20vietnam%20clean%20organized%20simple%20background%20professional&width=400&height=300&seq=project-nursery-002&orientation=landscape',
    invested: 30_000_000,
    currentValue: 33_600_000,
    profitPercent: 12,
    status: 'active',
    nextDividend: '20/02/2025',
    dividendAmount: 900_000,
    investedAt: '2024-09-01T00:00:00Z',
  },
];

const MOCK_DIVIDENDS: Dividend[] = [
  { id: 'div-1', userId: DEMO_USER, investmentId: 'inv-1', projectName: 'Sâm Ngọc Linh - Lô B2', cooperative: 'HTX Dược Liệu Kon Tum', amount: 1_200_000, paidAt: '2024-11-15T00:00:00Z', period: 'Q4/2024' },
  { id: 'div-2', userId: DEMO_USER, investmentId: 'inv-2', projectName: 'Vườn ươm công nghệ cao', cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt', amount: 900_000, paidAt: '2024-11-20T00:00:00Z', period: 'Q4/2024' },
  { id: 'div-3', userId: DEMO_USER, investmentId: 'inv-1', projectName: 'Sâm Ngọc Linh - Lô B2', cooperative: 'HTX Dược Liệu Kon Tum', amount: 1_500_000, paidAt: '2025-02-15T00:00:00Z', period: 'Q1/2025' },
];

const MOCK_TRANSACTIONS: CapitalTransaction[] = [
  { id: 'tx-1', userId: DEMO_USER, type: 'dividend', amount: 1_500_000, description: 'Cổ tức Q1/2025 - Sâm Ngọc Linh Lô B2', projectName: 'Sâm Ngọc Linh - Lô B2', cooperative: 'HTX Dược Liệu Kon Tum', createdAt: '2025-02-15T10:00:00Z', relatedId: 'div-3' },
  { id: 'tx-2', userId: DEMO_USER, type: 'invest', amount: -50_000_000, description: 'Góp vốn vào Sâm Ngọc Linh - Lô B2', projectName: 'Sâm Ngọc Linh - Lô B2', cooperative: 'HTX Dược Liệu Kon Tum', createdAt: '2024-06-15T00:00:00Z', relatedId: 'inv-1' },
  { id: 'tx-3', userId: DEMO_USER, type: 'invest', amount: -30_000_000, description: 'Góp vốn vào Vườn ươm công nghệ cao', projectName: 'Vườn ươm công nghệ cao', cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt', createdAt: '2024-09-01T00:00:00Z', relatedId: 'inv-2' },
  { id: 'tx-4', userId: DEMO_USER, type: 'dividend', amount: 1_200_000, description: 'Cổ tức Q4/2024 - Sâm Ngọc Linh Lô B2', projectName: 'Sâm Ngọc Linh - Lô B2', cooperative: 'HTX Dược Liệu Kon Tum', createdAt: '2024-11-15T00:00:00Z', relatedId: 'div-1' },
  { id: 'tx-5', userId: DEMO_USER, type: 'dividend', amount: 900_000, description: 'Cổ tức Q4/2024 - Vườn ươm công nghệ cao', projectName: 'Vườn ươm công nghệ cao', cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt', createdAt: '2024-11-20T00:00:00Z', relatedId: 'div-2' },
];

function getUserId(): string {
  if (typeof window === 'undefined') return DEMO_USER;
  return sessionStorage.getItem('user_id') || localStorage.getItem('user_id') || DEMO_USER;
}

/**
 * CapitalService – góp vốn: cơ hội đầu tư, danh mục, cổ tức, giao dịch.
 * Mock data; có thể chuyển sang API/Supabase sau.
 */
export class CapitalService {
  async getInvestmentOpportunities(): Promise<InvestmentOpportunity[]> {
    return Promise.resolve([...MOCK_OPPORTUNITIES]);
  }

  async invest(_opportunityId: string, amount: number): Promise<Investment> {
    const opp = MOCK_OPPORTUNITIES.find((o) => o.id === _opportunityId);
    if (!opp) throw new Error('Cơ hội đầu tư không tồn tại');
    if (amount < opp.minInvest) throw new Error(`Số tiền tối thiểu ${opp.minInvest.toLocaleString('vi-VN')} VNĐ`);
    // TODO: integrate payment gateway; for now return a stub
    const inv: Investment = {
      id: `inv-new-${Date.now()}`,
      opportunityId: opp.id,
      projectName: opp.name,
      cooperative: opp.cooperative,
      image: opp.image,
      invested: amount,
      currentValue: amount,
      profitPercent: 0,
      status: 'active',
      investedAt: new Date().toISOString(),
    };
    return Promise.resolve(inv);
  }

  async getPortfolio(userId?: string): Promise<Portfolio> {
    const uid = userId || getUserId();
    const list = MOCK_INVESTMENTS.filter((i) => i.id); // all demo investments for demo user
    const totalInvested = list.reduce((s, i) => s + i.invested, 0);
    const totalCurrentValue = list.reduce((s, i) => s + i.currentValue, 0);
    const totalProfitAmount = totalCurrentValue - totalInvested;
    const totalProfitPercent = totalInvested > 0 ? (totalProfitAmount / totalInvested) * 100 : 0;
    return Promise.resolve({
      userId: uid,
      totalInvested,
      totalCurrentValue,
      totalProfitAmount,
      totalProfitPercent,
      activeInvestments: list.filter((i) => i.status === 'active').length,
      investments: [...list],
    });
  }

  async getDividendHistory(userId?: string): Promise<Dividend[]> {
    const uid = userId || getUserId();
    const list = MOCK_DIVIDENDS.filter((d) => d.userId === uid);
    return Promise.resolve([...list].sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()));
  }

  async getTransactions(userId?: string): Promise<CapitalTransaction[]> {
    const uid = userId || getUserId();
    const list = MOCK_TRANSACTIONS.filter((t) => t.userId === uid);
    return Promise.resolve([...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }
}

export const capitalService = new CapitalService();
