# PHASE 07: CỔNG XÃ VIÊN (MEMBER) - HUB & ROLE SWITCHER - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Tạo ra một "Cổng thông tin chung" (Member Hub) cho người dùng cá nhân. Điểm đặc biệt là một người có thể đóng nhiều vai (Nông dân, Nhà đầu tư, Người tiêu dùng) và cần chuyển đổi qua lại dễ dàng.

---

## 1. TẠO MODULE STRUCTURE

```
src/modules/member/
├── domain/
│   ├── Member.ts
│   └── MemberRole.ts
├── application/
│   └── MemberService.ts
├── presentation/
│   ├── pages/
│   │   ├── MemberHubPage.tsx
│   │   └── MemberNotificationsPage.tsx
│   └── components/
│       └── RoleSwitcher.tsx
└── infrastructure/
    └── MemberModuleRouter.tsx
```

**Action Items:**
- [ ] Create module structure
- [ ] Create subdirectories

---

## 2. MIGRATE EXISTING PAGES

### 2.1 Migrate Member Hub
- [ ] Read `src/pages/member-hub/page.tsx`
- [ ] Copy to `MemberHubPage.tsx`
- [ ] Update imports

### 2.2 Migrate Notifications
- [ ] Read `src/pages/member-hub/notifications/page.tsx`
- [ ] Copy to `MemberNotificationsPage.tsx`

### 2.3 Migrate RoleSwitcher
- [ ] Read `src/components/feature/RoleSwitcher.tsx`
- [ ] Copy to `presentation/components/RoleSwitcher.tsx`
- [ ] Refactor để dùng ContextManager từ `@core`

**Action Items:**
- [ ] Migrate all pages
- [ ] Update imports
- [ ] Refactor RoleSwitcher

---

## 3. CREATE DOMAIN ENTITIES

### 3.1 Member Entity
```typescript
export interface Member {
  id: string;
  userId: string;
  availableRoles: Role[];
  activeRole: Role;
  // ... other fields
}
```

### 3.2 MemberRole Entity
```typescript
export interface MemberRole {
  role: Role;
  status: 'active' | 'inactive';
  metadata: {
    producer?: { activeFarms: number };
    investor?: { totalInvested: number };
    consumer?: { greenPoints: number };
  };
}
```

**Action Items:**
- [ ] Create Member entity
- [ ] Create MemberRole entity

---

## 3. CONTEXT MANAGER DESIGN

### 3.1 Update UserContext Domain Entity
Bổ sung vào `src/core/domain/context/UserContext.ts` (đã tạo trong Phase 01):

```typescript
export interface UserContext {
  userId: string;
  activeRole: Role;
  availableRoles: Role[];
  permissions: Permission[];
  moduleAccess: string[];
  contextData?: Record<string, any>; // Additional context-specific data
  lastSwitchedAt?: Date;
}
```

### 3.2 IContextPort (`src/core/infrastructure/ports/IContextPort.ts`)
```typescript
import { UserContext } from '../../domain/context/UserContext';
import { Role } from '../../domain/user/Role';

export interface IContextPort {
  getCurrentContext(userId: string): Promise<UserContext | null>;
  switchContext(userId: string, newRole: Role): Promise<UserContext>;
  getAvailableRoles(userId: string): Promise<Role[]>;
  saveContext(context: UserContext): Promise<void>;
}
```

