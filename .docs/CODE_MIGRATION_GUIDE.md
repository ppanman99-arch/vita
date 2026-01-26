# Code Migration Guide - Unified Platform

## Tổng quan

Sau khi migrate database, cần update code để sử dụng unified user ID và platform_source. Tài liệu này hướng dẫn cách update các function calls.

## Thay đổi Function Signatures

### 1. `earnPoints`

**Cũ:**
```typescript
await earnPoints(
  userId,
  activity,
  points,
  category,
  portal,
  metadata
);
```

**Mới:**
```typescript
await earnPoints(
  userId,
  userType,        // NEW: UserType ('consumer', 'farmer', etc.)
  points,
  activity,
  category,
  portal,
  metadata,
  platformSource?  // NEW: Optional PlatformSource ('vita' | 'nguyenmanhthuan')
);
```

### 2. `redeemPoints`

**Cũ:**
```typescript
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName
);
```

**Mới:**
```typescript
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName,
  platformSource?  // NEW: Optional PlatformSource
);
```

### 3. `getUserGreenPoints`

**Cũ:**
```typescript
const points = await getUserGreenPoints(userId);
```

**Mới:**
```typescript
const points = await getUserGreenPoints(userId, platformSource?);
```

## Helper Functions đã được update

Các helper functions trong `src/lib/greenPoints/helpers.ts` đã được update:
- `earnPurchasePoints` - Thêm `userType` và `platformSource?`
- `earnInvestmentPoints` - Thêm `userType` và `platformSource?`
- `earnESGSponsorPoints` - Thêm `userType` và `platformSource?`
- `earnCarbonCreditPoints` - Thêm `userType` và `platformSource?`

## Các file cần update

### 1. Direct `earnPoints` calls

Các file sau cần update để thêm `userType`:

- `src/pages/investor-community/page.tsx`
- `src/pages/consumer-wallet/page.tsx`
- `src/pages/farmer-consumer/page.tsx`
- `src/pages/consumer-community/page.tsx`
- `src/pages/farmer-diary/page.tsx`
- `src/pages/enterprise-procurement/page.tsx`

**Ví dụ update:**

```typescript
// CŨ
await earnPoints(
  sessionStorage.getItem('user_id') || 'demo-user',
  'Chia sẻ trong cộng đồng',
  5,
  'engagement',
  'consumer-community',
);

// MỚI
await earnPoints(
  sessionStorage.getItem('user_id') || 'demo-user',
  'consumer',  // ADD: userType
  5,
  'Chia sẻ trong cộng đồng',
  'engagement',
  'consumer-community',
  undefined,  // metadata (optional)
  undefined   // platformSource (optional, auto-detected)
);
```

### 2. `redeemPoints` calls

- `src/pages/green-points/page.tsx`
- `src/lib/vitaScore/linkService.ts`

**Ví dụ update:**

```typescript
// CŨ
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName
);

// MỚI
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName,
  undefined  // platformSource (optional)
);
```

### 3. `getUserGreenPoints` calls

Các component sử dụng `getUserGreenPoints` có thể thêm `platformSource` nếu cần:

```typescript
// CŨ
const points = await getUserGreenPoints(userId);

// MỚI (optional)
const points = await getUserGreenPoints(userId, 'vita');
```

## Auto-detection Platform Source

Code tự động detect platform source từ hostname:

```typescript
// src/lib/greenPoints/service.ts
const getCurrentPlatformSource = (): PlatformSource => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('nguyenmanhthuan')) {
      return 'nguyenmanhthuan';
    }
  }
  return 'vita'; // Default
};
```

Nếu không truyền `platformSource`, hệ thống sẽ tự động detect.

## Sử dụng Helper Functions (Khuyến nghị)

Thay vì gọi `earnPoints` trực tiếp, nên dùng helper functions:

```typescript
import { earnPurchasePoints } from '../../lib/greenPoints/helpers';

// Thay vì
await earnPoints(userId, 'consumer', points, 'Mua sản phẩm', 'purchase', 'portal');

// Dùng
await earnPurchasePoints(userId, 'consumer', amount, false, 'portal');
```

## Realtime Updates

Components đã được update để sử dụng realtime:

- `src/components/shared/GreenPointsBadge.tsx` - Sử dụng `useGreenPointsRealtime`

Các component khác có thể update tương tự:

```typescript
import { useGreenPointsRealtime } from '../../lib/greenPoints/realtimeService';

function MyComponent() {
  const userId = sessionStorage.getItem('user_id') || 'demo-user';
  const { points, loading } = useGreenPointsRealtime(userId);
  
  // points sẽ tự động update khi có thay đổi
}
```

## Testing Checklist

- [ ] Test earnPoints từ VITA platform
- [ ] Test earnPoints từ nguyenmanhthuan platform
- [ ] Test unified user ID mapping
- [ ] Test realtime updates
- [ ] Test redeemPoints
- [ ] Test helper functions

## Notes

1. **Backward Compatibility**: Code cũ vẫn hoạt động nhưng nên update để đảm bảo tính nhất quán
2. **Platform Source**: Nếu không truyền, sẽ auto-detect từ hostname
3. **User Type**: Cần truyền đúng userType để đảm bảo tính chính xác
