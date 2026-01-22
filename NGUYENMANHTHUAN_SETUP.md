# Hướng dẫn Setup Unified Platform cho nguyenmanhthuan

## 📋 Tổng quan

File này hướng dẫn cách setup unified platform cho project nguyenmanhthuan để đồng bộ với VITA platform.

**Mục tiêu:** Cả 2 platforms (VITA và nguyenmanhthuan) dùng chung 1 Supabase project và có thể sync Green Points/Users.

---

## 🎯 Checklist Setup

### ✅ Bước 1: Copy Files từ VITA

Files đã được copy tự động bằng script. Verify các files sau đã có:

- [ ] `src/lib/users/unifiedUserService.ts`
- [ ] `src/lib/greenPoints/types.ts`
- [ ] `src/lib/greenPoints/service.ts`
- [ ] `src/lib/greenPoints/helpers.ts`
- [ ] `src/lib/greenPoints/realtimeService.ts`
- [ ] `src/lib/greenPoints/index.ts`
- [ ] `src/lib/supabase.ts` (updated version)
- [ ] `src/components/shared/GreenPointsBadge.tsx` (nếu dùng)

### ✅ Bước 2: Update Environment Variables

**Trong Vercel:**
1. Vào Vercel Dashboard → chọn project nguyenmanhthuan
2. Settings → Environment Variables
3. Update:
   - `VITE_SUPABASE_URL` = `https://xaipdrumeejoikeidysi.supabase.co` (cùng với VITA)
   - `VITE_SUPABASE_ANON_KEY` = (cùng key với VITA)
4. Chọn tất cả environments (Production, Preview, Development)
5. Save và Redeploy

**Hoặc trong `.env` file:**
```env
VITE_SUPABASE_URL=https://xaipdrumeejoikeidysi.supabase.co
VITE_SUPABASE_ANON_KEY=<cùng key với VITA>
```

### ✅ Bước 3: Update Code Calls

Cần update tất cả các nơi gọi `earnPoints()` và `redeemPoints()`:

**Tìm tất cả files có `earnPoints(`:**
```bash
grep -r "earnPoints(" src/
```

**Tìm tất cả files có `redeemPoints(`:**
```bash
grep -r "redeemPoints(" src/
```

**Update pattern:**

**Cũ:**
```typescript
await earnPoints(userId, activity, points, category, portal);
```

**Mới:**
```typescript
await earnPoints(
  userId,
  userType,  // NEW: 'consumer', 'farmer', etc.
  points,
  activity,
  category,
  portal,
  metadata,  // optional
  'nguyenmanhthuan'  // NEW: platform source
);
```

**Cũ:**
```typescript
await redeemPoints(userId, rewardId, points, rewardName);
```

**Mới:**
```typescript
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName,
  'nguyenmanhthuan'  // NEW: platform source (optional)
);
```

Xem chi tiết trong `docs/CODE_MIGRATION_GUIDE.md`.

### ✅ Bước 4: Update getUserGreenPoints Calls (Optional)

Nếu có code gọi `getUserGreenPoints()`, có thể thêm platformSource:

```typescript
// Cũ
const points = await getUserGreenPoints(userId);

// Mới (optional)
const points = await getUserGreenPoints(userId, 'nguyenmanhthuan');
```

### ✅ Bước 5: Test

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Verify:**
   - Không có lỗi "Supabase environment variables are not set"
   - Green Points hiển thị đúng
   - Realtime updates hoạt động (nếu có)

---

## 🔍 Files Cần Update

Sau khi copy files, cần tìm và update các files sau:

### 1. Files có `earnPoints(` calls

Cần update signature để thêm `userType` và `platformSource`:

```typescript
// Example update
import { earnPoints } from '../../lib/greenPoints/service';

// Before
await earnPoints(
  userId,
  'Purchase',
  100,
  'purchase',
  'consumer-portal'
);

// After
await earnPoints(
  userId,
  'consumer',  // ADD: userType
  100,
  'Purchase',
  'purchase',
  'consumer-portal',
  undefined,  // metadata (optional)
  'nguyenmanhthuan'  // ADD: platformSource
);
```

### 2. Files có `redeemPoints(` calls

```typescript
// Before
await redeemPoints(userId, rewardId, points, rewardName);

// After
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName,
  'nguyenmanhthuan'  // ADD: platformSource (optional)
);
```

### 3. Files có `getUserGreenPoints(` calls (Optional)

```typescript
// Before
const points = await getUserGreenPoints(userId);

// After (optional - auto-detects platform)
const points = await getUserGreenPoints(userId, 'nguyenmanhthuan');
```

---

## 📝 Helper Functions

Nếu dùng helper functions từ `greenPoints/helpers.ts`, chúng đã được update:

```typescript
import { earnPurchasePoints } from '../../lib/greenPoints/helpers';

// Helper functions đã có userType và platformSource
await earnPurchasePoints(
  userId,
  'consumer',  // userType
  amount,
  isOrganic,
  'portal-name',
  'nguyenmanhthuan'  // platformSource (optional, auto-detects)
);
```

---

## 🗄️ Database Migration (Nếu có data)

Nếu project nguyenmanhthuan đã có data trong Supabase cũ:

1. **Export data từ Supabase project cũ:**
   - Vào Supabase Dashboard của project cũ
   - Export tables: `users`, `green_points`, `green_point_transactions`

2. **Import vào project VITA:**
   - Xem hướng dẫn trong `docs/UNIFIED_PLATFORM_MIGRATION.md`

3. **Nếu chưa có data:** Bỏ qua bước này

---

## ✅ Verification Checklist

Sau khi setup xong, verify:

- [ ] Environment variables đã được update (cùng với VITA)
- [ ] Files đã được copy đầy đủ
- [ ] Code calls đã được update (earnPoints, redeemPoints)
- [ ] Build thành công (`npm run build`)
- [ ] Test locally thành công
- [ ] Deploy lên Vercel
- [ ] Test trên production
- [ ] Green Points sync giữa 2 platforms hoạt động

---

## 🐛 Troubleshooting

### Lỗi: "Supabase environment variables are not set"
- **Giải pháp:** Kiểm tra environment variables đã được set đúng chưa
- Redeploy sau khi update environment variables

### Lỗi: "earnPoints is not a function"
- **Giải pháp:** Kiểm tra import path đúng chưa
- Verify file `src/lib/greenPoints/service.ts` đã được copy

### Lỗi: "Expected 8 arguments, but got 5"
- **Giải pháp:** Update earnPoints calls để thêm userType và platformSource
- Xem `docs/CODE_MIGRATION_GUIDE.md` để biết cách update

### Lỗi: "Table not found"
- **Giải pháp:** Kiểm tra migration script đã chạy trong Supabase
- Verify tables đã được tạo trong Supabase Dashboard

---

## 📞 Support

Nếu gặp vấn đề:
1. Check `docs/CODE_MIGRATION_GUIDE.md` để biết cách update code
2. Check `docs/UNIFIED_PLATFORM_MIGRATION.md` để biết cách migrate data
3. Check Supabase Dashboard logs
4. Check Vercel deployment logs

---

## 🎯 Next Steps After Setup

Sau khi setup xong:
1. Test Green Points earning từ cả 2 platforms
2. Test unified user ID mapping
3. Test realtime updates
4. Monitor logs để đảm bảo mọi thứ hoạt động đúng

---

**Last Updated:** $(date)
**Status:** Ready for setup
