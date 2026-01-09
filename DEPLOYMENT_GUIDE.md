# Hướng dẫn Triển khai VITA COOP lên Production

## Tổng quan
Tài liệu này hướng dẫn chi tiết cách triển khai dự án VITA COOP lên Vercel với Supabase backend và gắn tên miền tùy chỉnh.

## Bước 1: Thiết lập Supabase Project

1. Truy cập [supabase.com](https://supabase.com) và đăng nhập/đăng ký tài khoản
2. Tạo project mới:
   - Click "New Project"
   - Đặt tên project (ví dụ: `vita-coop`)
   - Chọn organization
   - Đặt database password (lưu lại password này)
   - Chọn region gần nhất (ví dụ: Southeast Asia - Singapore)
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

### Production (Vercel)

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào Settings > Environment Variables
4. Thêm các biến sau:
   - `VITE_SUPABASE_URL` = URL từ Supabase
   - `VITE_SUPABASE_ANON_KEY` = Anon key từ Supabase
5. Chọn environment: Production, Preview, Development
6. Click "Save"

## Bước 3: Deploy lên Vercel

### Cách 1: Deploy qua GitHub (Khuyến nghị)

1. Đảm bảo code đã được push lên GitHub repository
2. Truy cập [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import GitHub repository của bạn
5. Cấu hình project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (hoặc để mặc định)
   - **Build Command**: `npm run build` (tự động detect)
   - **Output Directory**: `out` (tự động detect)
   - **Install Command**: `npm install` (tự động detect)
6. Thêm Environment Variables (như bước 2)
7. Click "Deploy"
8. Đợi deployment hoàn tất (khoảng 2-5 phút)

### Cách 2: Deploy qua Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Đăng nhập:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow prompts để cấu hình
5. Deploy production:
```bash
vercel --prod
```

## Bước 4: Cấu hình Custom Domain

1. Trên Vercel Dashboard, vào project của bạn
2. Vào Settings > Domains
3. Thêm domain của bạn (ví dụ: `vitacoop.com` hoặc `www.vitacoop.com`)
4. Vercel sẽ hiển thị các DNS records cần cấu hình:
   - **Option 1**: Thêm A record trỏ đến IP của Vercel
   - **Option 2**: Thêm CNAME record trỏ đến `cname.vercel-dns.com`
5. Cấu hình DNS trên nhà cung cấp domain của bạn:
   - Đăng nhập vào nhà cung cấp domain (GoDaddy, Namecheap, v.v.)
   - Vào DNS Management
   - Thêm record theo hướng dẫn của Vercel
6. Đợi DNS propagation (có thể mất 1-24 giờ, thường là vài phút)
7. Vercel sẽ tự động cấp SSL certificate qua Let's Encrypt

## Bước 5: Cấu hình Supabase cho Production Domain

1. Vào Supabase Dashboard > Project Settings > Authentication
2. Vào tab "URL Configuration"
3. Cập nhật các URL sau:
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**: Thêm các URL sau:
     - `https://yourdomain.com/**`
     - `https://yourdomain.com/auth/callback`
     - `http://localhost:3000/**` (cho development)
4. Click "Save"

## Bước 6: Kiểm tra và Testing

1. Truy cập domain của bạn
2. Kiểm tra các tính năng chính:
   - [ ] Trang chủ load được
   - [ ] Navigation hoạt động
   - [ ] Login/Register forms hiển thị
   - [ ] Không có lỗi trong browser console
   - [ ] Supabase connection hoạt động (nếu đã tích hợp auth)
3. Kiểm tra trên mobile devices
4. Test các routes chính

## Troubleshooting

### Lỗi: "Supabase environment variables are not set"
- Kiểm tra `.env.local` đã được tạo và có đúng giá trị
- Đảm bảo các biến đã được thêm vào Vercel Environment Variables
- Redeploy project sau khi thêm environment variables

### Lỗi: "CORS error" khi gọi Supabase API
- Kiểm tra Redirect URLs trong Supabase đã bao gồm domain production
- Đảm bảo Site URL trong Supabase đúng với domain production

### Domain không hoạt động
- Kiểm tra DNS records đã được cấu hình đúng
- Đợi DNS propagation (có thể mất đến 48 giờ)
- Kiểm tra SSL certificate đã được cấp (trong Vercel Dashboard > Domains)

### Build failed trên Vercel
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo `package.json` có đúng dependencies
- Kiểm tra build command và output directory

## Cấu trúc Files đã được tạo

- `src/lib/supabase.ts` - Supabase client initialization
- `src/lib/supabaseContext.tsx` - Supabase Auth context/provider
- `.env.example` - Template cho environment variables
- `.gitignore` - Đảm bảo các file nhạy cảm không được commit
- `vercel.json` - Cấu hình Vercel deployment

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

## Tài liệu tham khảo

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

