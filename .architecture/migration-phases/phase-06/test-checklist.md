# PHASE 06: TEST CHECKLIST - CỔNG HTX QUẢN LÝ XÃ VIÊN

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 30-35 phút  
**Điều kiện tiên quyết:** Phase 05 đã hoàn thành

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 06 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Đã đăng nhập bằng tài khoản HTX
- [ ] Có sẵn thông tin xã viên test (email, tên...)

---

## 🧪 TEST CASE 1: XEM DANH SÁCH XÃ VIÊN

**Mục tiêu:** Kiểm tra trang quản lý xã viên hiển thị đúng.

### Bước thực hiện:
1. Vào menu "Quản lý Xã viên" hoặc truy cập `/cooperative/members`
2. Quan sát

### Kết quả mong đợi:
- [ ] Bảng danh sách xã viên hiển thị với các cột:
  - [ ] Họ tên
  - [ ] Email/Số điện thoại
  - [ ] Vai trò (Nông dân/Góp vốn/Tiêu dùng)
  - [ ] Trạng thái (Hoạt động/Chờ duyệt/Khóa)
  - [ ] Ngày tham gia
  - [ ] Actions (Sửa/Xóa)
- [ ] Có phân trang nếu danh sách dài
- [ ] Có nút "Thêm xã viên" hoặc "+"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: THÊM MỚI/DUYỆT XÃ VIÊN

**Mục tiêu:** Kiểm tra thêm xã viên mới hoạt động.

### Bước thực hiện:
1. Click "Thêm xã viên" hoặc "Duyệt yêu cầu"
2. Quan sát form

### Kết quả mong đợi (Form):
- [ ] Form hiển thị:
  - [ ] Ô tìm kiếm user (Email/SĐT)
  - [ ] Dropdown chọn Vai trò
  - [ ] Nút "Thêm" hoặc "Gửi lời mời"

### Thêm xã viên:
3. Nhập Email hoặc SĐT của user
4. Chọn vai trò (ví dụ: "Nông dân")
5. Click "Thêm"

### Kết quả mong đợi:
- [ ] Xã viên mới xuất hiện ngay trong danh sách
- [ ] Thông tin hiển thị đúng (tên, email, vai trò)
- [ ] Trạng thái là "Hoạt động" hoặc "Chờ duyệt"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: GÁN VAI TRÒ CHO XÃ VIÊN

**Mục tiêu:** Kiểm tra thay đổi vai trò xã viên.

### Bước thực hiện:
1. Tìm một xã viên trong danh sách
2. Click "Sửa" hoặc icon edit
3. Quan sát

### Kết quả mong đợi:
- [ ] Modal hoặc form edit hiển thị
- [ ] Có thể thay đổi Vai trò (dropdown)

### Thay đổi vai trò:
4. Chọn vai trò mới (ví dụ: từ "Nông dân" → "Nhà đầu tư")
5. Click "Lưu"

### Kết quả mong đợi:
- [ ] Vai trò cập nhật ngay trong danh sách
- [ ] Thông báo "Cập nhật thành công"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 4: QUẢN LÝ HỢP ĐỒNG (CƠ BẢN)

**Mục tiêu:** Kiểm tra trang hợp đồng hiển thị.

### Bước thực hiện:
1. Vào menu "Hợp đồng"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách hợp đồng hiển thị:
  - [ ] Mã hợp đồng
  - [ ] Loại hợp đồng (Bao tiêu/Góp vốn/Cung ứng)
  - [ ] Đối tác (Xã viên/Doanh nghiệp)
  - [ ] Trạng thái (Nháp/Chờ ký/Đã ký/Hết hạn)
  - [ ] Ngày tạo
- [ ] Có thể click vào xem chi tiết

### Xem chi tiết hợp đồng:
3. Click vào một hợp đồng
4. Quan sát

### Kết quả mong đợi:
- [ ] Trang chi tiết hiển thị:
  - [ ] Nội dung hợp đồng
  - [ ] Thông tin các bên
  - [ ] Điều khoản
  - [ ] Trạng thái ký

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Kết quả tổng thể:
- [ ] ✅ **PASS** - Tất cả test cases đều pass
- [ ] ⚠️ **PARTIAL** - Một số test cases fail
- [ ] ❌ **FAIL** - Nhiều test cases fail

### Đánh giá tổng thể:
- [ ] HTX có thể quản lý xã viên hiệu quả
- [ ] Gán vai trò hoạt động đúng
- [ ] Hợp đồng hiển thị và quản lý được
- [ ] Sẵn sàng cho Phase 07 (Member Module)

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 06 - HTX Member Management
