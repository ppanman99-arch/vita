# PHASE 02: WEBSITE NGUYENMANHTHUAN - HIỂN THỊ CƠ BẢN - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Đưa website `nguyenmanhthuan` vào trong dự án VITA. Ở bước này, chỉ tập trung vào việc **hiển thị nội dung** (Trang chủ, Sản phẩm) để đảm bảo routing và giao diện hoạt động đúng. Chưa cần xử lý mua hàng.

---

## 1. TẠO MODULE STRUCTURE

### 1.1 Create Directory Structure
```
src/modules/nguyenmanhthuan/
├── domain/
│   └── Product.ts (optional, nếu cần)
├── application/
│   └── ProductService.ts (optional)
├── presentation/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   └── ProductDetailPage.tsx
│   └── components/
│       └── (components từ nguyenmanhthuan)
├── infrastructure/
│   └── NguyenManhthuanModuleRouter.tsx
└── assets/
    └── images/ (nếu có assets riêng)
```

**Action Items:**
- [ ] Tạo tất cả thư mục trên
- [ ] Tạo file `.gitkeep` trong các thư mục rỗng

---

## 2. MERGE CODE TỪ NGUYENMANHTHUAN REPO

### 2.1 Identify Source Files
Cần xác định các files từ repo `nguyenmanhthuan`:
- [ ] List tất cả pages trong `src/pages/` của nguyenmanhthuan
- [ ] List tất cả components trong `src/components/` của nguyenmanhthuan
- [ ] List tất cả assets trong `public/` của nguyenmanhthuan

### 2.2 Copy Pages
- [ ] Copy `HomePage.tsx` → `src/modules/nguyenmanhthuan/presentation/pages/HomePage.tsx`
- [ ] Copy `ProductsPage.tsx` → `src/modules/nguyenmanhthuan/presentation/pages/ProductsPage.tsx`
- [ ] Copy `ProductDetailPage.tsx` → `src/modules/nguyenmanhthuan/presentation/pages/ProductDetailPage.tsx`
- [ ] Copy các pages khác nếu có

### 2.3 Copy Components
- [ ] Copy tất cả components từ `src/components/` → `src/modules/nguyenmanhthuan/presentation/components/`

### 2.4 Copy Assets
- [ ] Copy images từ `public/images/` → `src/modules/nguyenmanhthuan/assets/images/`
- [ ] Update image paths trong code nếu cần

**Action Items:**
- [ ] Clone/copy source code từ nguyenmanhthuan repo
- [ ] Move files vào đúng vị trí trong module structure
- [ ] Document các files đã copy

---

## 3. UPDATE IMPORTS

### 3.1 Fix Relative Imports
Các imports trong files đã copy cần được update:

**BEFORE:**
```typescript
import { supabase } from '../../lib/supabase';
import Header from '../components/Header';
```

**AFTER:**
```typescript
// Nếu cần dùng core services:
import { AuthService } from '@core/application/auth/AuthService';

// Components:
import Header from '../components/Header'; // Relative path vẫn OK trong cùng module
```

### 3.2 Remove Duplicate Code
- [ ] **KHÔNG** copy `src/lib/greenPoints/*` (sẽ dùng từ `@core`)
- [ ] **KHÔNG** copy `src/lib/supabase.ts` (sẽ dùng từ `@core`)
- [ ] **KHÔNG** copy `src/lib/users/*` (sẽ dùng từ `@core`)

**Action Items:**
- [ ] Update tất cả imports trong copied files
- [ ] Remove duplicate lib files
- [ ] Fix TypeScript errors

---

## 4. CREATE MODULE ROUTER

### 4.1 Create Router File
`src/modules/nguyenmanhthuan/infrastructure/NguyenManhthuanModuleRouter.tsx`

```typescript
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('../presentation/pages/HomePage'));
const ProductsPage = lazy(() => import('../presentation/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../presentation/pages/ProductDetailPage'));

export const nguyenManhthuanRoutes: RouteObject[] = [
  {
    path: '/nguyen-manh-thuan',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      // Add more routes as needed
    ],
  },
];
```

**Action Items:**
- [ ] Tạo file `NguyenManhthuanModuleRouter.tsx`
- [ ] Define routes cho tất cả pages
- [ ] Export routes để import vào main router

---

## 5. INTEGRATE VÀO MAIN ROUTER

### 5.1 Update Main Router
`src/router/config.tsx`

```typescript
import { nguyenManhthuanRoutes } from '@modules/nguyenmanhthuan/infrastructure/NguyenManhthuanModuleRouter';

// In routes array:
const routes: RouteObject[] = [
  // ... existing routes
  ...nguyenManhthuanRoutes,
  // ... other routes
];
```

**Action Items:**
- [ ] Import nguyenManhthuanRoutes vào main router
- [ ] Add routes vào routes array
- [ ] Test routing works

---

## 6. UPDATE VITE CONFIG (Nếu cần)

### 6.1 Add Module Alias (Optional)
Nếu muốn import dễ hơn:

```typescript
// vite.config.ts
resolve: {
  alias: {
    "@nguyenmanhthuan": resolve(__dirname, "./src/modules/nguyenmanhthuan"),
  },
}
```

**Action Items:**
- [ ] Update vite.config.ts nếu cần
- [ ] Update tsconfig.app.json tương ứng

---

## 7. CLEANUP & VERIFICATION

### 7.1 Remove Old References
- [ ] Check xem có file nào trong VITA đang import từ nguyenmanhthuan cũ không
- [ ] Update hoặc remove các references đó

### 7.2 Build Verification
- [ ] Run `npm run build` - should succeed
- [ ] Fix any TypeScript errors
- [ ] Fix any import errors

**Action Items:**
- [ ] Cleanup old references
- [ ] Verify build
- [ ] Document any issues

---

## 8. DEPENDENCIES & NOTES

### Dependencies
- Phase 01 must be completed (Core foundation)
- Need access to nguyenmanhthuan source code

### Notes
- This phase focuses on display only, no commerce functionality yet
- Cart/Checkout will be implemented in Phase 03
- Green Points integration will be in Phase 03
