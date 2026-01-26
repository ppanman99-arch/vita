# PHASE 01: TEST CHECKLIST - CORE FOUNDATION

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 15-20 phút

---

## ✅ PRE-TEST CHECKLIST

Trước khi bắt đầu kiểm thử, đảm bảo:

- [ ] Developer đã báo "Phase 01 hoàn thành"
- [ ] Build thành công (`npm run build` không có lỗi)
- [ ] Server đang chạy (`npm run dev`)
- [ ] Có sẵn tài khoản test hợp lệ (email + password)
- [ ] Có sẵn tài khoản test không hợp lệ (để test error cases)

---

## 🧪 TEST CASE 1: SMOKE TEST - HỆ THỐNG KHÔNG BỊ SẬP

**Mục tiêu:** Đảm bảo sau khi refactor, hệ thống vẫn chạy được cơ bản.

### Bước thực hiện:
1. Mở trình duyệt (Chrome/Firefox/Safari)
2. Truy cập URL: `http://localhost:5173` (hoặc URL staging)
3. Quan sát trang chủ

### Kết quả mong đợi:
- [ ] Trang web tải được, không hiện màn hình trắng
- [ ] Không có lỗi đỏ trong Console (F12 → Console tab)
- [ ] Menu/Navigation bar hiển thị bình thường
- [ ] Logo và các elements cơ bản hiển thị đúng

### Kết quả thực tế:
- [ ] ✅ PASS - Hệ thống hoạt động bình thường
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 2: ĐĂNG NHẬP THÀNH CÔNG (HAPPY PATH)

**Mục tiêu:** Kiểm tra flow đăng nhập với tài khoản hợp lệ hoạt động đúng.

### Bước thực hiện:
1. Click nút "Đăng nhập" trên trang chủ (hoặc truy cập `/login`)
2. Quan sát trang đăng nhập
3. Nhập **Email hợp lệ**: `test@example.com` (hoặc email test thật)
4. Nhập **Password hợp lệ**: `password123` (hoặc password test thật)
5. Click nút "Đăng nhập" (hoặc nhấn Enter)

### Kết quả mong đợi:
- [ ] Trang đăng nhập hiển thị đúng (có 2 ô input: Email, Password)
- [ ] Sau khi click "Đăng nhập", hệ thống xử lý (có loading indicator nếu có)
- [ ] **KHÔNG** hiển thị thông báo lỗi màu đỏ
- [ ] Tự động chuyển hướng sang trang khác (Dashboard hoặc trang đích)
- [ ] Trên trang mới, có thể thấy thông tin người dùng (tên, avatar, menu)

### Kiểm tra Session Persistence:
6. Refresh trang (F5 hoặc Cmd+R)
7. Quan sát

### Kết quả mong đợi (Session):
- [ ] Vẫn giữ trạng thái đã đăng nhập (không bị đá về trang login)
- [ ] Thông tin người dùng vẫn hiển thị

### Kết quả thực tế:
- [ ] ✅ PASS - Đăng nhập thành công, session được giữ
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 3: ĐĂNG NHẬP THẤT BẠI - PASSWORD SAI

**Mục tiêu:** Kiểm tra hệ thống xử lý lỗi đúng khi thông tin đăng nhập sai.

### Bước thực hiện:
1. Truy cập trang đăng nhập (`/login`)
2. Nhập **Email đúng**: `test@example.com`
3. Nhập **Password SAI**: `wrongpassword`
4. Click nút "Đăng nhập"

### Kết quả mong đợi:
- [ ] Hệ thống hiển thị thông báo lỗi rõ ràng
  - Ví dụ: "Email hoặc mật khẩu không đúng"
  - Hoặc: "Invalid login credentials"
- [ ] Thông báo lỗi có màu đỏ hoặc màu cảnh báo (không phải màu xanh)
- [ ] **KHÔNG** chuyển hướng sang trang khác
- [ ] Vẫn ở lại trang đăng nhập
- [ ] Ô input Password có thể được xóa sạch hoặc giữ nguyên (tùy UX design)

