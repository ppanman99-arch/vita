# CẬP NHẬT CẦN THIẾT CHO CÁC PHASE

> **Ngày tạo:** 26/01/2026  
> **Mục đích:** Tổng hợp các thay đổi cần thiết cho các phase dựa trên phân tích dependencies và architecture review

---

## 🔴 PHASE 01: CẦN BỔ SUNG

### Vấn đề phát hiện:
1. **GreenPointsService** được Phase 03 expect nhưng chưa được tạo trong Phase 01
2. **DatabaseAdapter** được Phase 04 expect nhưng chưa được tạo trong Phase 01
3. Cả 2 đều là shared services, nên tạo sớm trong Phase 01

### Thay đổi cần thiết:

#### 1. Bổ sung GreenPointsService vào Phase 01

**Thêm vào section 1.1 (Core Directory Structure):**
```diff
src/core/
├── domain/
│   ├── user/
│   │   ├── User.ts
│   │   ├── Role.ts
│   │   └── Permission.ts
+│   └── greenPoints/
+│       └── GreenPoints.ts
├── application/
│   ├── auth/
│   │   └── AuthService.ts
+│   └── shared/
+│       └── GreenPointsService.ts
└── infrastructure/
    ├── ports/
    │   ├── IAuthPort.ts
+│   └── IGreenPointsPort.ts
    └── adapters/
        ├── auth/
        │   └── SupabaseAuthAdapter.ts
+        └── greenPoints/
+            └── SupabaseGreenPointsAdapter.ts
```

**Thêm section mới sau section 5 (APPLICATION SERVICE):**

```markdown
## 6. GREEN POINTS SERVICE (SHARED)

### 6.1 GreenPoints Domain Entity (`src/core/domain/greenPoints/GreenPoints.ts`)
```typescript
export interface GreenPoints {
  id: string;
  userId: string;
  points: number;
  activity: string;
  category: string;
  portal: string;
  platformSource?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export enum ActivityType {
  PURCHASE = 'Purchase',
  INVESTMENT = 'Investment',
  REFERRAL = 'Referral',
  // ... other activities
}

export enum Category {
  PURCHASE = 'purchase',
  INVESTMENT = 'investment',
  REFERRAL = 'referral',
  // ... other categories
}

export enum Portal {
  CONSUMER = 'consumer',
  INVESTOR = 'investor',
  NGUYENMANHTHUAN = 'nguyenmanhthuan',
  // ... other portals
}
```

### 6.2 IGreenPointsPort (`src/core/infrastructure/ports/IGreenPointsPort.ts`)
```typescript
import { GreenPoints } from '../../domain/greenPoints/GreenPoints';

export interface EarnPointsParams {
  userId: string;
  userType: string;
  points: number;
  activity: string;
  category: string;
  portal: string;
  platformSource?: string;
  metadata?: Record<string, any>;
}

export interface IGreenPointsPort {
  earnPoints(params: EarnPointsParams): Promise<GreenPoints>;
  getUserGreenPoints(userId: string): Promise<number>;
  getGreenPointsHistory(userId: string, limit?: number): Promise<GreenPoints[]>;
}
```

### 6.3 SupabaseGreenPointsAdapter (`src/core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter.ts`)
```typescript
import { IGreenPointsPort, EarnPointsParams } from '../../ports/IGreenPointsPort';
import { GreenPoints } from '../../../domain/greenPoints/GreenPoints';
import { supabase } from '../../../../lib/supabase'; // Temporary

export class SupabaseGreenPointsAdapter implements IGreenPointsPort {
  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    // Implementation using Supabase
    // Migrate logic from src/lib/greenPoints/service.ts
  }

  async getUserGreenPoints(userId: string): Promise<number> {
    // Implementation
  }

