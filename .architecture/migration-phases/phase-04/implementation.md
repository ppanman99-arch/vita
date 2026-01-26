# PHASE 04: CỔNG HỢP TÁC XÃ (HTX) - TRUY CẬP & ĐỊNH DANH - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Chuyển đổi (Migrate) các trang Đăng ký và Đăng nhập dành riêng cho Hợp Tác Xã (HTX) sang module mới. Đảm bảo HTX có thể tạo tài khoản và đăng nhập vào hệ thống.

---

## 1. TẠO MODULE STRUCTURE

### 1.1 Create Directory Structure
```
src/modules/cooperative/
├── domain/
│   ├── Cooperative.ts
│   └── CooperativeMember.ts (optional for now)
├── application/
│   └── CooperativeService.ts
├── presentation/
│   ├── pages/
│   │   ├── CooperativeRegisterPage.tsx
│   │   ├── CooperativeLoginPage.tsx
│   │   ├── CooperativeRegisterAccountPage.tsx
│   │   └── CooperativeLandingPage.tsx
│   └── components/
│       └── BrandTopBar.tsx
└── infrastructure/
    └── CooperativeModuleRouter.tsx
```

**Action Items:**
- [ ] Tạo tất cả thư mục trên
- [ ] Tạo file `.gitkeep` trong các thư mục rỗng

---

## 2. DOMAIN ENTITIES

### 2.1 Cooperative Entity (`src/modules/cooperative/domain/Cooperative.ts`)
```typescript
export interface Cooperative {
  id: string;
  name: string;
  taxCode?: string;
  establishedYear?: number;
  memberCount?: number;
  totalForestArea?: number;
  location?: string;
  representative?: string;
  representativePosition?: string;
  phone?: string;
  email: string;
  currentActivities?: string;
  interests?: string[];
  additionalInfo?: string;
  logoUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  createdAt: Date;
  updatedAt: Date;
}
```

**Action Items:**
- [ ] Tạo file `Cooperative.ts` với interface trên
- [ ] Export interface

---

## 3. MIGRATE EXISTING PAGES

### 3.1 Migrate Cooperative Register Page
- [ ] Read `src/pages/cooperative-register/page.tsx`
- [ ] Copy to `src/modules/cooperative/presentation/pages/CooperativeRegisterPage.tsx`
- [ ] Update imports:
  - Remove relative imports to `../../lib/*`
  - Use `@core/*` for shared services if needed

### 3.2 Migrate HTX Brand Pages
- [ ] Read `src/pages/htx-brand/page.tsx` → `CooperativePortalPage.tsx`
- [ ] Read `src/pages/htx-brand/login/page.tsx` → `CooperativeLoginPage.tsx`
- [ ] Read `src/pages/htx-brand/register/page.tsx` → `CooperativeRegisterAccountPage.tsx`
- [ ] Read `src/pages/htx-landing/page.tsx` → `CooperativeLandingPage.tsx`

### 3.3 Migrate Components
- [ ] Copy `src/pages/htx-brand/components/BrandTopBar.tsx` → `presentation/components/`
- [ ] Copy `src/pages/htx-landing/components/*` → `presentation/components/`

**Action Items:**
- [ ] Migrate tất cả pages
- [ ] Update imports
- [ ] Fix TypeScript errors

---

## 4. CREATE COOPERATIVE SERVICE

### 4.1 CooperativeService (`src/modules/cooperative/application/CooperativeService.ts`)
```typescript
import { Cooperative } from '../domain/Cooperative';
import { IDatabasePort } from '@core/infrastructure/ports/IDatabasePort';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';

export class CooperativeService {
  constructor(private dbAdapter: IDatabasePort = new SupabaseDatabaseAdapter()) {}

  async registerCooperative(data: Partial<Cooperative>): Promise<Cooperative> {
    // Validate data
    if (!data.name || !data.email) {
      throw new Error('Name and email are required');
    }

    // Save to database
    return this.dbAdapter.create<Cooperative>('cooperatives', {
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getCooperativeById(id: string): Promise<Cooperative | null> {
    return this.dbAdapter.read<Cooperative>('cooperatives', id);
  }

  async updateCooperative(id: string, data: Partial<Cooperative>): Promise<Cooperative> {
    return this.dbAdapter.update<Cooperative>('cooperatives', id, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async getAllCooperatives(filters?: Record<string, any>): Promise<Cooperative[]> {
    return this.dbAdapter.query<Cooperative>({
      table: 'cooperatives',
      filters,
      orderBy: { column: 'created_at', ascending: false },
    });
  }
}
```

