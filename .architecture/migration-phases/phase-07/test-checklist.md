# PHASE 07: TEST CHECKLIST - CỔNG XÃ VIÊN HUB & ROLE SWITCHER

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 25-30 phút  
**Điều kiện tiên quyết:** Phase 01 đã hoàn thành, có tài khoản user với nhiều roles

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 07 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Đã đăng nhập tài khoản cá nhân
- [ ] Tài khoản có ít nhất 2 roles (ví dụ: Producer + Investor)

---

## 🧪 TEST CASE 1: TRUY CẬP MEMBER HUB

**Mục tiêu:** Kiểm tra trang Member Hub hiển thị đúng.

### Bước thực hiện:
1. Đăng nhập xong, vào `/member-hub`
2. Quan sát

### Kết quả mong đợi:
- [ ] Giao diện hiển thị: "Xin chào, [Tên]"
- [ ] Các khối thông tin tóm tắt:
  - [ ] "Sản xuất: Đang có X vụ mùa"
  - [ ] "Đầu tư: Đang góp X triệu"
  - [ ] "Tiêu dùng: X Green Points"
- [ ] Có nút/chức năng chuyển vai trò

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: CHUYỂN ĐỔI VAI TRÒ - QUAN TRỌNG

**Mục tiêu:** Kiểm tra Role Switcher hoạt động mượt mà.

### Bước thực hiện:
1. Tìm nút chuyển vai trò (dropdown hoặc tabs)
2. Quan sát danh sách roles available
3. Chọn role "Nhà đầu tư" (Investor)
4. Quan sát

### Kết quả mong đợi:
- [ ] Giao diện thay đổi NGAY LẬP TỨC (không reload page)
- [ ] Menu bên trái thay đổi (chỉ hiện menu liên quan đầu tư)
- [ ] Nội dung dashboard thay đổi theo role
- [ ] Role indicator hiển thị "Nhà đầu tư"

### Test chuyển ngược lại:
5. Chuyển về role "Người tiêu dùng" (Consumer)
6. Quan sát

### Kết quả mong đợi:
- [ ] Giao diện đổi sang mua sắm/điểm thưởng
- [ ] Menu thay đổi theo
- [ ] Không có lỗi

### Kết quả thực tế:
- [ ] ✅ PASS - Chuyển đổi mượt, menu đúng
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: KIỂM TRA MENU THEO ROLE

**Mục tiêu:** Kiểm tra menu thay đổi đúng theo role.

### Bước thực hiện:
1. Ở role "Nông dân" (Producer)
2. Quan sát menu
3. Chuyển sang role "Nhà đầu tư"
4. Quan sát menu mới

### Kết quả mong đợi (Producer Role):
- [ ] Menu hiển thị:
  - [ ] Vụ mùa của tôi
  - [ ] Nhật ký canh tác
  - [ ] Kho hàng
  - [ ] (KHÔNG có menu đầu tư, tiêu dùng)

### Kết quả mong đợi (Investor Role):
- [ ] Menu hiển thị:
  - [ ] Danh mục đầu tư
  - [ ] Cơ hội đầu tư
  - [ ] Lịch sử giao dịch
  - [ ] (KHÔNG có menu sản xuất)

### Kết quả thực tế:
- [ ] ✅ PASS - Menu đúng theo role
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 4: KIỂM TRA SESSION PERSISTENCE

**Mục tiêu:** Kiểm tra role được giữ sau khi refresh.

### Bước thực hiện:
1. Chuyển sang role "Nhà đầu tư"
2. Refresh trang (F5)
3. Quan sát

### Kết quả mong đợi:
- [ ] Vẫn giữ role "Nhà đầu tư" (không reset về role mặc định)
- [ ] Giao diện vẫn đúng theo role
- [ ] Menu vẫn đúng

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
- [ ] Role switching mượt mà, không cần login lại
- [ ] Menu thay đổi chính xác theo role
- [ ] Sẵn sàng cho Phase 08-09 (Capital & Consumer)

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 07 - Member Hub & Role Switcher