  async getGreenPointsHistory(userId: string, limit?: number): Promise<GreenPoints[]> {
    // Implementation
  }
}
```

### 6.4 GreenPointsService (`src/core/application/shared/GreenPointsService.ts`)
```typescript
import { IGreenPointsPort, EarnPointsParams } from '../../infrastructure/ports/IGreenPointsPort';
import { GreenPoints } from '../../domain/greenPoints/GreenPoints';

export class GreenPointsService {
  constructor(private greenPointsPort: IGreenPointsPort) {}

  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    // Business logic: validate, calculate, etc.
    return this.greenPointsPort.earnPoints(params);
  }

  async getUserGreenPoints(userId: string): Promise<number> {
    return this.greenPointsPort.getUserGreenPoints(userId);
  }

  async getGreenPointsHistory(userId: string, limit?: number): Promise<GreenPoints[]> {
    return this.greenPointsPort.getGreenPointsHistory(userId, limit);
  }
}
```

**Action Items:**
- [ ] Create GreenPoints domain entity
- [ ] Create IGreenPointsPort interface
- [ ] Create SupabaseGreenPointsAdapter
- [ ] Create GreenPointsService
- [ ] Migrate logic from `src/lib/greenPoints/service.ts`
```

---

#### 2. Bổ sung DatabaseAdapter vào Phase 01

**Thêm vào section 1.1 (Core Directory Structure):**
```diff
src/core/
└── infrastructure/
    ├── ports/
    │   ├── IAuthPort.ts
+│   └── IDatabasePort.ts
    └── adapters/
        ├── auth/
        │   └── SupabaseAuthAdapter.ts
+        └── database/
+            └── SupabaseDatabaseAdapter.ts
```

**Thêm section mới sau section 6 (GREEN POINTS SERVICE):**

```markdown
## 7. DATABASE ADAPTER (SHARED)

### 7.1 IDatabasePort (`src/core/infrastructure/ports/IDatabasePort.ts`)
```typescript
export interface QueryOptions {
  table: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  offset?: number;
}

export interface IDatabasePort {
  create<T>(table: string, data: Partial<T>): Promise<T>;
  read<T>(table: string, id: string): Promise<T | null>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<T>;
  delete(table: string, id: string): Promise<void>;
  query<T>(options: QueryOptions): Promise<T[]>;
}
```

### 7.2 SupabaseDatabaseAdapter (`src/core/infrastructure/adapters/database/SupabaseDatabaseAdapter.ts`)
```typescript
import { IDatabasePort, QueryOptions } from '../../ports/IDatabasePort';
import { supabase } from '../../../../lib/supabase'; // Temporary

export class SupabaseDatabaseAdapter implements IDatabasePort {
  async create<T>(table: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async read<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data as T;
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async query<T>(options: QueryOptions): Promise<T[]> {
    let query = supabase.from(options.table).select('*');
    
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit ?? 10) - 1);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  }
}
```

**Action Items:**
- [ ] Create IDatabasePort interface
- [ ] Create SupabaseDatabaseAdapter
- [ ] Add unit tests
```

---

#### 3. Cập nhật Section 11 (DEPENDENCIES & NOTES)

```diff
## 11. DEPENDENCIES & NOTES

### Dependencies
- Existing: `@supabase/supabase-js` (already in package.json)
- New: `vitest`, `@vitest/ui` (for testing)

### Notes
- Supabase client import is temporary (`../../lib/supabase`). Will be refactored in later phases.
- Role loading from database is TODO - will be implemented when we have user roles table.
- This phase focuses on proving the architecture works, not full feature completeness.
+### Shared Services Created
+- ✅ AuthService (used by all modules)
+- ✅ GreenPointsService (used by nguyenmanhthuan, member, esg-individual)
+- ✅ DatabaseAdapter (used by cooperative, esg-enterprise)
```

---

## 🟡 PHASE 03: CẦN CẬP NHẬT

### Vấn đề phát hiện:
- Phase 03 expects GreenPointsService từ Phase 01, nhưng Phase 01 chưa có
- Sau khi bổ sung vào Phase 01, Phase 03 chỉ cần sử dụng, không cần tạo