### Kết quả thực tế:
- [ ] ✅ PASS - Hiển thị lỗi đúng, không chuyển trang
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 4: ĐĂNG NHẬP THẤT BẠI - EMAIL KHÔNG TỒN TẠI

**Mục tiêu:** Kiểm tra hệ thống xử lý khi email không có trong hệ thống.

### Bước thực hiện:
1. Truy cập trang đăng nhập
2. Nhập **Email không tồn tại**: `nonexistent@example.com`
3. Nhập **Password bất kỳ**: `password123`
4. Click "Đăng nhập"

### Kết quả mong đợi:
- [ ] Hiển thị thông báo lỗi (tương tự Test Case 3)
- [ ] Không chuyển hướng
- [ ] Vẫn ở lại trang đăng nhập

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 5: ĐĂNG XUẤT (LOGOUT)

**Mục tiêu:** Kiểm tra chức năng đăng xuất hoạt động đúng.

### Bước thực hiện:
1. Đảm bảo đã đăng nhập (nếu chưa, làm Test Case 2 trước)
2. Tìm nút "Đăng xuất" (thường ở menu dropdown hoặc góc trên)
3. Click "Đăng xuất"

### Kết quả mong đợi:
- [ ] Sau khi click, hệ thống xử lý
- [ ] Chuyển hướng về trang chủ hoặc trang đăng nhập
- [ ] Thông tin người dùng biến mất (không còn tên, avatar)
- [ ] Menu thay đổi (không còn các menu dành cho user đã đăng nhập)

### Kiểm tra Session Cleared:
4. Thử truy cập lại một trang cần đăng nhập (ví dụ: `/dashboard`)
5. Quan sát

### Kết quả mong đợi (Session):
- [ ] Hệ thống redirect về trang đăng nhập (hoặc hiện popup yêu cầu đăng nhập)
- [ ] Không thể truy cập trang nội bộ khi chưa đăng nhập

### Kết quả thực tế:
- [ ] ✅ PASS - Đăng xuất thành công, session được xóa
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 6: VALIDATION - EMAIL RỖNG

**Mục tiêu:** Kiểm tra validation form hoạt động đúng.

### Bước thực hiện:
1. Truy cập trang đăng nhập
2. **KHÔNG** nhập gì vào ô Email (để trống)
3. Nhập password: `password123`
4. Click "Đăng nhập"

### Kết quả mong đợi:
- [ ] Hiển thị thông báo validation (ví dụ: "Vui lòng nhập email")
- [ ] Hoặc ô Email có border màu đỏ
- [ ] Không gửi request lên server (không có loading)

### Kết quả thực tế:
- [ ] ✅ PASS - Validation hoạt động
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 7: VALIDATION - PASSWORD RỖNG

**Mục tiêu:** Kiểm tra validation cho password.

### Bước thực hiện:
1. Truy cập trang đăng nhập
2. Nhập email: `test@example.com`
3. **KHÔNG** nhập password (để trống)
4. Click "Đăng nhập"

### Kết quả mong đợi:
- [ ] Hiển thị thông báo validation cho password
- [ ] Không gửi request

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Kết quả tổng thể:
- [ ] ✅ **PASS** - Tất cả test cases đều pass
- [ ] ⚠️ **PARTIAL** - Một số test cases fail (ghi rõ bên dưới)
- [ ] ❌ **FAIL** - Nhiều test cases fail

### Test Cases Failed:
1. Test Case #___: _________________________________
2. Test Case #___: _________________________________

### Đánh giá tổng thể:
- [ ] Hệ thống ổn định, sẵn sàng cho Phase tiếp theo
- [ ] Cần fix bugs trước khi tiếp tục
- [ ] Cần review lại code với developer

### Ghi chú cuối cùng:
_________________________________________________
_________________________________________________
_________________________________________________

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 01 - Core Foundation
