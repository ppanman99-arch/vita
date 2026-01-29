# Go-Live Checklist

Tài liệu chuẩn bị triển khai (go-live) cho các tính năng **Live** (Phase 01–12). Tính năng **Demo** vẫn truy cập được, chỉ khác badge "Demo" và không yêu cầu database thật.

---

## 1. Danh sách route / feature Live vs Demo

| Phase | Mô tả | Routes / Entry | Live / Demo |
|-------|--------|----------------|-------------|
| 01 | Nền tảng, Login | `/`, `/login`, `/home` | Live |
| 02–03 | nguyenmanhthuan | `/nguyen-manh-thuan`, `/nguyen-manh-thuan/dashboard`, `/cart`, `/checkout`, `/orders`, `/users` | Live (sau migration user + SSO; xem GO_LIVE_PLAN mục 9) |
| 04–06 | Cổng HTX | `/cooperative/register-account`, `/cooperative/login`, `/cooperative/dashboard`, `/cooperative/profile`, `/cooperative/members`, `/cooperative/contracts`, `/cooperative/portal`, `/cooperative/projects`; `/cooperative/landing/:coopId?`; `/htx-benefits`. Phê duyệt đơn VITA: `/admin-dashboard/vita-applications` | Live |
| 07 | Member Hub, Role Switcher | `/member-hub`, `/member-hub/notifications` | Live |
| 08 | Member – Góp vốn | `/member-hub/capital`, `/member-hub/capital/opportunities`, `/member-hub/capital/portfolio`, `/member-hub/capital/dividends`, `/member-hub/capital/transactions` | Live |
| 09 | Member – Tiêu dùng | `/member-hub/consumer`, `/member-hub/consumer/catalog`, `/member-hub/consumer/history`, `/member-hub/consumer/vouchers`, `/member-hub/consumer/rewards` | **Demo**, ẩn khi `VITE_SHOW_DEMO_FEATURES=false` |
| 10–11 | ESG Doanh nghiệp | `/esg-portal`, `/esg-portal/login`, `/esg-portal/dashboard`, `/esg-portal/projects`, `/esg-portal/projects/:id`, `/esg-portal/carbon-report`, `/esg-portal/marketplace`, `/esg-portal/certifications` | Live |
| 12 | ESG Cá nhân | `/esg-individual`, `/esg-individual/carbon`, `/esg-individual/portfolio`, `/esg-individual/impact`, `/esg-individual/learning`, `/esg-individual/challenges`, `/esg-individual/community`, `/esg-individual/opportunities` | Live |

Nguồn sự thật: `src/config/goLiveRoutes.ts` (`isLiveRoute`, `getBadgeVariantForPath`, `isDemoOnlyRoute` / danh sách path con Demo).

**Ẩn tính năng Demo:** `VITE_SHOW_DEMO_FEATURES=true|false` (mặc định `true`). Khi `false`: ẩn route và menu tương ứng Phase 09 và các tính năng Demo khác; xem mục 6 bên dưới.

---

## 2. Các bước triển khai

### 2.1 Biến môi trường

- Copy `.env.example` → `.env` (local) hoặc cấu hình env tại nền tảng deploy (Vercel, v.v.).
- **Bắt buộc cho Live:**
  - `VITE_SUPABASE_URL` – Supabase Project URL
  - `VITE_SUPABASE_ANON_KEY` – Supabase anon/public key
- **Tùy chọn:** `VITE_USE_REAL_AUTH=true` khi bật đăng nhập thật (AuthService + Supabase). Nếu không đặt, login dùng flow demo.
- **Ẩn tính năng Demo:** `VITE_SHOW_DEMO_FEATURES=true|false` (mặc định `true`). Khi `false`, ẩn route và menu thuộc Demo (vd. Phase 09 – Tiêu dùng, và các path trong `DEMO_ONLY_PREFIXES` trong `goLiveRoutes.ts`). Redirect về `/home` khi truy cập path Demo. Xem mục 6.
- Không commit file chứa secret thật; chỉ commit `.env.example`.