### Thay đổi cần thiết:

**Cập nhật section 2.1 (Update earnPoints Calls):**

```diff
### 2.1 Update earnPoints Calls
Tìm tất cả các nơi gọi `earnPoints` trong nguyenmanhthuan module:

**BEFORE (Old code):**
```typescript
import { earnPoints } from '../../lib/greenPoints/service';

await earnPoints(
  userId,
  'Purchase',
  100,
  'purchase',
  'consumer-portal'
);
```

**AFTER (New code):**
```typescript
-import { GreenPointsService } from '@core/application/shared/GreenPointsService';
+import { GreenPointsService } from '@core/application/shared/GreenPointsService';
+import { SupabaseGreenPointsAdapter } from '@core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter';
+import { ActivityType, Category, Portal } from '@core/domain/greenPoints/GreenPoints';

-const greenPointsService = new GreenPointsService();
+const greenPointsService = new GreenPointsService(new SupabaseGreenPointsAdapter());

await greenPointsService.earnPoints(
  userId,
-  'consumer',  // userType
+  'consumer',   // userType
  100,          // points
-  'Purchase',  // activity
-  'purchase',  // category
+  ActivityType.PURCHASE,  // activity
+  Category.PURCHASE,      // category
-  'nguyenmanhthuan', // portal
+  Portal.NGUYENMANHTHUAN, // portal
  undefined,    // metadata (optional)
  'nguyenmanhthuan'  // platformSource
);
```

**Cập nhật section 7 (DEPENDENCIES & NOTES):**

```diff
### Dependencies
- Phase 01: Core Foundation (AuthService, GreenPointsService)
+ Phase 01: Core Foundation (AuthService, GreenPointsService) ✅
- Phase 02: nguyenmanhthuan basic display
+ Phase 02: nguyenmanhthuan basic display ✅

### Notes
- Green Points calculation rules cần được định nghĩa rõ (ví dụ: 1% giá trị đơn hàng)
+- GreenPointsService đã được tạo trong Phase 01, chỉ cần sử dụng ở đây
- Payment gateway integration sẽ được làm ở phase sau (nếu cần)
```

---

## 🟡 PHASE 04: CẦN CẬP NHẬT

### Vấn đề phát hiện:
- Phase 04 expects DatabaseAdapter từ Phase 01, nhưng Phase 01 chưa có
- Sau khi bổ sung vào Phase 01, Phase 04 chỉ cần sử dụng, không cần tạo

### Thay đổi cần thiết:

**Cập nhật section 4.1 (CooperativeService):**

```diff
### 4.1 CooperativeService (`src/modules/cooperative/application/CooperativeService.ts`)
```typescript
import { Cooperative } from '../domain/Cooperative';
-import { DatabaseAdapter } from '@core/infrastructure/adapters/database/DatabaseAdapter';
+import { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
+import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';

export class CooperativeService {
-  constructor(private dbAdapter: DatabaseAdapter) {}
+  constructor(private dbAdapter: IDatabasePort = new SupabaseDatabaseAdapter()) {}

  async registerCooperative(data: Partial<Cooperative>): Promise<Cooperative> {
-    // Validate data
-    // Save to database
-    // Return created cooperative
+    // Validate data
+    return this.dbAdapter.create<Cooperative>('cooperatives', data);
  }

  async getCooperativeById(id: string): Promise<Cooperative | null> {
-    // Query from database
+    return this.dbAdapter.read<Cooperative>('cooperatives', id);
  }

  async updateCooperative(id: string, data: Partial<Cooperative>): Promise<Cooperative> {
-    // Update in database
+    return this.dbAdapter.update<Cooperative>('cooperatives', id, data);
  }
}
```

**Cập nhật section 10 (DEPENDENCIES & NOTES):**

