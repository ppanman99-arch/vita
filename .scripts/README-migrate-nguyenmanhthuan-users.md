# Migration users cổng nguyenmanhthuan vào VITA

Script chuyển toàn bộ user từ cổng nguyenmanhthuan vào Supabase Auth và bảng `users` thống nhất của dự án VITA.

## Yêu cầu

- Node.js (chạy script `.mjs`)
- Biến môi trường:
  - `SUPABASE_URL` hoặc `VITE_SUPABASE_URL` – URL project Supabase VITA
  - `SUPABASE_SERVICE_ROLE_KEY` – Service role key (chỉ dùng server/script, **không** đưa lên client)

## Chuẩn bị file user

Tạo file JSON mảng user, mỗi phần tử:

- `email` (bắt buộc): email đăng nhập
- `password` (tùy chọn): mật khẩu. Nếu không có, user cần dùng "Quên mật khẩu" để đặt mật khẩu lần đầu.

Ví dụ `nguyenmanhthuan-users-import.json`:

```json
[
  { "email": "user1@example.com", "password": "TempPassword1!" },
  { "email": "user2@example.com" }
]
```

**Lưu ý:** Không commit file chứa mật khẩu thật. Thêm `*-import.json` vào `.gitignore` nếu cần.

## Chạy script

```bash
# Từ thư mục gốc dự án
export SUPABASE_URL="https://xxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJ..."

node .scripts/migrate-nguyenmanhthuan-users.mjs .scripts/nguyenmanhthuan-users-import.json
```

Nếu không truyền đường dẫn file, script mặc định dùng `.scripts/nguyenmanhthuan-users-import.json`.

## Kết quả

- Mỗi email: tạo user trong **Supabase Auth** (nếu chưa có) và một bản ghi trong bảng **public.users** với `platform_source = 'nguyenmanhthuan'`, `external_id` = ID user Auth.
- User đăng nhập bằng email/password (hoặc dùng "Quên mật khẩu" nếu không nhập password trong file).
- Cùng session Supabase dùng cho tất cả portal (nguyenmanhthuan, member-hub, esg-portal, …).

## Nếu user đã tồn tại

- Auth: script bỏ qua và ghi log "User already exists (auth)".
- public.users: nếu đã có bản ghi (trùng email/external_id), script báo lỗi trùng hoặc bỏ qua tùy logic.

## Tham chiếu

- Kế hoạch go-live: [.architecture/GO_LIVE_PLAN.md](../.architecture/GO_LIVE_PLAN.md) mục 9.
- Migration DB: [supabase/migrations/001_unified_users_and_green_points.sql](../supabase/migrations/001_unified_users_and_green_points.sql).
