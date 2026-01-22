# Hướng dẫn Chạy Migration Script trên Supabase - Step by Step

## 📋 Tình huống hiện tại
Bảng table trong Supabase đang trống, cần tạo các tables cần thiết cho unified platform.

## 🎯 Mục tiêu
Tạo các tables sau:
- `users` - Bảng users thống nhất
- `user_mappings` - Mapping giữa 2 platforms
- `green_points` - Điểm Green Points
- `green_point_transactions` - Lịch sử giao dịch điểm

---

## 📝 CÁC BƯỚC THỰC HIỆN

### Bước 1: Mở SQL Editor trong Supabase

1. Vào **Supabase Dashboard**: https://supabase.com
2. Chọn project **VITA** của bạn
3. Click vào **SQL Editor** (icon code/terminal ở sidebar bên trái)
4. Click **New Query** (nút ở góc trên bên phải)

### Bước 2: Copy Migration Script

1. Mở file `supabase/migrations/001_unified_users_and_green_points.sql` trong editor của bạn
2. **Select All** (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)

### Bước 3: Paste vào SQL Editor

1. Quay lại Supabase SQL Editor
2. **Paste** (Ctrl+V / Cmd+V) toàn bộ nội dung vào editor

### Bước 4: Chạy Script

1. Click nút **Run** (màu xanh, ở góc trên bên phải)
   - Hoặc nhấn `Ctrl+Enter` (Windows/Linux)
   - Hoặc nhấn `Cmd+Enter` (Mac)

### Bước 5: Kiểm tra Kết quả

Bạn sẽ thấy message thành công:
```
Success. No rows returned
```

### Bước 6: Verify Tables đã được tạo

1. Click vào **Table Editor** (icon grid/table ở sidebar bên trái)
2. Kiểm tra các tables sau đã xuất hiện:
   - ✅ `users`
   - ✅ `user_mappings`
   - ✅ `green_points`
   - ✅ `green_point_transactions`

---

## 🔍 TROUBLESHOOTING

### Lỗi: "relation already exists"

**Nguyên nhân:** Table đã tồn tại từ trước

**Giải pháp:** 
- Script sử dụng `CREATE TABLE IF NOT EXISTS` nên sẽ không bị lỗi
- Nếu vẫn lỗi, có thể table đã tồn tại với structure khác
- Xóa table cũ và chạy lại script (cẩn thận với data)

### Lỗi: "permission denied"

**Nguyên nhân:** Không có quyền tạo tables

**Giải pháp:**
- Đảm bảo bạn đang dùng account có quyền admin
- Kiểm tra project settings

### Không thấy tables sau khi chạy

**Nguyên nhân:** 
- Script chạy nhưng có lỗi
- Chưa refresh Table Editor

**Giải pháp:**
1. Kiểm tra **SQL Editor** xem có error messages không
2. Refresh **Table Editor** (F5 hoặc reload page)
3. Kiểm tra **schema** dropdown - đảm bảo đang xem schema `public`

---

## ✅ CHECKLIST

Sau khi chạy migration, verify:

- [ ] Table `users` đã được tạo
- [ ] Table `user_mappings` đã được tạo
- [ ] Table `green_points` đã được tạo
- [ ] Table `green_point_transactions` đã được tạo
- [ ] Tất cả tables có column `platform_source` (trừ `user_mappings`)
- [ ] Không có error messages trong SQL Editor

---

## 📸 Screenshot Guide

### 1. SQL Editor Location
```
Sidebar → SQL Editor (icon code/terminal)
```

### 2. New Query Button
```
Top right corner → "New Query" button
```

### 3. Run Button
```
Top right corner → Green "Run" button
```

### 4. Table Editor Location
```
Sidebar → Table Editor (icon grid/table)
```

---

## 🎯 Next Steps

Sau khi tables đã được tạo:

1. **Enable Realtime:**
   - Database → Replication
   - Enable cho các tables: `users`, `user_mappings`, `green_points`, `green_point_transactions`

2. **Test Connection:**
   - Update environment variables trong Vercel
   - Test app để verify connection

3. **Migrate Data (nếu có):**
   - Export data từ nguyenmanhthuan project
   - Import vào VITA project

---

## 💡 Tips

- Luôn backup database trước khi chạy migration
- Test trên staging trước khi chạy production
- Kiểm tra logs trong SQL Editor nếu có lỗi
- Sử dụng `IF NOT EXISTS` để tránh conflicts