```diff
### Dependencies
- Phase 01: Core Foundation (AuthService, DatabaseAdapter)
+ Phase 01: Core Foundation (AuthService, DatabaseAdapter) ✅

### Notes
- This phase focuses on access only (register/login)
- Dashboard và member management sẽ ở phase 05-06
- Status workflow: pending → approved → active
+- DatabaseAdapter đã được tạo trong Phase 01, chỉ cần sử dụng ở đây
```

---

## 🟡 PHASE 07: CẦN BỔ SUNG CHI TIẾT

### Vấn đề phát hiện:
- ContextManager được đề cập nhưng chưa có design chi tiết
- Chưa rõ cách xử lý multi-context (user vừa là Customer vừa là Investor)

### Thay đổi cần thiết:

**Thêm section mới trước section 4 (REFACTOR ROLE SWITCHER):**

```markdown
## 3. CONTEXT MANAGER DESIGN

### 3.1 UserContext Domain Entity
Đã có trong Phase 01 (`src/core/domain/context/UserContext.ts`), nhưng cần bổ sung:

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
      return JSON.parse(cached);
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
    // This should be implemented based on your permission system
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
    // Get current user ID from AuthService
    const authService = new AuthService(new SupabaseAuthAdapter());
    const user = await authService.getCurrentUser();
    
    if (user) {
      const context = await contextManager.getCurrentContext(user.id);
      setCurrentContext(context);
    }
    setLoading(false);
  };

  const switchContext = async (newRole: Role) => {
    if (!currentContext) return;
    
    const newContext = await contextManager.switchContext(currentContext.userId, newRole);
    setCurrentContext(newContext);
    
    // Optionally reload page or update UI
    window.location.reload(); // Or use router to navigate
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
- [ ] Create IContextPort interface
- [ ] Create ContextAdapter
- [ ] Create ContextManager service
- [ ] Create useContextManager hook
- [ ] Create user_contexts table in database
```

**Cập nhật section 7 (DEPENDENCIES & NOTES):**

```diff
### Dependencies
- Phase 01: Core Foundation (ContextManager)
+ Phase 01: Core Foundation (AuthService, DatabaseAdapter) ✅
+ Phase 01: ContextManager (created in this phase)

### Notes
- Role switching phải mượt, không reload page
- Menu phải thay đổi theo role đang active
+- Context được lưu trong localStorage (cache) và database (persistence)
+- Multi-role users có thể switch giữa các roles
```

---

## 📋 TỔNG KẾT CÁC THAY ĐỔI

### Phase 01 (Bổ sung):
1. ✅ Thêm GreenPointsService (domain, port, adapter, service)
2. ✅ Thêm DatabaseAdapter (port, adapter)
3. ✅ Cập nhật dependencies & notes

### Phase 03 (Cập nhật):
1. ✅ Sửa import để sử dụng GreenPointsService từ Phase 01
2. ✅ Sử dụng constants (ActivityType, Category, Portal)
3. ✅ Cập nhật dependencies

### Phase 04 (Cập nhật):
1. ✅ Sửa CooperativeService để sử dụng IDatabasePort
2. ✅ Implement các methods sử dụng DatabaseAdapter
3. ✅ Cập nhật dependencies

### Phase 07 (Bổ sung):
1. ✅ Thêm design chi tiết cho ContextManager
2. ✅ Thêm IContextPort, ContextAdapter
3. ✅ Thêm React hook useContextManager
4. ✅ Cập nhật dependencies

---

## ✅ VERIFICATION CHECKLIST

Sau khi cập nhật các phase:
- [ ] Phase 01 có đầy đủ GreenPointsService và DatabaseAdapter
- [ ] Phase 03 sử dụng GreenPointsService từ Phase 01
- [ ] Phase 04 sử dụng DatabaseAdapter từ Phase 01
- [ ] Phase 07 có design chi tiết cho ContextManager
- [ ] Tất cả dependencies được đánh dấu ✅
- [ ] Không có circular dependencies
