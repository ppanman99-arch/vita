# Deployment Checklist - Unified Platform

## ✅ Pre-Deployment Checklist

### 1. Code Status
- [x] Build thành công (`npm run build`)
- [x] All new services created
- [x] Documentation complete
- [ ] Linter errors fixed (optional - có 11 errors trong farmer-dashboard, không ảnh hưởng build)

### 2. Database Setup
- [ ] Chạy migration script trong Supabase Dashboard
  - File: `supabase/migrations/001_unified_users_and_green_points.sql`
  - Location: Supabase Dashboard → SQL Editor
- [ ] Enable Realtime cho các tables:
  - `users`
  - `user_mappings`
  - `green_points`
  - `green_point_transactions`
  - Location: Supabase Dashboard → Database → Replication

### 3. Environment Variables

#### VITA Platform
Cập nhật `.env` hoặc Vercel Environment Variables:
```env
VITE_SUPABASE_URL=https://your-vita-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-vita-anon-key
```

#### nguyenmanhthuan Platform
Cập nhật `.env` hoặc Vercel Environment Variables:
```env
VITE_SUPABASE_URL=https://your-vita-project.supabase.co  # Cùng URL với VITA
VITE_SUPABASE_ANON_KEY=your-vita-anon-key                # Cùng key với VITA
```

### 4. Data Migration
- [ ] Export dữ liệu từ nguyenmanhthuan Supabase project
- [ ] Migrate users từ nguyenmanhthuan sang VITA project
- [ ] Migrate green_points từ nguyenmanhthuan sang VITA project
- [ ] Verify data integrity

### 5. Testing
- [ ] Test user creation từ VITA platform
- [ ] Test user creation từ nguyenmanhthuan platform
- [ ] Test Green Points earning từ cả 2 platforms
- [ ] Test unified user ID mapping
- [ ] Test realtime updates
- [ ] Test redeemPoints

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "feat: unified platform - VITA + nguyenmanhthuan"
   git push origin main
   ```

2. **Vercel sẽ tự động deploy** (nếu đã setup auto-deploy)

3. **Hoặc deploy manually:**
   ```bash
   vercel --prod
   ```

4. **Update Environment Variables trong Vercel:**
   - Vào Vercel Dashboard → Project → Settings → Environment Variables
   - Update `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`

### Option 2: Manual Build & Deploy

1. **Build production:**
   ```bash
   npm run build
   ```

2. **Deploy `out/` folder** lên hosting service của bạn

## 📋 Post-Deployment

### 1. Verify Deployment
- [ ] Check VITA platform hoạt động bình thường
- [ ] Check nguyenmanhthuan platform hoạt động bình thường
- [ ] Test Green Points sync giữa 2 platforms
- [ ] Test realtime updates

### 2. Monitor
- [ ] Monitor Supabase Dashboard logs
- [ ] Monitor Vercel logs (nếu dùng Vercel)
- [ ] Check error rates
- [ ] Monitor database performance

### 3. Rollback Plan
Nếu có vấn đề:
1. Revert environment variables về Supabase project cũ
2. Revert code về commit trước đó
3. Restore database backup (nếu có)

## 🔧 Troubleshooting

### Issue: "User not found"
**Solution:** Kiểm tra user_mappings table, đảm bảo unified_user_id được set đúng

### Issue: "Realtime not working"
**Solution:** 
- Kiểm tra Realtime đã được enable trong Supabase Dashboard
- Kiểm tra RLS policies không block subscriptions

### Issue: "Platform source mismatch"
**Solution:** 
- Đảm bảo platform_source được set đúng khi tạo user/points
- Kiểm tra constraint trong database

### Issue: "Build failed"
**Solution:**
- Check linter errors: `npm run lint`
- Fix TypeScript errors
- Check environment variables

## 📞 Support

Nếu gặp vấn đề:
1. Check Supabase Dashboard logs
2. Check browser console logs
3. Check Network requests trong DevTools
4. Review documentation:
   - `docs/UNIFIED_PLATFORM_MIGRATION.md`
   - `docs/CODE_MIGRATION_GUIDE.md`

## 📝 Notes

- **Backward Compatibility**: Code cũ vẫn hoạt động nhưng nên update để đảm bảo tính nhất quán
- **Platform Source**: Auto-detect từ hostname nếu không truyền
- **Realtime**: Cần enable Realtime trong Supabase Dashboard
- **Testing**: Test kỹ trên staging trước khi deploy production
