import type { PersonalESGProfile, ESGBadge, GreenCitizenTier } from '../domain/PersonalESG';

const DEMO_USER = 'demo-user';

function getUserId(): string {
  if (typeof window === 'undefined') return DEMO_USER;
  return sessionStorage.getItem('user_id') || localStorage.getItem('user_id') || DEMO_USER;
}

const MOCK_BADGES: ESGBadge[] = [
  { id: 'b1', name: 'Green Starter', description: 'Điểm xanh đầu tiên', icon: 'ri-seedling-line', earnedAt: '2024-06-01', category: 'habit' },
  { id: 'b2', name: 'Tree Planter x5', description: 'Đóng góp tương đương 5 cây xanh', icon: 'ri-plant-line', earnedAt: '2024-09-15', category: 'carbon' },
  { id: 'b3', name: 'HTX Supporter', description: 'Góp vốn vào hợp tác xã', icon: 'ri-community-line', earnedAt: '2024-07-20', category: 'investment' },
];

export class PersonalESGService {
  async getProfile(userId?: string): Promise<PersonalESGProfile | null> {
    const uid = userId || getUserId();
    return Promise.resolve({
      userId: uid,
      displayName: 'Công dân Xanh',
      memberSince: '2024-01-15',
      tier: 'tree' as GreenCitizenTier,
      impactScore: 72,
      totalGreenPoints: 0,
      totalESGValue: 0,
      carbonOffsetTonnes: 0,
      treesEquivalent: 0,
    });
  }

  async getBadges(userId?: string): Promise<ESGBadge[]> {
    return Promise.resolve([...MOCK_BADGES]);
  }
}

export const personalESGService = new PersonalESGService();
