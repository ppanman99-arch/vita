import type { Member } from '../domain/Member';
import type { Role } from '@core/domain/user/Role';
import { Role as R } from '@core/domain/user/Role';

const DEMO_USER_ID = 'demo-user';

/**
 * MemberService – member hub data.
 * Uses localStorage / sessionStorage for demo; can switch to API later.
 */
export class MemberService {
  async getMember(userId: string): Promise<Member | null> {
    const uid = userId || DEMO_USER_ID;
    const raw = typeof window !== 'undefined' ? localStorage.getItem(`vita_member_${uid}`) : null;
    if (raw) {
      try {
        const o = JSON.parse(raw);
        return {
          ...o,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
        };
      } catch {
        return null;
      }
    }
    return {
      id: uid,
      userId: uid,
      availableRoles: [R.FARMER, R.INVESTOR, R.CONSUMER],
      activeRole: R.FARMER,
      fullName: 'Nguyễn Văn Minh',
      email: 'minh@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async setActiveRole(userId: string, role: Role): Promise<void> {
    const m = await this.getMember(userId);
    if (!m) return;
    const updated: Member = {
      ...m,
      activeRole: role,
      updatedAt: new Date(),
    };
    localStorage.setItem(`vita_member_${userId}`, JSON.stringify(updated));
  }
}