### 2.2 Build

```bash
npm install
npm run build
```

Đảm bảo build thành công. Script deploy (nếu có) dùng output build và env production.

### 2.3 Deploy

- Deploy thư mục build output (thường `dist/`) lên hosting đã cấu hình.
- Đặt `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` (và nếu dùng `VITE_USE_REAL_AUTH`) trong Environment Variables của nền tảng deploy.

---

## 3. Auth và Login

- Trang login (`src/pages/login/page.tsx`) hiện dùng **flow demo** (số ĐT `1`, user/pass `1`), chưa nối đầy đủ AuthService + Supabase.
- **Go-live với đăng nhập thật:**
  - Nối trang login với AuthService + Supabase Auth.
  - (Tuỳ chọn) Dùng `VITE_USE_REAL_AUTH=true` để chọn flow real vs demo.
  - Không lộ session, API key hay secret ở client.

---

## 4. Cơ sở dữ liệu (Supabase)

- Schema và migrations phải khớp với [phase-03/DATABASE_SETUP_GUIDE.md](migration-phases/phase-03/DATABASE_SETUP_GUIDE.md) và các phase khác có dùng DB.
- **Checklist ngắn:**
  - Bảng / user cho **auth** (Supabase Auth hoặc tương đương).
  - **Green Points**, **orders** (nguyenmanhthuan), **cooperative**, **member**, **ESG** theo các phase tương ứng.
  - **Cổng nguyenmanhthuan (Go-Live):** Migration toàn bộ user từ cổng nguyenmanhthuan vào DB user thống nhất (bảng `users`, Supabase Auth); đăng nhập và lấy lại mật khẩu tại cổng nguyenmanhthuan hoạt động trơn tru; một tài khoản đăng nhập được vào tất cả portal (xem [GO_LIVE_PLAN.md](GO_LIVE_PLAN.md) mục 9).
  - RLS (Row Level Security) nếu dùng Supabase.

---

## 5. Hành vi production

- Ở môi trường production: không hiển thị stack trace / lỗi chi tiết cho end-user.
- Có thể dùng `import.meta.env.PROD` / `import.meta.env.MODE` để ẩn log debug chỉ ở production.

---

## 6. Ẩn tính năng Demo (toggle)

- **Biến:** `VITE_SHOW_DEMO_FEATURES=true|false` (mặc định `true`).
- **Khi `false`:** Router không đăng ký route Demo (vd. `/member-hub/consumer*`); sidebar/menu ẩn mục tương ứng; có thể redirect hoặc 404 cho path Demo.
- **Path con Demo:** Trong `goLiveRoutes` cần danh sách path/prefix Demo (vd. `/member-hub/consumer`, `/member-hub/consumer/*`) và `isDemoOnlyRoute` (hoặc tương đương) để menu/sidebar ẩn đúng.
- Tính năng **Demo** khi bật vẫn truy cập được; badge "Demo" cho biết không yêu cầu database thật. Khi tắt Demo, route và link tới chúng được ẩn.

---

## 7. Cổng nguyenmanhthuan – Go-Live (Migration user & SSO)

- **Mục tiêu:** Chuyển toàn bộ dữ liệu user của cổng nguyenmanhthuan vào database user thống nhất của dự án; đảm bảo đăng nhập và lấy lại mật khẩu tại cổng nguyenmanhthuan hoạt động trơn tru; tài khoản đăng nhập được vào tất cả các portal.
- **Chi tiết:** Xem [GO_LIVE_PLAN.md](GO_LIVE_PLAN.md) mục 9 (Migration dữ liệu user, đăng nhập/lấy lại mật khẩu, SSO toàn portal).
- **DB:** Dùng bảng `users` và Supabase Auth thống nhất; migration [001_unified_users_and_green_points.sql](../supabase/migrations/001_unified_users_and_green_points.sql).
