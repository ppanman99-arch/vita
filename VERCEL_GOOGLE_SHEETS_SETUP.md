# Cấu hình Google Sheets Web App URL trên Vercel

## Vấn đề

Khi deploy lên Vercel, bạn thấy warning:
```
Google Sheets Web App URL chưa được cấu hình. Vui lòng thêm VITE_GOOGLE_SHEETS_WEB_APP_URL vào .env
```

## Nguyên nhân

Biến môi trường `VITE_GOOGLE_SHEETS_WEB_APP_URL` chưa được thêm vào Vercel Environment Variables, hoặc đã thêm nhưng chưa redeploy.

## Giải pháp

### Bước 1: Thêm Environment Variable trên Vercel

1. **Đăng nhập Vercel Dashboard**
   - Truy cập: https://vercel.com/dashboard
   - Chọn project của bạn

2. **Vào Settings > Environment Variables**
   - Click vào project của bạn
   - Vào tab **Settings**
   - Scroll xuống phần **Environment Variables**

3. **Thêm biến mới:**
   - Click **Add New**
   - **Key**: `VITE_GOOGLE_SHEETS_WEB_APP_URL`
   - **Value**: `https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec`
   - **Environment**: Chọn tất cả:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

4. **Click Save**

### Bước 2: Redeploy Project

**QUAN TRỌNG**: Sau khi thêm environment variable, bạn **PHẢI** redeploy để áp dụng thay đổi.

#### Cách 1: Redeploy từ Vercel Dashboard (Khuyến nghị)

1. Vào tab **Deployments**
2. Tìm deployment mới nhất
3. Click vào menu **⋯** (3 chấm) bên cạnh deployment
4. Chọn **Redeploy**
5. Đợi deployment hoàn tất (2-5 phút)

#### Cách 2: Push code mới lên GitHub

Nếu project được kết nối với GitHub, chỉ cần push một commit mới:

```bash
git commit --allow-empty -m "Trigger redeploy for environment variables"
git push origin main
```

Vercel sẽ tự động deploy lại với environment variables mới.

### Bước 3: Kiểm tra

1. Sau khi redeploy xong, mở URL production của bạn
2. Mở browser console (F12)
3. Bạn **KHÔNG** nên thấy warning về Google Sheets Web App URL nữa
4. Thử gửi feedback từ app
5. Kiểm tra Google Sheet xem có dữ liệu mới không

## Troubleshooting

### Vẫn thấy warning sau khi redeploy

1. **Kiểm tra tên biến có đúng không:**
   - Phải là: `VITE_GOOGLE_SHEETS_WEB_APP_URL` (chính xác, không có typo)
   - Phải có prefix `VITE_` (Vite chỉ expose các biến bắt đầu với `VITE_`)

2. **Kiểm tra environment được chọn:**
   - Nếu bạn đang xem Preview deployment, đảm bảo biến được thêm cho **Preview**
   - Nếu bạn đang xem Production, đảm bảo biến được thêm cho **Production**

3. **Kiểm tra giá trị URL:**
   - URL phải đầy đủ, bắt đầu với `https://`
   - Không có khoảng trắng thừa
   - URL phải đúng với Google Apps Script Web App URL của bạn

4. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) hoặc `Cmd+Shift+R` (Mac)
   - Hoặc clear cache trong browser settings

5. **Kiểm tra Vercel Build Logs:**
   - Vào Vercel Dashboard > Deployments
   - Click vào deployment mới nhất
   - Xem **Build Logs** để đảm bảo build thành công
   - Kiểm tra xem có lỗi nào liên quan đến environment variables không

### Biến đã có nhưng vẫn không hoạt động

1. **Kiểm tra Vercel Build Logs:**
   - Environment variables chỉ được inject vào build process
   - Nếu build log không hiển thị biến, có thể có vấn đề với cấu hình

2. **Thử thêm biến lại:**
   - Xóa biến cũ
   - Thêm lại với giá trị mới
   - Redeploy

3. **Kiểm tra Vercel CLI (nếu dùng):**
   ```bash
   vercel env ls
   ```
   - Xem danh sách các biến môi trường
   - Đảm bảo `VITE_GOOGLE_SHEETS_WEB_APP_URL` có trong danh sách

## Lưu ý quan trọng

- ✅ Environment variables trên Vercel **KHÔNG** tự động sync với file `.env` local
- ✅ Phải thêm biến **THỦ CÔNG** trên Vercel Dashboard
- ✅ Sau khi thêm biến, **PHẢI** redeploy để áp dụng
- ✅ Vite chỉ expose các biến bắt đầu với `VITE_` prefix
- ✅ Biến được inject vào **build time**, không phải runtime

## Danh sách Environment Variables cần có trên Vercel

Để app hoạt động đầy đủ, bạn cần thêm các biến sau:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | `https://zuspekqswmubxlaeezgr.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
| `VITE_GOOGLE_SHEETS_WEB_APP_URL` | `https://script.google.com/macros/s/.../exec` | Production, Preview, Development |

## Tham khảo

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
