# PHASE 01: NỀN TẢNG & KHỞI ĐỘNG (CORE FOUNDATION) - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Thiết lập "bộ khung" kiến trúc mới (Core/Domain/Infrastructure) và chứng minh nó hoạt động bằng cách chuyển đổi (migrate) một tính năng quan trọng nhất: **Đăng nhập (Login)**.

---

## 1. TẠO CẤU TRÚC THƯ MỤC

### 1.1 Core Directory Structure
```
src/core/
├── domain/
│   ├── user/
│   │   ├── User.ts
│   │   ├── Role.ts
│   │   └── Permission.ts
│   ├── context/
│   │   └── UserContext.ts
│   └── greenPoints/
│       └── GreenPoints.ts
├── application/
│   ├── auth/
│   │   └── AuthService.ts
│   └── shared/
│       └── GreenPointsService.ts
└── infrastructure/
    ├── ports/
    │   ├── IAuthPort.ts
    │   ├── IGreenPointsPort.ts
    │   └── IDatabasePort.ts
    └── adapters/
        ├── auth/
        │   └── SupabaseAuthAdapter.ts
        ├── greenPoints/
        │   └── SupabaseGreenPointsAdapter.ts
        └── database/
            └── SupabaseDatabaseAdapter.ts
```

### 1.2 Modules Directory (Placeholder)
```
src/modules/
├── nguyenmanhthuan/ (sẽ tạo ở phase 02)
├── cooperative/ (sẽ tạo ở phase 04)
├── member/ (sẽ tạo ở phase 07)
├── esg-enterprise/ (sẽ tạo ở phase 10)
└── esg-individual/ (sẽ tạo ở phase 12)
```

**Action Items:**
- [ ] Tạo tất cả thư mục trên
- [ ] Tạo file `.gitkeep` trong các thư mục rỗng để git track

---

## 2. DOMAIN ENTITIES

### 2.1 User Entity (`src/core/domain/user/User.ts`)
```typescript
export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Role Enum (`src/core/domain/user/Role.ts`)
```typescript
export enum Role {
  FARMER = 'farmer',
  INVESTOR = 'investor',
  ADMIN = 'admin',
  CONSUMER = 'consumer',
  COOPERATIVE = 'cooperative',
  ENTERPRISE = 'enterprise',
  // ... các roles khác
}

export interface RoleMetadata {
  id: Role;
  name: string;
  displayName: string;
  permissions: Permission[];
}
```

### 2.3 Permission Enum (`src/core/domain/user/Permission.ts`)
```typescript
export enum Permission {
  // Farmer permissions
  FARMER_VIEW_DASHBOARD = 'farmer:view:dashboard',
  FARMER_CREATE_DIARY = 'farmer:create:diary',
  
  // Investor permissions
  INVESTOR_VIEW_PORTFOLIO = 'investor:view:portfolio',
  
  // Admin permissions
  ADMIN_MANAGE_MEMBERS = 'admin:manage:members',
  
  // ... các permissions khác
}
```

### 2.4 UserContext Entity (`src/core/domain/context/UserContext.ts`)
```typescript
export interface UserContext {
  userId: string;
  activeRole: Role;
  availableRoles: Role[];
  permissions: Permission[];
  moduleAccess: string[];
}
```

**Action Items:**
- [ ] Tạo file `User.ts` với interface User
- [ ] Tạo file `Role.ts` với enum và interface RoleMetadata
- [ ] Tạo file `Permission.ts` với enum Permission (liệt kê đầy đủ)
- [ ] Tạo file `UserContext.ts` với interface UserContext

### 2.5 GreenPoints Domain Entity (`src/core/domain/greenPoints/GreenPoints.ts`)
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
  CONTRIBUTION = 'Contribution',
  // ... other activities
}

export enum Category {
  PURCHASE = 'purchase',
  INVESTMENT = 'investment',
  REFERRAL = 'referral',
  CONTRIBUTION = 'contribution',
  // ... other categories
}

export enum Portal {
  CONSUMER = 'consumer',
  INVESTOR = 'investor',
  NGUYENMANHTHUAN = 'nguyenmanhthuan',
  MEMBER = 'member',
  ESG_INDIVIDUAL = 'esg-individual',
  // ... other portals
}
```

**Action Items:**
- [ ] Tạo file `GreenPoints.ts` với interface và enums
- [ ] Export tất cả types và enums

---

## 3. PORT INTERFACES (HEXAGONAL ARCHITECTURE)

### 3.1 IAuthPort (`src/core/infrastructure/ports/IAuthPort.ts`)
```typescript
import { User } from '../../domain/user/User';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User | null;
  session: any; // Supabase session type
  error?: string;
}

export interface IAuthPort {
  signIn(credentials: SignInCredentials): Promise<AuthResult>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getCurrentSession(): Promise<any | null>;
}
```

**Action Items:**
- [ ] Tạo file `IAuthPort.ts`
- [ ] Định nghĩa đầy đủ các methods cần thiết

### 3.2 IGreenPointsPort (`src/core/infrastructure/ports/IGreenPointsPort.ts`)
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

