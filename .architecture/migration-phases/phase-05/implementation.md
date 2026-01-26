# PHASE 05: CỔNG HỢP TÁC XÃ (HTX) - QUẢN TRỊ & HỒ SƠ - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Xây dựng Dashboard quản trị cho HTX. Đây là nơi Chủ nhiệm HTX nhìn thấy bức tranh tổng quan và quản lý thông tin tổ chức.

---

## 1. CREATE NEW PAGES

### 1.1 CooperativeDashboardPage
- [ ] Create `src/modules/cooperative/presentation/pages/CooperativeDashboardPage.tsx`
- [ ] Design layout với:
  - Stats cards (Số xã viên, Diện tích, Doanh thu)
  - Charts/Graphs (nếu có data)
  - Recent activities feed
  - Quick actions menu

### 1.2 CooperativeProfilePage
- [ ] Create `src/modules/cooperative/presentation/pages/CooperativeProfilePage.tsx`
- [ ] Form để cập nhật:
  - Logo HTX (upload image)
  - Giới thiệu về HTX
  - Thông tin liên hệ
  - Địa chỉ

**Action Items:**
- [ ] Create dashboard page
- [ ] Create profile page
- [ ] Design UI/UX

---

## 2. UPDATE COOPERATIVE SERVICE

### 2.1 Add Methods
```typescript
// src/modules/cooperative/application/CooperativeService.ts

async getCooperativeStats(cooperativeId: string): Promise<CooperativeStats> {
  // Aggregate stats:
  // - Total members
  // - Total area
  // - Monthly revenue
  // - Active contracts
}

async updateCooperativeProfile(
  id: string, 
  data: Partial<Cooperative>
): Promise<Cooperative> {
  // Update profile information
  // Handle logo upload
}

async uploadLogo(
  cooperativeId: string, 
  file: File
): Promise<string> {
  // Upload to Supabase Storage
  // Return logo URL
}
```

**Action Items:**
- [ ] Add getCooperativeStats method
- [ ] Add updateCooperativeProfile method
- [ ] Add uploadLogo method
- [ ] Implement storage integration

---

## 3. DASHBOARD STATS IMPLEMENTATION

### 3.1 Stats Cards Data
```typescript
interface CooperativeStats {
  totalMembers: number;
  totalArea: number; // hectares
  monthlyRevenue: number; // VND
  activeContracts: number;
  pendingTasks: number;
}
```

### 3.2 Data Fetching
- [ ] Query từ database:
  - Count members từ `cooperative_members` table
  - Sum area từ `farms` hoặc `land_plots` table
  - Sum revenue từ `orders` hoặc `transactions` table
  - Count contracts từ `contracts` table

**Action Items:**
- [ ] Create stats interface
- [ ] Implement data aggregation queries
- [ ] Add caching nếu cần (performance)

---

## 4. PROFILE UPDATE FEATURE

### 4.1 Form Implementation
- [ ] Create form với các fields:
  - Logo upload (drag & drop hoặc file picker)
  - Text editor cho "Giới thiệu"
  - Input fields cho thông tin khác

### 4.2 Image Upload
- [ ] Integrate với Supabase Storage:
  ```typescript
  const { data, error } = await supabase.storage
    .from('cooperative-logos')
    .upload(`${cooperativeId}/${fileName}`, file);
  ```

**Action Items:**
- [ ] Implement form
- [ ] Add image upload functionality
- [ ] Add preview cho logo
- [ ] Handle errors

---

## 5. UPDATE ROUTER

### 5.1 Add Dashboard Routes
```typescript
// CooperativeModuleRouter.tsx
const CooperativeDashboardPage = lazy(() => import('../presentation/pages/CooperativeDashboardPage'));
const CooperativeProfilePage = lazy(() => import('../presentation/pages/CooperativeProfilePage'));

export const cooperativeRoutes: RouteObject[] = [
  // ... existing routes
  {
    path: '/cooperative/dashboard',
    element: <AuthGuard><CooperativeDashboardPage /></AuthGuard>,
  },
  {
    path: '/cooperative/profile',
    element: <AuthGuard><CooperativeProfilePage /></AuthGuard>,
  },
];
```

**Action Items:**
- [ ] Add dashboard route với AuthGuard
- [ ] Add profile route với AuthGuard
- [ ] Test routing

---

## 6. UI COMPONENTS

### 6.1 Stats Cards Component
- [ ] Create `StatsCard.tsx` component:
  ```typescript
  interface StatsCardProps {
    title: string;
    value: number | string;
    icon: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }
  ```

### 6.2 Charts (Optional)
- [ ] Integrate chart library (Chart.js, Recharts, etc.)
- [ ] Create revenue chart
- [ ] Create member growth chart

**Action Items:**
- [ ] Create reusable StatsCard component
- [ ] Add charts nếu cần
- [ ] Style components

---

## 7. VERIFICATION CHECKLIST

- [ ] Dashboard page displays correctly
- [ ] Stats cards show real data (hoặc mock data)
- [ ] Profile page allows updates
- [ ] Logo upload works
- [ ] Changes persist after save
- [ ] Build succeeds
- [ ] No TypeScript errors

---

## 8. DEPENDENCIES & NOTES

### Dependencies
- Phase 01: Core Foundation
- Phase 04: HTX Access (để có authenticated user)

### Notes
- Stats có thể dùng mock data ban đầu, sau đó connect với real data
- Logo upload cần setup Supabase Storage bucket trước