### 3.3 ContextAdapter (`src/core/infrastructure/adapters/context/ContextAdapter.ts`)
```typescript
import { IContextPort } from '../../ports/IContextPort';
import { UserContext } from '../../../domain/context/UserContext';
import { Role } from '../../../domain/user/Role';
import { Permission } from '../../../domain/user/Permission';
import { IDatabasePort } from '../database/IDatabasePort';
import { AuthService } from '../../../application/auth/AuthService';

export class ContextAdapter implements IContextPort {
  constructor(
    private dbAdapter: IDatabasePort,
    private authService: AuthService
  ) {}

  async getCurrentContext(userId: string): Promise<UserContext | null> {
    // Get from localStorage first (for performance)
    const cached = localStorage.getItem(`context_${userId}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Invalid cache, continue to database
      }
    }

    // Get from database
    const context = await this.dbAdapter.read<UserContext>('user_contexts', userId);
    
    // Cache in localStorage
    if (context) {
      localStorage.setItem(`context_${userId}`, JSON.stringify(context));
    }
    
    return context;
  }

  async switchContext(userId: string, newRole: Role): Promise<UserContext> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    // Verify user has this role
    if (!user.roles.includes(newRole)) {
      throw new Error(`User does not have role: ${newRole}`);
    }

    // Get permissions for new role
    const permissions = await this.getPermissionsForRole(newRole);

    const newContext: UserContext = {
      userId,
      activeRole: newRole,
      availableRoles: user.roles,
      permissions,
      moduleAccess: this.getModuleAccessForRole(newRole),
      lastSwitchedAt: new Date(),
    };

    // Save to database
    await this.saveContext(newContext);

    // Update localStorage
    localStorage.setItem(`context_${userId}`, JSON.stringify(newContext));

    return newContext;
  }

  async getAvailableRoles(userId: string): Promise<Role[]> {
    const user = await this.authService.getCurrentUser();
    return user?.roles || [];
  }

  async saveContext(context: UserContext): Promise<void> {
    await this.dbAdapter.update('user_contexts', context.userId, context);
  }

  private async getPermissionsForRole(role: Role): Promise<Permission[]> {
    // Load from database or configuration
    // This should query from a roles_permissions table or configuration
    const rolePermissionsMap: Record<Role, Permission[]> = {
      [Role.FARMER]: [Permission.FARMER_VIEW_DASHBOARD, Permission.FARMER_CREATE_DIARY],
      [Role.INVESTOR]: [Permission.INVESTOR_VIEW_PORTFOLIO],
      [Role.CONSUMER]: [],
      [Role.COOPERATIVE]: [Permission.ADMIN_MANAGE_MEMBERS],
      [Role.ENTERPRISE]: [],
      // ... other roles
    };
    return rolePermissionsMap[role] || [];
  }

  private getModuleAccessForRole(role: Role): string[] {
    // Map role to accessible modules
    const roleModuleMap: Record<Role, string[]> = {
      [Role.FARMER]: ['farmer', 'member'],
      [Role.INVESTOR]: ['investor', 'member'],
      [Role.CONSUMER]: ['consumer', 'member', 'nguyenmanhthuan'],
      [Role.COOPERATIVE]: ['cooperative'],
      [Role.ENTERPRISE]: ['esg-enterprise'],
      // ... other roles
    };
    return roleModuleMap[role] || [];
  }
}
```

### 3.4 ContextManager Service (`src/core/application/context/ContextManager.ts`)
```typescript
import { IContextPort } from '../../infrastructure/ports/IContextPort';
import { UserContext } from '../../domain/context/UserContext';
import { Role } from '../../domain/user/Role';
import { Permission } from '../../domain/user/Permission';

export class ContextManager {
  constructor(private contextPort: IContextPort) {}

  async getCurrentContext(userId: string): Promise<UserContext | null> {
    return this.contextPort.getCurrentContext(userId);
  }

  async switchContext(userId: string, newRole: Role): Promise<UserContext> {
    return this.contextPort.switchContext(userId, newRole);
  }

  async getAvailableRoles(userId: string): Promise<Role[]> {
    return this.contextPort.getAvailableRoles(userId);
  }

  hasPermission(context: UserContext, permission: Permission): boolean {
    return context.permissions.includes(permission);
  }

  canAccessModule(context: UserContext, module: string): boolean {
    return context.moduleAccess.includes(module);
  }
}
```

### 3.5 React Hook (`src/core/application/context/useContextManager.ts`)
```typescript
import { useState, useEffect } from 'react';
import { ContextManager } from './ContextManager';
import { ContextAdapter } from '../../infrastructure/adapters/context/ContextAdapter';
import { SupabaseDatabaseAdapter } from '../../infrastructure/adapters/database/SupabaseDatabaseAdapter';
import { AuthService } from '../auth/AuthService';
import { SupabaseAuthAdapter } from '../../infrastructure/adapters/auth/SupabaseAuthAdapter';
import { UserContext } from '../../domain/context/UserContext';
import { Role } from '../../domain/user/Role';
import { Permission } from '../../domain/user/Permission';

