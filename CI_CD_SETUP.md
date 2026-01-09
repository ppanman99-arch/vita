# Hướng dẫn Setup CI/CD với Vercel và Supabase

## Tổng quan

Tài liệu này hướng dẫn chi tiết cách thiết lập quy trình CI/CD tự động cho dự án VITA, cho phép tự động deploy frontend lên Vercel mỗi khi push code lên GitHub.

## Kiến trúc CI/CD

```
┌─────────────────────────────────────────┐
│  Developer                              │
│  - Code changes                         │
│  - Commit & Push to GitHub              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GitHub Repository                      │
│  - Push event triggered                 │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GitHub Actions Workflow                │
│  1. Quality Checks (lint, type-check)   │
│  2. Build frontend                      │
│  3. Deploy to Vercel                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Vercel                                  │
│  - Production/Preview deployment         │
│  - Environment variables từ Supabase     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Supabase (Backend)                     │
│  - Database                              │
│  - Authentication                       │
│  - Storage                              │
│  - Realtime                             │
└─────────────────────────────────────────┘
```

## Bước 1: Chuẩn bị Supabase Project

### 1.1. Tạo Supabase Project (nếu chưa có)

1. Truy cập [supabase.com](https://supabase.com) và đăng nhập
2. Tạo project mới:
   - Click "New Project"
   - Đặt tên project (ví dụ: `vita-coop`)
   - Chọn organization
   - Đặt database password (lưu lại)
   - **Chọn region: Southeast Asia - Singapore**
   - Click "Create new project"
3. Đợi project được tạo (2-3 phút)

### 1.2. Lấy Supabase Credentials

1. Vào **Settings > API** trong Supabase Dashboard
2. Copy các giá trị sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Bắt đầu với `eyJ...`
   - **service_role key**: (Chỉ dùng server-side, KHÔNG expose ra client)

## Bước 2: Setup Vercel Project

### Option A: Vercel GitHub Integration (Khuyến nghị - Đơn giản nhất)

#### 2.1. Kết nối GitHub với Vercel

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Chọn GitHub và authorize Vercel
5. Chọn repository `vita` của bạn
6. Click **"Import"**

#### 2.2. Cấu hình Build Settings

Vercel sẽ tự động detect Vite, nhưng bạn có thể kiểm tra:

- **Framework Preset**: Vite
- **Root Directory**: `./` (hoặc để trống)
- **Build Command**: `npm run build` (tự động detect)
- **Output Directory**: `out` (từ `vercel.json`)
- **Install Command**: `npm install` (tự động detect)

#### 2.3. Cấu hình Environment Variables

1. Trong Vercel project settings, vào **Settings > Environment Variables**
2. Thêm các biến sau:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` | Production, Preview, Development |
| `VITE_GEMINI_API_KEY` | `your-gemini-api-key` | Production, Preview (Optional) |
| `VITE_IMAGEN_API_KEY` | `your-imagen-api-key` | Production, Preview (Optional) |

3. Chọn tất cả environments: ✅ Production, ✅ Preview, ✅ Development
4. Click **"Save"**

#### 2.4. Deploy lần đầu

1. Click **"Deploy"**
2. Vercel sẽ tự động:
   - Install dependencies
   - Build frontend
   - Deploy lên production
3. Sau khi deploy xong, bạn sẽ có URL: `https://your-project.vercel.app`

### Option B: GitHub Actions + Vercel CLI (Linh hoạt hơn)

Nếu bạn muốn sử dụng GitHub Actions workflow đã được tạo (`.github/workflows/deploy.yml`):

#### 2.1. Lấy Vercel Credentials

1. Truy cập [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Tạo token mới: Click **"Create Token"**
3. Đặt tên: `github-actions-deploy`
4. Copy token (chỉ hiện một lần)

5. Lấy Project ID và Org ID:
   - Vào project trên Vercel Dashboard
   - Vào **Settings > General**
   - Copy **Project ID**
   - Copy **Team ID** (Organization ID)

#### 2.2. Thêm GitHub Secrets

1. Vào GitHub repository: **Settings > Secrets and variables > Actions**
2. Click **"New repository secret"**
3. Thêm các secrets sau:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Token từ bước 2.1 |
| `VERCEL_ORG_ID` | Team ID từ Vercel |
| `VERCEL_PROJECT_ID` | Project ID từ Vercel |
| `VITE_SUPABASE_URL` | Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_GEMINI_API_KEY` | (Optional) Gemini API key |
| `VITE_IMAGEN_API_KEY` | (Optional) Imagen API key |

#### 2.3. Workflow sẽ tự động chạy

Khi bạn push code lên `main` hoặc tạo Pull Request, GitHub Actions sẽ:
1. Chạy lint và type-check
2. Build frontend
3. Deploy lên Vercel

## Bước 3: Cấu hình Supabase cho Production Domain

### 3.1. Cập nhật Redirect URLs trong Supabase

1. Vào Supabase Dashboard > **Settings > Authentication**
2. Vào tab **"URL Configuration"**
3. Cập nhật các URL sau:

**Site URL:**
```
https://your-project.vercel.app
```

**Redirect URLs** (thêm từng dòng):
```
https://your-project.vercel.app/**
https://your-project.vercel.app/auth/callback
http://localhost:3000/**
http://localhost:3000/auth/callback
```

4. Click **"Save"**

### 3.2. (Optional) Cấu hình Custom Domain

Nếu bạn có custom domain:

1. Trong Vercel Dashboard, vào **Settings > Domains**
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn của Vercel
4. Cập nhật lại Redirect URLs trong Supabase với domain mới

## Bước 4: Kiểm tra CI/CD hoạt động

### 4.1. Test Production Deployment

1. Tạo một thay đổi nhỏ trong code
2. Commit và push lên `main` branch:
   ```bash
   git add .
   git commit -m "test: CI/CD deployment"
   git push origin main
   ```
3. Kiểm tra:
   - **GitHub Actions**: Vào tab **Actions** trong GitHub repo, xem workflow chạy
   - **Vercel Dashboard**: Vào **Deployments**, xem deployment mới
   - **Website**: Truy cập URL Vercel, kiểm tra thay đổi đã được deploy

### 4.2. Test Preview Deployment

1. Tạo một branch mới:
   ```bash
   git checkout -b feature/test-preview
   ```
2. Tạo thay đổi và push:
   ```bash
   git add .
   git commit -m "test: preview deployment"
   git push origin feature/test-preview
   ```
3. Tạo Pull Request trên GitHub
4. Kiểm tra:
   - Vercel sẽ tự động tạo preview deployment
   - Bạn sẽ thấy comment trong PR với preview URL
   - Preview URL sẽ có format: `https://your-project-git-branch-name.vercel.app`

## Quy trình làm việc hàng ngày

### Development Workflow

```
1. Tạo feature branch
   git checkout -b feature/new-feature

2. Code và test local
   npm run dev

3. Commit và push
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature

4. Tạo Pull Request
   → Vercel tự động tạo preview deployment
   → Review code và preview

5. Merge vào main
   → Vercel tự động deploy production
   → Website tự động cập nhật
```

## Troubleshooting

### Lỗi: "Supabase environment variables are not set"

**Nguyên nhân**: Environment variables chưa được set trong Vercel

**Giải pháp**:
1. Vào Vercel Dashboard > Settings > Environment Variables
2. Kiểm tra các biến đã được thêm chưa
3. Đảm bảo đã chọn đúng environment (Production/Preview)
4. Redeploy project sau khi thêm/sửa biến

### Lỗi: "Build failed" trên Vercel

**Nguyên nhân**: Có thể do lỗi trong code hoặc dependencies

**Giải pháp**:
1. Xem build logs trong Vercel Dashboard
2. Test build local: `npm run build`
3. Kiểm tra lỗi lint: `npm run lint`
4. Kiểm tra type errors: `npm run type-check`

### Lỗi: "CORS error" khi gọi Supabase API

**Nguyên nhân**: Supabase chưa được cấu hình để cho phép domain Vercel

**Giải pháp**:
1. Vào Supabase Dashboard > Settings > Authentication
2. Kiểm tra Redirect URLs đã bao gồm domain Vercel chưa
3. Thêm: `https://your-project.vercel.app/**`

### Lỗi: GitHub Actions workflow failed

**Nguyên nhân**: Có thể do missing secrets hoặc lỗi trong workflow

**Giải pháp**:
1. Kiểm tra GitHub Secrets đã được thêm đầy đủ chưa
2. Xem logs trong GitHub Actions tab
3. Kiểm tra Vercel credentials có đúng không

### Preview deployment không hoạt động

**Nguyên nhân**: Có thể do environment variables chưa được set cho Preview

**Giải pháp**:
1. Vào Vercel Dashboard > Settings > Environment Variables
2. Đảm bảo các biến đã được chọn cho **Preview** environment
3. Redeploy preview deployment

## Environment Variables Reference

### Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard > Settings > API |

### Optional Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `VITE_GEMINI_API_KEY` | Gemini API key for prompts | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `VITE_IMAGEN_API_KEY` | Imagen API key for image generation | [Google AI Studio](https://aistudio.google.com/app/apikey) |

## Best Practices

### 1. Branch Strategy

- **main/master**: Production deployment
- **feature branches**: Preview deployment (tự động cho PR)
- **hotfix branches**: Preview deployment

### 2. Environment Variables

- ✅ **KHÔNG** commit `.env.local` vào git
- ✅ Sử dụng `.env.example` làm template
- ✅ Set environment variables trong Vercel Dashboard
- ✅ Sử dụng GitHub Secrets cho sensitive data

### 3. Testing

- ✅ Test build local trước khi push: `npm run build`
- ✅ Test lint và type-check: `npm run lint && npm run type-check`
- ✅ Review preview deployment trước khi merge

### 4. Security

- ⚠️ **KHÔNG BAO GIỜ** commit API keys vào code
- ⚠️ **KHÔNG BAO GIỜ** expose Service Role Key ra client-side
- ✅ Chỉ sử dụng Anon Key ở client-side
- ✅ Sử dụng Row Level Security (RLS) trong Supabase

## Tài liệu tham khảo

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Build logs trong Vercel Dashboard
2. GitHub Actions logs
3. Browser console (F12)
4. Supabase Dashboard logs