**Action Items:**
- [ ] Tạo file `IGreenPointsPort.ts`
- [ ] Định nghĩa đầy đủ các methods cần thiết

### 3.3 IDatabasePort (`src/core/infrastructure/ports/IDatabasePort.ts`)
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

**Action Items:**
- [ ] Tạo file `IDatabasePort.ts`
- [ ] Định nghĩa đầy đủ các methods cần thiết

---

## 4. ADAPTERS

### 4.1 SupabaseAuthAdapter (`src/core/infrastructure/adapters/auth/SupabaseAuthAdapter.ts`)
```typescript
import { IAuthPort, SignInCredentials, AuthResult } from '../../ports/IAuthPort';
import { User } from '../../../domain/user/User';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

export class SupabaseAuthAdapter implements IAuthPort {
  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name,
        avatarUrl: data.user.user_metadata?.avatar_url,
        roles: [], // TODO: Load from database
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(data.user.updated_at || data.user.created_at),
      };

      return { user, session: data.session };
    } catch (error) {
      return { user: null, session: null, error: 'Unexpected error occurred' };
    }
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name,
      avatarUrl: user.user_metadata?.avatar_url,
      roles: [], // TODO: Load from database
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at || user.created_at),
    };
  }

  async getCurrentSession(): Promise<any | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
}
```

**Action Items:**
- [ ] Tạo file `SupabaseAuthAdapter.ts`
- [ ] Implement đầy đủ các methods từ IAuthPort
- [ ] Handle error cases properly

### 4.2 SupabaseGreenPointsAdapter (`src/core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter.ts`)
```typescript
import { IGreenPointsPort, EarnPointsParams } from '../../ports/IGreenPointsPort';
import { GreenPoints } from '../../../domain/greenPoints/GreenPoints';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

export class SupabaseGreenPointsAdapter implements IGreenPointsPort {
  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .insert({
          user_id: params.userId,
          points: params.points,
          activity: params.activity,
          category: params.category,
          portal: params.portal,
          platform_source: params.platformSource,
          metadata: params.metadata,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        userId: data.user_id,
        points: data.points,
        activity: data.activity,
        category: data.category,
        portal: data.portal,
        platformSource: data.platform_source,
        metadata: data.metadata,
        createdAt: new Date(data.created_at),
      };
    } catch (error) {
      throw new Error(`Failed to earn points: ${error}`);
    }
  }

  async getUserGreenPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .select('points')
        .eq('user_id', userId);

      if (error) throw error;

      return data.reduce((sum, record) => sum + record.points, 0);
    } catch (error) {
      throw new Error(`Failed to get user green points: ${error}`);
    }
  }

  async getGreenPointsHistory(userId: string, limit: number = 50): Promise<GreenPoints[]> {
    try {
      const { data, error } = await supabase
        .from('green_points')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data.map((record) => ({
        id: record.id,
        userId: record.user_id,
        points: record.points,
        activity: record.activity,
        category: record.category,
        portal: record.portal,
        platformSource: record.platform_source,
        metadata: record.metadata,
        createdAt: new Date(record.created_at),
      }));
    } catch (error) {
      throw new Error(`Failed to get green points history: ${error}`);
    }
  }
}
```

**Action Items:**
- [ ] Tạo file `SupabaseGreenPointsAdapter.ts`
- [ ] Migrate logic từ `src/lib/greenPoints/service.ts`
- [ ] Implement đầy đủ các methods từ IGreenPointsPort
- [ ] Handle error cases properly

### 4.3 SupabaseDatabaseAdapter (`src/core/infrastructure/adapters/database/SupabaseDatabaseAdapter.ts`)
```typescript
import { IDatabasePort, QueryOptions } from '../../ports/IDatabasePort';
import { supabase } from '../../../../lib/supabase'; // Temporary, sẽ refactor sau

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
- [ ] Tạo file `SupabaseDatabaseAdapter.ts`
- [ ] Implement đầy đủ các methods từ IDatabasePort
- [ ] Handle error cases properly

---

## 5. APPLICATION SERVICE

### 5.1 AuthService (`src/core/application/auth/AuthService.ts`)
```typescript
import { IAuthPort, SignInCredentials, AuthResult } from '../../infrastructure/ports/IAuthPort';
import { User } from '../../domain/user/User';

export class AuthService {
  constructor(private authPort: IAuthPort) {}

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    // Business logic: validate, transform, etc.
    return this.authPort.signIn(credentials);
  }

  async signOut(): Promise<void> {
    return this.authPort.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authPort.getCurrentUser();
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
}
```

**Action Items:**
- [ ] Tạo file `AuthService.ts`
- [ ] Inject IAuthPort qua constructor (Dependency Injection)
- [ ] Implement business logic methods

### 5.2 GreenPointsService (`src/core/application/shared/GreenPointsService.ts`)
```typescript
import { IGreenPointsPort, EarnPointsParams } from '../../infrastructure/ports/IGreenPointsPort';
import { GreenPoints } from '../../domain/greenPoints/GreenPoints';

export class GreenPointsService {
  constructor(private greenPointsPort: IGreenPointsPort) {}