// Create singleton instance
const contextManager = new ContextManager(
  new ContextAdapter(
    new SupabaseDatabaseAdapter(),
    new AuthService(new SupabaseAuthAdapter())
  )
);

export function useContextManager() {
  const [currentContext, setCurrentContext] = useState<UserContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContext();
  }, []);

  const loadContext = async () => {
    try {
      // Get current user ID from AuthService
      const authService = new AuthService(new SupabaseAuthAdapter());
      const user = await authService.getCurrentUser();
      
      if (user) {
        const context = await contextManager.getCurrentContext(user.id);
        setCurrentContext(context);
      }
    } catch (error) {
      console.error('Failed to load context:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchContext = async (newRole: Role) => {
    if (!currentContext) return;
    
    try {
      const newContext = await contextManager.switchContext(currentContext.userId, newRole);
      setCurrentContext(newContext);
      
      // Optionally reload page or update UI
      // window.location.reload(); // Or use router to navigate
    } catch (error) {
      console.error('Failed to switch context:', error);
      throw error;
    }
  };

  return {
    currentContext,
    switchContext,
    loading,
    hasPermission: (permission: Permission) => 
      currentContext ? contextManager.hasPermission(currentContext, permission) : false,
    canAccessModule: (module: string) =>
      currentContext ? contextManager.canAccessModule(currentContext, module) : false,
  };
}
```

**Action Items:**
- [ ] Update UserContext domain entity với contextData và lastSwitchedAt
- [ ] Create IContextPort interface
- [ ] Create ContextAdapter
- [ ] Create ContextManager service
- [ ] Create useContextManager hook
- [ ] Create `user_contexts` table in database (if not exists)

---

## 4. REFACTOR ROLE SWITCHER

### 4.1 Integrate với ContextManager
```typescript
import { useContextManager } from '@core/application/context/useContextManager';

const { switchContext, currentContext } = useContextManager();

const handleRoleSwitch = async (newRole: Role) => {
  await switchContext(newRole);
  // Update UI
};
```

### 4.2 Role Switcher UI
- [ ] Dropdown hoặc tabs để chọn role
- [ ] Hiển thị role hiện tại
- [ ] Smooth transition khi switch

**Action Items:**
- [ ] Refactor RoleSwitcher component
- [ ] Integrate với ContextManager
- [ ] Test role switching

---

## 5. MEMBER HUB DASHBOARD

### 5.1 Overview Cards
- [ ] Hiển thị tổng quan cho mỗi role:
  - Producer: Số vụ mùa đang canh tác
  - Investor: Tổng đầu tư
  - Consumer: Green Points, Vouchers
  - Resource: Diện tích góp

### 5.2 Quick Actions
- [ ] Quick links cho mỗi role
- [ ] Recent activities feed

**Action Items:**
- [ ] Design dashboard layout
- [ ] Implement overview cards
- [ ] Add quick actions

---

## 6. VERIFICATION CHECKLIST

- [ ] MemberHub page displays
- [ ] RoleSwitcher works smoothly
- [ ] Context switching works
- [ ] Dashboard shows correct data per role
- [ ] Build succeeds

---

## 7. DEPENDENCIES & NOTES

### Dependencies
- ✅ Phase 01: Core Foundation (AuthService, DatabaseAdapter) - **Cần cho ContextManager**
- ✅ Phase 01: ContextManager (created in this phase)

### Notes
- Role switching phải mượt, không reload page
- Menu phải thay đổi theo role đang active
- Context được lưu trong localStorage (cache) và database (persistence)
- Multi-role users có thể switch giữa các roles
- ContextManager sử dụng AuthService để verify user roles
- ContextManager sử dụng DatabaseAdapter để persist context
