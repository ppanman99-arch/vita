# PHASE 04: TEST CHECKLIST - CỔNG HTX TRUY CẬP & ĐỊNH DANH

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 20-25 phút  
**Điều kiện tiên quyết:** Phase 01 đã hoàn thành

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 04 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Có sẵn thông tin HTX test (Tên HTX, Mã số thuế, Email...)

---

## 🧪 TEST CASE 1: ĐĂNG KÝ THÔNG TIN HTX (ONBOARDING)

**Mục tiêu:** Kiểm tra form đăng ký HTX hoạt động.

### Bước thực hiện:
1. Truy cập trang "Đăng ký Hợp Tác Xã"
   - URL: `/cooperative/register` hoặc từ landing page
2. Quan sát form đăng ký

### Kết quả mong đợi (Form Display):
- [ ] Form hiển thị đầy đủ các trường:
  - [ ] Tên HTX (bắt buộc)
  - [ ] Mã số thuế
  - [ ] Năm thành lập
  - [ ] Số lượng thành viên
  - [ ] Tổng diện tích rừng
  - [ ] Địa chỉ
  - [ ] Người đại diện
  - [ ] Chức vụ người đại diện
  - [ ] Số điện thoại
  - [ ] Email
  - [ ] Hoạt động hiện tại
  - [ ] Sở thích/Quan tâm (checkbox)
  - [ ] Thông tin bổ sung

### Điền form và submit:
3. Điền đầy đủ thông tin vào form (hoặc ít nhất các trường bắt buộc)
4. Click "Gửi đăng ký" hoặc "Đăng ký"

### Kết quả mong đợi (Submission):
- [ ] Form được validate (nếu thiếu trường bắt buộc, hiện lỗi)
- [ ] Sau khi submit, hiển thị thông báo thành công
- [ ] Có thể hiện modal "Đăng ký thành công" hoặc redirect
- [ ] Thông tin được lưu (Dev có thể verify trong database)

### Test với Email đã tồn tại (nếu có validation):
5. Thử đăng ký lại với cùng email
6. Quan sát

### Kết quả mong đợi (Duplicate):
- [ ] Hiển thị lỗi "Email đã được sử dụng" (nếu có validation)

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 2: ĐĂNG NHẬP TÀI KHOẢN HTX

**Mục tiêu:** Kiểm tra đăng nhập HTX hoạt động.

### Bước thực hiện:
1. Truy cập trang Login dành riêng cho HTX
   - URL: `/cooperative/login` hoặc từ menu
2. Quan sát trang đăng nhập

### Kết quả mong đợi (Login Page):
- [ ] Trang đăng nhập hiển thị:
  - [ ] Ô input Email
  - [ ] Ô input Password
  - [ ] Nút "Đăng nhập"
  - [ ] Link "Quên mật khẩu?" (nếu có)
  - [ ] Link "Đăng ký tài khoản" (nếu có)

### Đăng nhập với tài khoản hợp lệ:
3. Nhập Email của HTX đã đăng ký
4. Nhập Password
5. Click "Đăng nhập"

### Kết quả mong đợi (Success):
- [ ] Đăng nhập thành công
- [ ] **KHÔNG** hiển thị lỗi
- [ ] Chuyển hướng vào trang Dashboard của HTX
  - Lúc này Dashboard có thể chưa có nội dung (trang trắng hoặc Welcome page)
  - Nhưng phải vào được, không bị 404

### Test với thông tin sai:
6. Thử đăng nhập với Email đúng nhưng Password sai
7. Quan sát

### Kết quả mong đợi (Error):
- [ ] Hiển thị thông báo lỗi rõ ràng
- [ ] Vẫn ở lại trang đăng nhập
- [ ] Không chuyển hướng

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 3: ĐĂNG KÝ TÀI KHOẢN HTX (NẾU CÓ TRANG RIÊNG)

**Mục tiêu:** Kiểm tra trang đăng ký tài khoản (khác với đăng ký thông tin HTX).

### Bước thực hiện:
1. Truy cập `/cooperative/register-account` (nếu có)
2. Hoặc click link "Đăng ký tài khoản" từ trang login
3. Quan sát

### Kết quả mong đợi:
- [ ] Form đăng ký tài khoản hiển thị:
  - [ ] Email
  - [ ] Password
  - [ ] Confirm Password
  - [ ] Có thể có thông tin bổ sung
- [ ] Validation hoạt động (password match, email format...)

### Đăng ký tài khoản:
4. Điền form và submit
5. Quan sát

### Kết quả mong đợi:
- [ ] Tài khoản được tạo thành công
- [ ] Có thể đăng nhập ngay với tài khoản vừa tạo
- [ ] Hoặc cần xác nhận email (nếu có flow xác nhận)

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 4: TRANG LANDING HTX

**Mục tiêu:** Kiểm tra trang landing/marketing cho HTX.

### Bước thực hiện:
1. Truy cập `/cooperative/landing` hoặc từ menu chính
2. Quan sát

### Kết quả mong đợi:
- [ ] Trang landing hiển thị:
  - [ ] Hero section với thông điệp chính
  - [ ] Lợi ích khi tham gia HTX
  - [ ] Các bước đăng ký
  - [ ] Nút CTA "Đăng ký ngay" hoặc "Tìm hiểu thêm"
- [ ] Design chuyên nghiệp, thu hút
- [ ] Responsive trên mobile/desktop

### Test Navigation:
3. Click các nút/link trên landing page
4. Quan sát

### Kết quả mong đợi (Navigation):
- [ ] Nút "Đăng ký" chuyển đến trang đăng ký
- [ ] Các link khác hoạt động đúng

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 5: KIỂM TRA SESSION & SECURITY

**Mục tiêu:** Kiểm tra session và bảo mật.

### Bước thực hiện:
1. Đăng nhập thành công với tài khoản HTX
2. Refresh trang (F5)
3. Quan sát

### Kết quả mong đợi (Session):
- [ ] Vẫn giữ trạng thái đã đăng nhập
- [ ] Không bị đá về trang login

### Test Logout:
4. Tìm nút "Đăng xuất" và click
5. Quan sát

### Kết quả mong đợi (Logout):
- [ ] Đăng xuất thành công
- [ ] Chuyển về trang chủ hoặc trang login
- [ ] Không thể truy cập trang dashboard khi chưa đăng nhập

### Test Protected Routes:
6. Thử truy cập trực tiếp `/cooperative/dashboard` khi chưa đăng nhập
7. Quan sát

### Kết quả mong đợi (Protected):
- [ ] Hệ thống redirect về trang login
- [ ] Hoặc hiển thị thông báo yêu cầu đăng nhập

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Kết quả tổng thể:
- [ ] ✅ **PASS** - Tất cả test cases đều pass
- [ ] ⚠️ **PARTIAL** - Một số test cases fail
- [ ] ❌ **FAIL** - Nhiều test cases fail

### Test Cases Failed:
1. Test Case #___: _________________________________
2. Test Case #___: _________________________________

### Đánh giá tổng thể:
- [ ] HTX có thể đăng ký và đăng nhập thành công
- [ ] Session được quản lý đúng
- [ ] Sẵn sàng cho Phase 05 (Dashboard)

### Ghi chú cuối cùng:
_________________________________________________
_________________________________________________

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 04 - HTX Access & Authentication
