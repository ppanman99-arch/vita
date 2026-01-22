# Setup Checklist - nguyenmanhthuan Project

## 🎯 Khi mở folder nguyenmanhthuan, cần làm:

### 1. Verify Files Đã Được Copy

Check các files sau đã có:

```bash
# Check unified user service
ls src/lib/users/unifiedUserService.ts

# Check green points files
ls src/lib/greenPoints/types.ts
ls src/lib/greenPoints/service.ts
ls src/lib/greenPoints/helpers.ts
ls src/lib/greenPoints/realtimeService.ts
ls src/lib/greenPoints/index.ts

# Check supabase client
ls src/lib/supabase.ts

# Check components (if used)
ls src/components/shared/GreenPointsBadge.tsx
```

### 2. Find và Update Code Calls

**Tìm tất cả earnPoints calls:**
```bash
grep -r "earnPoints(" src/ --include="*.ts" --include="*.tsx"
```

**Tìm tất cả redeemPoints calls:**
```bash
grep -r "redeemPoints(" src/ --include="*.ts" --include="*.tsx"
```

**Tìm tất cả getUserGreenPoints calls:**
```bash
grep -r "getUserGreenPoints(" src/ --include="*.ts" --include="*.tsx"
```

### 3. Update Environment Variables

**Check .env file:**
```bash
cat .env | grep SUPABASE
```

**Hoặc check Vercel Environment Variables:**
- Vào Vercel Dashboard → project nguyenmanhthuan
- Settings → Environment Variables
- Verify:
  - `VITE_SUPABASE_URL` = `https://xaipdrumeejoikeidysi.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = (cùng với VITA)

### 4. Update Code Calls

**Pattern để update:**

**earnPoints:**
```typescript
// OLD
await earnPoints(userId, activity, points, category, portal);

// NEW
await earnPoints(
  userId,
  userType,  // 'consumer', 'farmer', etc.
  points,
  activity,
  category,
  portal,
  metadata,  // optional
  'nguyenmanhthuan'  // platform source
);
```

**redeemPoints:**
```typescript
// OLD
await redeemPoints(userId, rewardId, points, rewardName);

// NEW
await redeemPoints(
  userId,
  rewardId,
  points,
  rewardName,
  'nguyenmanhthuan'  // optional
);
```

### 5. Test

```bash
# Build
npm run build

# Run dev
npm run dev

# Check for errors
npm run lint
```

### 6. Deploy

```bash
# Push to GitHub (if using Vercel auto-deploy)
git add .
git commit -m "feat: unified platform integration"
git push

# Or deploy manually
vercel --prod
```

---

## 📋 Quick Reference

**Supabase Credentials:**
- URL: `https://xaipdrumeejoikeidysi.supabase.co`
- Anon Key: (cùng với VITA project)

**Platform Source:**
- Always use: `'nguyenmanhthuan'` when calling earnPoints/redeemPoints

**User Types:**
- `'consumer'`, `'farmer'`, `'admin'`, `'enterprise'`, `'investor'`, `'expert'`, `'creator'`, `'gov'`

---

## 🔍 Auto-Detection

Code tự động detect platform từ hostname, nhưng nên truyền explicit để đảm bảo chính xác:

```typescript
// Auto-detects from hostname
await earnPoints(userId, userType, points, activity, category, portal);

// Explicit (recommended)
await earnPoints(userId, userType, points, activity, category, portal, metadata, 'nguyenmanhthuan');
```

---

## ✅ Final Checklist

- [ ] Files đã được copy
- [ ] Environment variables đã update
- [ ] Code calls đã update
- [ ] Build thành công
- [ ] Test locally thành công
- [ ] Deploy lên Vercel
- [ ] Test trên production
- [ ] Green Points sync hoạt động
