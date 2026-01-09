# Hướng dẫn nhanh: Thêm Supabase Environment Variables vào Vercel

## ⚠️ Lưu ý quan trọng

Dự án này sử dụng **Vite + React Web App**, không phải:
- ❌ Next.js (dùng `NEXT_PUBLIC_`)
- ❌ Expo/React Native (dùng `EXPO_PUBLIC_`)

Do đó cần dùng prefix `VITE_` để Vite có thể expose biến này ra client-side.

## Environment Variables cần thêm vào Vercel

Vào **Vercel Dashboard > Settings > Environment Variables** và thêm:

### 1. Supabase URL
```
Key: VITE_SUPABASE_URL
Value: https://xaipdrumeejoikeidysi.supabase.co
Environment: ✅ Production, ✅ Preview, ✅ Development
```

### 2. Supabase Anon Key
```
Key: VITE_SUPABASE_ANON_KEY
Value: sb_publishable_SQpIUgj4cy4F9Ax8w9DDVw_10B9sGl_
Environment: ✅ Production, ✅ Preview, ✅ Development
```

## Sau khi thêm

1. Click **"Save"**
2. Vào tab **"Deployments"**
3. Click **"..."** trên deployment mới nhất
4. Click **"Redeploy"** để áp dụng environment variables mới

## Kiểm tra

Sau khi redeploy, truy cập website và kiểm tra:
- Browser console (F12) không có warning về "Supabase environment variables are not set"
- Website kết nối được với Supabase

## Sự khác biệt giữa các Framework

| Framework | Prefix | Key Name Example |
|-----------|--------|-----------------|
| Next.js | `NEXT_PUBLIC_` | `NEXT_PUBLIC_SUPABASE_URL` |
| Expo/React Native | `EXPO_PUBLIC_` | `EXPO_PUBLIC_SUPABASE_URL` |
| **Vite (dự án này)** | **`VITE_`** | **`VITE_SUPABASE_URL`** |

Dự án này dùng **Vite**, nên phải dùng `VITE_` prefix.

## Mapping từ các format khác

Nếu bạn có credentials từ format khác, chuyển đổi như sau:

### Từ Next.js format:
```
NEXT_PUBLIC_SUPABASE_URL → VITE_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY → VITE_SUPABASE_ANON_KEY
```

### Từ Expo format:
```
EXPO_PUBLIC_SUPABASE_URL → VITE_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_KEY → VITE_SUPABASE_ANON_KEY
```