  async earnPoints(params: EarnPointsParams): Promise<GreenPoints> {
    // Business logic: validate, calculate, etc.
    // Example: Validate points are positive
    if (params.points <= 0) {
      throw new Error('Points must be positive');
    }
    
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
- [ ] Tạo file `GreenPointsService.ts`
- [ ] Inject IGreenPointsPort qua constructor (Dependency Injection)
- [ ] Implement business logic methods
- [ ] Add validation logic

---

## 6. MIGRATE LOGIN PAGE

### 6.1 Read Current Login Page
- [ ] Đọc file `src/pages/login/page.tsx` hiện tại
- [ ] Xác định các Supabase calls cần thay thế

### 6.2 Refactor Login Page
```typescript
// BEFORE (Old code)
import { supabase } from '../../lib/supabase';

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // ...
};

// AFTER (New code)
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';

const authService = new AuthService(new SupabaseAuthAdapter());

const handleLogin = async () => {
  const result = await authService.signIn({ email, password });
  if (result.error) {
    // Show error
  } else {
    // Navigate to dashboard
  }
};
```

**Action Items:**
- [ ] Update imports trong `src/pages/login/page.tsx`
- [ ] Replace direct Supabase calls với AuthService
- [ ] Test login flow vẫn hoạt động

---

## 7. TYPESCRIPT PATH ALIASES

### 7.1 Update `tsconfig.app.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "@modules/*": ["./src/modules/*"]
    }
  }
}
```

### 7.2 Update `vite.config.ts`
```typescript
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@core": resolve(__dirname, "./src/core"),
      "@modules": resolve(__dirname, "./src/modules"),
    },
  },
});
```

**Action Items:**
- [ ] Update `tsconfig.app.json` với path aliases
- [ ] Update `vite.config.ts` với path aliases
- [ ] Verify build succeeds: `npm run build`

---

## 8. TESTING SETUP

### 8.1 Install Vitest (if not already installed)
```bash
npm install -D vitest @vitest/ui
```

### 8.2 Create `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
});
```

### 8.3 Create Test Structure
```
tests/
├── unit/
│   └── core/
│       ├── domain/
│       ├── application/
│       └── infrastructure/
```

**Action Items:**
- [ ] Install Vitest dependencies
- [ ] Create `vitest.config.ts`
- [ ] Create test directory structure
- [ ] Add test script to `package.json`: `"test": "vitest"`

---

## 9. UNIT TESTS

### 9.1 Test AuthService
```typescript
// tests/unit/core/application/auth/AuthService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '@core/application/auth/AuthService';
import { IAuthPort } from '@core/infrastructure/ports/IAuthPort';

describe('AuthService', () => {
  it('should sign in successfully', async () => {
    const mockAuthPort: IAuthPort = {
      signIn: vi.fn().mockResolvedValue({
        user: { id: '1', email: 'test@example.com' },
        session: {},
      }),
      signOut: vi.fn(),
      getCurrentUser: vi.fn(),
      getCurrentSession: vi.fn(),
    };

    const authService = new AuthService(mockAuthPort);
    const result = await authService.signIn({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result.user).toBeDefined();
    expect(mockAuthPort.signIn).toHaveBeenCalled();
  });
});
```

**Action Items:**
- [ ] Write unit test cho AuthService
- [ ] Write integration test cho SupabaseAuthAdapter (mock Supabase client)
- [ ] Run tests: `npm test`

---

## 10. VERIFICATION CHECKLIST

- [ ] All directories created
- [ ] All domain entities created (User, Role, Permission, UserContext, GreenPoints)
- [ ] IAuthPort interface created
- [ ] IGreenPointsPort interface created
- [ ] IDatabasePort interface created
- [ ] SupabaseAuthAdapter implemented
- [ ] SupabaseGreenPointsAdapter implemented
- [ ] SupabaseDatabaseAdapter implemented
- [ ] AuthService implemented
- [ ] GreenPointsService implemented
- [ ] Login page refactored
- [ ] TypeScript path aliases configured
- [ ] Build succeeds: `npm run build`
- [ ] Tests pass: `npm test`
- [ ] Login flow works in browser

---

## 11. DEPENDENCIES & NOTES

### Dependencies
- Existing: `@supabase/supabase-js` (already in package.json)
- New: `vitest`, `@vitest/ui` (for testing)

### Shared Services Created
- ✅ **AuthService** - Used by all modules (nguyenmanhthuan, cooperative, member, esg-enterprise, esg-individual)
- ✅ **GreenPointsService** - Used by nguyenmanhthuan (Phase 03), member (Phase 07-09), esg-individual (Phase 12)
- ✅ **DatabaseAdapter** - Used by cooperative (Phase 04-06), esg-enterprise (Phase 10-11)

### Notes
- Supabase client import is temporary (`../../lib/supabase`). Will be refactored in later phases.
- Role loading from database is TODO - will be implemented when we have user roles table.
- GreenPointsService migrates logic from `src/lib/greenPoints/service.ts`
- DatabaseAdapter provides generic CRUD operations for all modules
- This phase focuses on proving the architecture works, not full feature completeness.