**Action Items:**
- [ ] Tạo file `CooperativeService.ts`
- [ ] Implement registerCooperative method với validation
- [ ] Implement getCooperativeById method
- [ ] Implement updateCooperative method
- [ ] Implement getAllCooperatives method (optional)
- [ ] Add error handling

---

## 5. UPDATE REGISTER PAGE LOGIC

### 5.1 Form Submission
Update `CooperativeRegisterPage.tsx`:

**BEFORE:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Direct Supabase call or simple state update
  setShowSuccessModal(true);
};
```

**AFTER:**
```typescript
import { CooperativeService } from '../application/CooperativeService';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const cooperative = await cooperativeService.registerCooperative(formData);
    setShowSuccessModal(true);
    // Optionally redirect or show success message
  } catch (error) {
    // Show error message
  }
};
```

**Action Items:**
- [ ] Update form submission logic
- [ ] Integrate với CooperativeService
- [ ] Add error handling và loading states

---

## 6. CREATE MODULE ROUTER

### 6.1 CooperativeModuleRouter (`src/modules/cooperative/infrastructure/CooperativeModuleRouter.tsx`)
```typescript
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const CooperativeLandingPage = lazy(() => import('../presentation/pages/CooperativeLandingPage'));
const CooperativeRegisterPage = lazy(() => import('../presentation/pages/CooperativeRegisterPage'));
const CooperativeLoginPage = lazy(() => import('../presentation/pages/CooperativeLoginPage'));
const CooperativeRegisterAccountPage = lazy(() => import('../presentation/pages/CooperativeRegisterAccountPage'));

export const cooperativeRoutes: RouteObject[] = [
  {
    path: '/cooperative',
    children: [
      { path: 'landing', element: <CooperativeLandingPage /> },
      { path: 'register', element: <CooperativeRegisterPage /> },
      { path: 'login', element: <CooperativeLoginPage /> },
      { path: 'register-account', element: <CooperativeRegisterAccountPage /> },
    ],
  },
];
```

**Action Items:**
- [ ] Tạo file `CooperativeModuleRouter.tsx`
- [ ] Define routes
- [ ] Export routes

---

## 7. INTEGRATE VÀO MAIN ROUTER

### 7.1 Update Main Router
`src/router/config.tsx`:

```typescript
import { cooperativeRoutes } from '@modules/cooperative/infrastructure/CooperativeModuleRouter';

const routes: RouteObject[] = [
  // ... existing routes
  ...cooperativeRoutes,
  // ... other routes
];
```

**Action Items:**
- [ ] Import cooperativeRoutes
- [ ] Add to routes array
- [ ] Test routing

---

## 8. DATABASE SCHEMA

### 8.1 Create Cooperatives Table (if not exists)
```sql
CREATE TABLE IF NOT EXISTS cooperatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  tax_code VARCHAR(50),
  established_year INTEGER,
  member_count INTEGER,
  total_forest_area DECIMAL,
  location TEXT,
  representative VARCHAR(255),
  representative_position VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  current_activities TEXT,
  interests TEXT[],
  additional_info TEXT,
  logo_url TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Action Items:**
- [ ] Review database schema
- [ ] Create migration script nếu cần
- [ ] Test insert/query operations

---

## 9. VERIFICATION CHECKLIST

- [ ] All pages migrated
- [ ] CooperativeService created
- [ ] Form submission works
- [ ] Data saved to database
- [ ] Routing works
- [ ] Build succeeds
- [ ] No TypeScript errors

---

## 10. DEPENDENCIES & NOTES

### Dependencies
- ✅ Phase 01: Core Foundation (AuthService, DatabaseAdapter) - **DatabaseAdapter đã được tạo trong Phase 01**

### Notes
- This phase focuses on access only (register/login)
- Dashboard và member management sẽ ở phase 05-06
- Status workflow: pending → approved → active
- DatabaseAdapter đã được tạo trong Phase 01, chỉ cần sử dụng IDatabasePort interface
- SupabaseDatabaseAdapter được inject vào CooperativeService với default value
