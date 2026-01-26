# PHASE 09: CỔNG XÃ VIÊN - TIÊU DÙNG (CONSUMER SUB-MODULE) - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Xây dựng phân hệ dành cho Xã viên tiêu dùng. Tập trung vào ưu đãi thành viên, voucher và quy đổi điểm thưởng Green Points.

---

## 1. CREATE SUB-MODULE STRUCTURE

```
src/modules/member/
├── consumer/
│   ├── pages/
│   │   ├── ConsumerDashboardPage.tsx
│   │   ├── ProductCatalogPage.tsx
│   │   ├── PurchaseHistoryPage.tsx
│   │   ├── MemberVouchersPage.tsx
│   │   └── RewardsPage.tsx
│   └── components/
│       ├── ProductCard.tsx
│       └── VoucherCard.tsx
```

**Action Items:**
- [ ] Create consumer subdirectory
- [ ] Create pages structure

---

## 2. CREATE PAGES

### 2.1 Consumer Dashboard
- [ ] Overview: Green Points, Member Tier, Total Saved
- [ ] Available vouchers preview
- [ ] Recent purchases

### 2.2 Product Catalog
- [ ] Products from HTXs user is member of
- [ ] Member pricing (discounted)
- [ ] Filter by HTX, category

### 2.3 Purchase History
- [ ] Order history with filters
- [ ] Order details
- [ ] Reorder functionality

### 2.4 Member Vouchers
- [ ] Available vouchers list
- [ ] Expiry dates
- [ ] Usage conditions

### 2.5 Rewards
- [ ] Green Points overview
- [ ] Rewards catalog
- [ ] Redeem points

**Action Items:**
- [ ] Create all 5 pages
- [ ] Design UI/UX

---

## 3. CREATE CONSUMER SERVICE

```typescript
// src/modules/member/application/ConsumerService.ts

async getMemberProducts(userId: string): Promise<Product[]>
async getVouchers(userId: string): Promise<Voucher[]>
async redeemPoints(points: number, rewardId: string): Promise<void>
async getPurchaseHistory(userId: string): Promise<Order[]>
```

**Action Items:**
- [ ] Create ConsumerService
- [ ] Implement methods
- [ ] Integrate với GreenPointsService

---

## 4. VERIFICATION CHECKLIST

- [ ] All 5 pages created
- [ ] Dashboard shows correct data
- [ ] Vouchers display correctly
- [ ] Rewards redemption works
- [ ] Build succeeds

---

## 5. DEPENDENCIES & NOTES

### Dependencies
- Phase 07: Member Core
- Phase 01: GreenPointsService

### Notes
- Member pricing logic cần rõ ràng
- Voucher expiry handling
