# Hướng dẫn Triển khai VITA COOP lên Cloudflare Pages

## Tổng quan
Tài liệu này hướng dẫn chi tiết cách triển khai dự án VITA COOP lên Cloudflare Pages (miễn phí) với Supabase backend (Singapore region), Supabase Storage, và Cloudflare CDN tự động.

## Kiến trúc Hệ thống

```
Frontend: Cloudflare Pages (miễn phí)
Backend: Supabase Cloud (Singapore region)
Storage: Supabase Storage
CDN: Cloudflare (tự động với Pages)
```

## Bước 1: Thiết lập Supabase Project

1. Truy cập [supabase.com](https://supabase.com) và đăng nhập/đăng ký tài khoản
2. Tạo project mới:
   - Click "New Project"
   - Đặt tên project (ví dụ: `vita-coop`)
   - Chọn organization
   - Đặt database password (lưu lại password này)
   - **Chọn region: Southeast Asia - Singapore** (theo yêu cầu)
   - Click "Create new project"
3. Đợi project được tạo (khoảng 2-3 phút)
4. Lấy thông tin credentials:
   - Vào Settings > API
   - Copy các giá trị sau:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: Bắt đầu với `eyJ...`
     - **service_role key**: (Chỉ dùng server-side, không commit vào code)

## Bước 2: Cấu hình Environment Variables

### Local Development

1. Tạo file `.env.local` trong thư mục gốc của project:
```bash
cp .env.example .env.local
```

2. Cập nhật các giá trị trong `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Production (Cloudflare Pages)

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vào **Workers & Pages** > **Pages**
3. Chọn project của bạn (hoặc tạo project mới - xem Bước 3)
4. Vào **Settings** > **Environment Variables**
5. Thêm các biến sau:
   - `VITE_SUPABASE_URL` = URL từ Supabase (ví dụ: `https://xxxxx.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY` = Anon key từ Supabase
6. Chọn environment:
   - ✅ **Production** - Cho production deployments
   - ✅ **Preview** - Cho preview deployments (pull requests)
   - ✅ **Branch** - Cho các branch cụ thể (optional)
7. Click **Save**

**Lưu ý**: Sau khi thêm environment variables, Cloudflare Pages sẽ tự động rebuild và deploy lại.

## Bước 3: Deploy lên Cloudflare Pages

### Cách 1: Deploy qua GitHub (Khuyến nghị)

1. **Đảm bảo code đã được push lên GitHub repository**
   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages deployment"
   git push origin main
   ```

2. **Truy cập Cloudflare Dashboard**
   - Đăng nhập vào [dash.cloudflare.com](https://dash.cloudflare.com)
   - Vào **Workers & Pages** > **Pages**
   - Click **Create a project**

3. **Kết nối GitHub Repository**
   - Click **Connect to Git**
   - Chọn GitHub và authorize Cloudflare
   - Chọn repository của bạn (`vita`)

4. **Cấu hình Build Settings**
   - **Project name**: `vita-coop` (hoặc tên bạn muốn)
   - **Production branch**: `main` (hoặc `master`)
   - **Framework preset**: `Vite` (Cloudflare sẽ tự động detect)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (để trống nếu project ở root)

5. **Thêm Environment Variables** (như Bước 2)

6. **Click "Save and Deploy"**
   - Cloudflare sẽ tự động build và deploy
   - Đợi deployment hoàn tất (khoảng 2-5 phút)

7. **Lấy URL deployment**
   - Sau khi deploy xong, bạn sẽ có URL: `https://your-project.pages.dev`
   - URL này sẽ được tự động cập nhật mỗi khi push code mới

### Cách 2: Deploy qua Wrangler CLI

1. **Cài đặt Wrangler CLI**:
```bash
npm install -g wrangler
```

2. **Đăng nhập**:
```bash
wrangler login
```

3. **Deploy**:
```bash
npm run build
wrangler pages deploy out --project-name=vita-coop
```

## Bước 4: Cấu hình Custom Domain

1. **Trên Cloudflare Pages Dashboard**
   - Vào project của bạn
   - Vào tab **Custom domains**
   - Click **Set up a custom domain**

2. **Thêm domain**
   - Nhập domain của bạn (ví dụ: `vitacoop.com` hoặc `www.vitacoop.com`)
   - Cloudflare sẽ tự động cấu hình DNS nếu domain đã được quản lý bởi Cloudflare
   - Nếu domain không ở Cloudflare, bạn sẽ nhận được DNS records cần thêm:
     - **CNAME**: `your-project.pages.dev` hoặc
     - **A record**: IP address của Cloudflare Pages

3. **Cấu hình DNS** (nếu domain không ở Cloudflare)
   - Đăng nhập vào nhà cung cấp domain của bạn
   - Vào DNS Management
   - Thêm CNAME record:
     - **Name**: `@` hoặc `www`
     - **Value**: `your-project.pages.dev`
   - Hoặc thêm A record theo hướng dẫn của Cloudflare

4. **Đợi DNS propagation**
   - Có thể mất 1-24 giờ, thường là vài phút đến vài giờ
   - Cloudflare sẽ tự động cấp SSL certificate qua Let's Encrypt

## Bước 5: Cấu hình Supabase cho Production Domain

1. **Vào Supabase Dashboard** > Project Settings > Authentication
2. **Vào tab "URL Configuration"**
3. **Cập nhật các URL sau**:
   - **Site URL**: `https://your-project.pages.dev` (hoặc custom domain)
   - **Redirect URLs**: Thêm các URL sau:
     - `https://your-project.pages.dev/**`
     - `https://your-project.pages.dev/auth/callback`
     - `https://yourdomain.com/**` (nếu có custom domain)
     - `https://yourdomain.com/auth/callback` (nếu có custom domain)
     - `http://localhost:3000/**` (cho development)
4. **Click "Save"**

## Bước 6: Kiểm tra và Testing

1. **Truy cập domain của bạn**
   - Kiểm tra trang chủ load được
   - Test navigation và routing

2. **Kiểm tra các tính năng chính**:
   - [ ] Trang chủ load được
   - [ ] Navigation hoạt động đúng
   - [ ] Client-side routing hoạt động (SPA routing)
   - [ ] Login/Register forms hiển thị
   - [ ] Không có lỗi trong browser console
   - [ ] Supabase connection hoạt động (nếu đã tích hợp auth)
   - [ ] File uploads hoạt động với Supabase Storage

3. **Kiểm tra trên mobile devices**
4. **Test các routes chính** (theo `src/router/config.tsx`)

## Cấu hình Build

### Build Settings trong Cloudflare Pages

- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js version**: Auto-detect (Cloudflare sẽ tự động chọn phiên bản phù hợp)
- **Framework**: Vite (tự động detect)

### File `_redirects`

File `public/_redirects` đã được tạo để xử lý SPA routing:
```
/* /index.html 200
```

File này đảm bảo tất cả routes được redirect về `index.html` để React Router có thể xử lý client-side routing.

## Troubleshooting

### Lỗi: "Supabase environment variables are not set"
- Kiểm tra `.env.local` đã được tạo và có đúng giá trị (cho local dev)
- Đảm bảo các biến đã được thêm vào Cloudflare Pages Environment Variables
- Redeploy project sau khi thêm environment variables
- Kiểm tra tên biến phải chính xác: `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`

### Lỗi: "CORS error" khi gọi Supabase API
- Kiểm tra Redirect URLs trong Supabase đã bao gồm domain Cloudflare Pages
- Đảm bảo Site URL trong Supabase đúng với domain production
- Format: `https://your-project.pages.dev/**`

### Domain không hoạt động
- Kiểm tra DNS records đã được cấu hình đúng
- Đợi DNS propagation (có thể mất đến 48 giờ)
- Kiểm tra SSL certificate đã được cấp (trong Cloudflare Pages Dashboard > Custom domains)

### Build failed trên Cloudflare Pages
- Kiểm tra logs trong Cloudflare Pages Dashboard > Deployments
- Đảm bảo `package.json` có đúng dependencies
- Kiểm tra build command và output directory đúng
- Kiểm tra Node.js version compatibility

### SPA Routing không hoạt động
- Đảm bảo file `public/_redirects` đã được commit và có nội dung: `/* /index.html 200`
- Kiểm tra file được copy vào output directory sau khi build
- Xem logs trong Cloudflare Pages để đảm bảo file được deploy đúng

### Environment Variables không được áp dụng
- Đảm bảo đã chọn đúng environment (Production/Preview)
- Sau khi thêm/sửa environment variables, Cloudflare sẽ tự động rebuild
- Nếu không tự động rebuild, vào Deployments và click "Retry deployment"

## Cấu trúc Files

- `public/_redirects` - SPA routing configuration cho Cloudflare Pages
- `vite.config.ts` - Vite build configuration (output: `out`)
- `package.json` - Build scripts và dependencies
- `.env.local` - Local environment variables (không commit)
- `.gitignore` - Đảm bảo các file nhạy cảm không được commit

## Sử dụng Supabase trong Code

### Import Supabase client:
```typescript
import { supabase } from '@/lib/supabase';
```

### Sử dụng Auth context:
```typescript
import { useSupabase } from '@/lib/supabaseContext';

function MyComponent() {
  const { user, session, loading, signOut } = useSupabase();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Welcome {user.email}</div>;
}
```

### Ví dụ đăng nhập:
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

## Ưu điểm của Cloudflare Pages

- ✅ **Miễn phí**: Không giới hạn bandwidth và requests
- ✅ **CDN tự động**: Global CDN với 200+ edge locations
- ✅ **SSL tự động**: SSL certificate tự động cho tất cả domains
- ✅ **Preview deployments**: Tự động tạo preview cho mỗi pull request
- ✅ **Git integration**: Tự động deploy khi push code
- ✅ **Fast builds**: Build nhanh với infrastructure mạnh mẽ
- ✅ **Environment variables**: Quản lý dễ dàng cho Production/Preview

## Tài liệu tham khảo

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)



