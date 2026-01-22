# 🚀 Setup Unified Platform - nguyenmanhthuan Project

## ⚠️ QUAN TRỌNG: Đọc file này trước khi bắt đầu!

Khi mở folder nguyenmanhthuan, file này sẽ hướng dẫn bạn (hoặc AI assistant) các bước cần làm để setup unified platform.

---

## 📋 Tổng quan

Project này cần được đồng bộ với VITA platform để:
- Dùng chung 1 Supabase project
- Sync Green Points và Users
- Support unified user ID mapping

---

## 🎯 Các bước Setup

### Bước 1: Copy Files từ VITA

**Nếu chưa copy:**
```bash
# Từ project VITA, chạy:
./scripts/copy-to-nguyenmanhthuan.sh /path/to/nguyenmanhthuan/project
```

**Nếu đã copy:** Verify files đã có (xem checklist bên dưới)

### Bước 2: Update Environment Variables

**Trong Vercel:**
- Settings → Environment Variables
- Update `VITE_SUPABASE_URL` = `https://xaipdrumeejoikeidysi.supabase.co`
- Update `VITE_SUPABASE_ANON_KEY` = (cùng với VITA)

**Hoặc trong `.env`:**
```env
VITE_SUPABASE_URL=https://xaipdrumeejoikeidysi.supabase.co
VITE_SUPABASE_ANON_KEY=<cùng key với VITA>
```

### Bước 3: Find và Update Code Calls

**Tìm tất cả files cần update:**
```bash
# Find earnPoints calls
grep -r "earnPoints(" src/ --include="*.ts" --include="*.tsx"

# Find redeemPoints calls
grep -r "redeemPoints(" src/ --include="*.ts" --include="*.tsx"
```

**Update pattern:** Xem `NGUYENMANHTHUAN_SETUP.md` hoặc `docs/CODE_MIGRATION_GUIDE.md`

### Bước 4: Test và Deploy

```bash
npm run build
npm run dev
# Test locally, then deploy
```

---

## 📁 Files Cần Có

Verify các files sau đã được copy:

- [ ] `src/lib/users/unifiedUserService.ts`
- [ ] `src/lib/greenPoints/types.ts`
- [ ] `src/lib/greenPoints/service.ts`
- [ ] `src/lib/greenPoints/helpers.ts`
- [ ] `src/lib/greenPoints/realtimeService.ts`
- [ ] `src/lib/greenPoints/index.ts`
- [ ] `src/lib/supabase.ts` (updated version)
- [ ] `src/components/shared/GreenPointsBadge.tsx` (nếu dùng)
- [ ] `docs/CODE_MIGRATION_GUIDE.md`
- [ ] `docs/UNIFIED_PLATFORM_MIGRATION.md`

---

## 🔧 Quick Commands

**Find all earnPoints calls:**
```bash
grep -r "earnPoints(" src/ --include="*.ts" --include="*.tsx" -n
```

**Find all redeemPoints calls:**
```bash
grep -r "redeemPoints(" src/ --include="*.ts" --include="*.tsx" -n
```

**Check environment variables:**
```bash
cat .env | grep SUPABASE
```

**Build và test:**
```bash
npm run build
npm run dev
```

---

## 📚 Documentation

- **Setup Guide:** `NGUYENMANHTHUAN_SETUP.md`
- **Code Migration:** `docs/CODE_MIGRATION_GUIDE.md`
- **Data Migration:** `docs/UNIFIED_PLATFORM_MIGRATION.md`
- **Checklist:** `scripts/setup-nguyenmanhthuan-checklist.md`

---

## 🎯 Supabase Credentials

**Project URL:**
```
https://xaipdrumeejoikeidysi.supabase.co
```

**Anon Key:**
(Cùng với VITA project - lấy từ Vercel hoặc Supabase Dashboard)

---

## ✅ Final Verification

Sau khi setup xong:

1. **Build thành công:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm run dev
   ```
   - Không có warning "Supabase environment variables are not set"
   - Green Points hiển thị đúng

3. **Deploy và test production:**
   - Deploy lên Vercel
   - Test Green Points earning
   - Test sync với VITA platform

---

## 🐛 Common Issues

**"earnPoints is not a function"**
→ Check import path và verify files đã được copy

**"Expected 8 arguments, but got 5"**
→ Update earnPoints calls để thêm userType và platformSource

**"Supabase environment variables are not set"**
→ Check environment variables đã được set đúng chưa

---

## 📞 Support

Nếu gặp vấn đề:
1. Check `NGUYENMANHTHUAN_SETUP.md` để biết chi tiết
2. Check `docs/CODE_MIGRATION_GUIDE.md` để biết cách update code
3. Check Supabase Dashboard logs
4. Check Vercel deployment logs

---

**Status:** Ready for setup
**Last Updated:** $(date)
