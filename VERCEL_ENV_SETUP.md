# Cấu hình Environment Variables trên Vercel

## Thông tin Supabase đã được cấu hình

- **Supabase URL**: `https://zuspekqswmubxlaeezgr.supabase.co`
- **Anon Key**: Đã được lưu trong `.env.local` (local development)

## Các bước thêm Environment Variables trên Vercel

1. **Đăng nhập Vercel Dashboard**
   - Truy cập: https://vercel.com/dashboard
   - Chọn project của bạn (hoặc tạo project mới)

2. **Vào Settings > Environment Variables**
   - Click vào project của bạn
   - Vào tab **Settings**
   - Scroll xuống phần **Environment Variables**

3. **Thêm các biến sau:**

   | Key | Value |
   |-----|-------|
   | `VITE_SUPABASE_URL` | `https://zuspekqswmubxlaeezgr.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1c3Bla3Fzd211YnhsYWVlemdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2ODMxMTQsImV4cCI6MjA4MzI1OTExNH0.O03fFqnYT1F1ZUV6JjHbdW2tO4z_xBJfykjciHn0vEQ` |
   | `VITE_GOOGLE_SHEETS_WEB_APP_URL` | `https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec` |

4. **Chọn Environment**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

5. **Save và Redeploy**
   - Click **Save**
   - Vào tab **Deployments**
   - Click **Redeploy** trên deployment mới nhất để áp dụng các biến mới

## Kiểm tra

Sau khi deploy, kiểm tra trong browser console:
- Không có warning về "Supabase environment variables are not set"
- Ứng dụng kết nối được với Supabase

## Lưu ý bảo mật

- ✅ File `.env.local` đã được thêm vào `.gitignore` - không commit vào git
- ✅ Anon key là public key, an toàn để sử dụng ở client-side
- ⚠️ **KHÔNG BAO GIỜ** commit Service Role Key vào code hoặc expose ra client-side

