import type { Product, Voucher, ConsumerOrder } from '../domain/consumer';
import { getUserGreenPoints, getAvailableRewards, redeemPoints as gpRedeemPoints } from '@/lib/greenPoints/service';
import type { GreenPoints } from '@/lib/greenPoints/types';
import type { GreenPointReward } from '@/lib/greenPoints/types';

const DEMO_USER = 'demo-user';

function getUserId(): string {
  if (typeof window === 'undefined') return DEMO_USER;
  return sessionStorage.getItem('user_id') || localStorage.getItem('user_id') || DEMO_USER;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Sâm Ngọc Linh loại 1', cooperative: 'HTX Dược Liệu Kon Tum', category: 'Dược liệu', price: 8_000_000, memberPrice: 6_400_000, unit: 'kg' },
  { id: 'p2', name: 'Trà Cà Gai Leo', cooperative: 'HTX Dược Liệu Kon Tum', category: 'Trà', price: 120_000, memberPrice: 96_000, unit: 'hộp' },
  { id: 'p3', name: 'Cao Đương Quy', cooperative: 'HTX Dược Liệu Lâm Đồng', category: 'Cao', price: 560_000, memberPrice: 448_000, unit: 'chai' },
  { id: 'p4', name: 'Đinh Lăng tươi', cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt', category: 'Dược liệu', price: 45_000, memberPrice: 36_000, unit: 'kg' },
  { id: 'p5', name: 'Mật ong rừng', cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt', category: 'Thực phẩm', price: 350_000, memberPrice: 280_000, unit: 'chai' },
];

const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', name: 'Giảm 20% đơn hàng tiếp theo', discount: 20, discountType: 'percent', minOrder: 300_000, expiryDate: '30/03/2025', status: 'available' },
  { id: 'v2', name: 'Miễn phí vận chuyển', discount: 50_000, discountType: 'fixed', minOrder: 500_000, expiryDate: '15/02/2025', status: 'available' },
  { id: 'v3', name: 'Giảm 10% sản phẩm hữu cơ', discount: 10, discountType: 'percent', minOrder: 200_000, expiryDate: '30/01/2025', status: 'used', usedDate: '10/01/2025' },
];

const MOCK_ORDERS: ConsumerOrder[] = [
  { id: 'ORD-001', userId: DEMO_USER, date: '2025-01-05', items: 'Sâm Ngọc Linh (2kg), Trà Cà Gai Leo (3 hộp)', total: 11_200_000, status: 'completed' },
  { id: 'ORD-002', userId: DEMO_USER, date: '2024-12-28', items: 'Cao Đương Quy (1 chai)', total: 448_000, status: 'completed' },
  { id: 'ORD-003', userId: DEMO_USER, date: '2024-12-20', items: 'Đinh Lăng tươi (5kg), Mật ong (2 chai)', total: 800_000, status: 'completed' },
];

/**
 * ConsumerService – tiêu dùng: sản phẩm HTX, voucher, đơn hàng, đổi điểm.
 * Tích hợp GreenPointsService cho rewards và redeem.
 */
export class ConsumerService {
  async getMemberProducts(_userId?: string): Promise<Product[]> {
    return Promise.resolve([...MOCK_PRODUCTS]);
  }

  async getVouchers(userId?: string): Promise<Voucher[]> {
    const uid = userId || getUserId();
    return Promise.resolve(MOCK_VOUCHERS.filter((v) => v.status !== 'expired'));
  }

  async getPurchaseHistory(userId?: string): Promise<ConsumerOrder[]> {
    const uid = userId || getUserId();
    const list = MOCK_ORDERS.filter((o) => o.userId === uid);
    return Promise.resolve([...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  async getGreenPoints(userId?: string): Promise<GreenPoints | null> {
    return getUserGreenPoints(userId || getUserId());
  }

  async getRewards(): Promise<GreenPointReward[]> {
    return getAvailableRewards();
  }

  async redeemPoints(points: number, rewardId: string, rewardName: string): Promise<void> {
    const uid = getUserId();
    await gpRedeemPoints(uid, rewardId, points, rewardName);
  }
}

export const consumerService = new ConsumerService();
