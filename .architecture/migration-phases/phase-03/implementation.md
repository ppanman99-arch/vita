# PHASE 03: WEBSITE NGUYENMANHTHUAN - THƯƠNG MẠI & TÍCH ĐIỂM - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Kích hoạt tính năng mua sắm (E-commerce) và tích hợp hệ thống **Green Points** (Điểm xanh) của VITA vào website NguyenManhThuan.

---

## 1. MIGRATE CART & CHECKOUT FEATURES

### 1.1 Cart Feature
- [ ] Migrate `CartPage.tsx` từ nguyenmanhthuan
- [ ] Migrate `CartService.ts` hoặc cart logic
- [ ] Update imports để dùng `@core` services

### 1.2 Checkout Feature
- [ ] Migrate `CheckoutPage.tsx`
- [ ] Migrate payment processing logic
- [ ] Integrate với `PaymentService` từ `@core` (nếu đã có)

**Action Items:**
- [ ] Copy cart và checkout pages vào module
- [ ] Update imports
- [ ] Test cart functionality

---

## 2. GREEN POINTS INTEGRATION

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
import { GreenPointsService } from '@core/application/shared/GreenPointsService';
import { SupabaseGreenPointsAdapter } from '@core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter';
import { ActivityType, Category, Portal } from '@core/domain/greenPoints/GreenPoints';

const greenPointsService = new GreenPointsService(new SupabaseGreenPointsAdapter());

await greenPointsService.earnPoints({
  userId,
  userType: 'consumer',
  points: 100,
  activity: ActivityType.PURCHASE,
  category: Category.PURCHASE,
  portal: Portal.NGUYENMANHTHUAN,
  platformSource: 'nguyenmanhthuan',
  metadata: { orderId: '123', orderValue: 1000000 }, // optional
});
```

### 2.2 Update Purchase Flow
- [ ] Tìm nơi xử lý sau khi đặt hàng thành công
- [ ] Thêm logic tích điểm Green Points
- [ ] Tính điểm dựa trên giá trị đơn hàng (theo quy tắc tích điểm)

**Action Items:**
- [ ] Find all `earnPoints` calls: `grep -r "earnPoints" src/modules/nguyenmanhthuan/`
- [ ] Update tất cả calls để dùng `GreenPointsService`
- [ ] Test tích điểm hoạt động

---

## 3. AUTHENTICATION INTEGRATION

### 3.1 Shared Session với VITA
Đảm bảo đăng nhập ở VITA có thể dùng ở nguyenmanhthuan:

- [ ] Update `AuthService` usage trong nguyenmanhthuan pages
- [ ] Check session từ `@core/application/auth/AuthService`
- [ ] Nếu chưa đăng nhập, redirect về VITA login hoặc hiện login modal

### 3.2 User Context
- [ ] Sử dụng `UserContext` từ `@core` để lấy thông tin user
- [ ] Hiển thị tên user trên header (nếu có)

**Action Items:**
- [ ] Update auth checks trong nguyenmanhthuan
- [ ] Test login flow từ VITA → nguyenmanhthuan
- [ ] Test session persistence

---

## 4. DATABASE INTEGRATION

### 4.1 Orders Table
- [ ] Đảm bảo bảng `orders` lưu đúng `user_id` từ VITA
- [ ] Update order creation logic để dùng `user_id` từ `AuthService.getCurrentUser()`

### 4.2 Order History
- [ ] Migrate order history page (nếu có)
- [ ] Query orders theo `user_id` từ VITA

**Action Items:**
- [ ] Review database schema
- [ ] Update order creation code
- [ ] Test order creation và retrieval

---

## 5. UPDATE ROUTER

### 5.1 Add Commerce Routes
Update `NguyenManhthuanModuleRouter.tsx`:

```typescript
const CartPage = lazy(() => import('../presentation/pages/CartPage'));
const CheckoutPage = lazy(() => import('../presentation/pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('../presentation/pages/OrderHistoryPage'));

export const nguyenManhthuanRoutes: RouteObject[] = [
  // ... existing routes
  { path: 'cart', element: <CartPage /> },
  { path: 'checkout', element: <CheckoutPage /> },
  { path: 'orders', element: <OrderHistoryPage /> },
];
```

**Action Items:**
- [ ] Add cart, checkout, orders routes
- [ ] Test routing

---

## 6. VERIFICATION CHECKLIST

- [ ] Cart page displays correctly
- [ ] Add to cart functionality works
- [ ] Checkout flow works
- [ ] Order creation saves to database
- [ ] Green Points earned after purchase
- [ ] Green Points sync với VITA
- [ ] Session shared between VITA and nguyenmanhthuan
- [ ] Build succeeds
- [ ] No TypeScript errors

---

## 7. DEPENDENCIES & NOTES

### Dependencies
- ✅ Phase 01: Core Foundation (AuthService, GreenPointsService) - **GreenPointsService đã được tạo trong Phase 01**
- ✅ Phase 02: nguyenmanhthuan basic display

### Notes
- Green Points calculation rules cần được định nghĩa rõ (ví dụ: 1% giá trị đơn hàng)
- GreenPointsService đã được tạo trong Phase 01, chỉ cần sử dụng ở đây
- Sử dụng constants (ActivityType, Category, Portal) thay vì magic strings để tránh lỗi typo
- Payment gateway integration sẽ được làm ở phase sau (nếu cần)
