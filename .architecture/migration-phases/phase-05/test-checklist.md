# PHASE 05: TEST CHECKLIST - CỔNG HTX QUẢN TRỊ & HỒ SƠ

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 25-30 phút  
**Điều kiện tiên quyết:** Phase 04 đã hoàn thành (đã có tài khoản HTX đăng nhập được)

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 05 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Đã đăng nhập bằng tài khoản HTX (từ Phase 04)

---

## 🧪 TEST CASE 1: XEM DASHBOARD TỔNG QUAN

**Mục tiêu:** Kiểm tra dashboard hiển thị đúng và có đầy đủ thông tin.

### Bước thực hiện:
1. Sau khi đăng nhập, quan sát màn hình chính (Dashboard)
2. Hoặc truy cập `/cooperative/dashboard`
3. Quan sát

### Kết quả mong đợi (Layout):
- [ ] Dashboard hiển thị với layout chuyên nghiệp:
  - [ ] Header với tên HTX và logo
  - [ ] Menu điều hướng (sidebar hoặc top menu)
  - [ ] Nội dung chính ở giữa

### Kết quả mong đợi (Stats Cards):
- [ ] Các thẻ thống kê (Stats Cards) hiển thị:
  - [ ] **Tổng số xã viên** (ví dụ: "25 xã viên")
  - [ ] **Tổng diện tích canh tác** (ví dụ: "150 ha")
  - [ ] **Doanh thu tháng này** (ví dụ: "50,000,000 VNĐ")
  - [ ] **Hợp đồng đang hoạt động** (ví dụ: "5 hợp đồng")
- [ ] Mỗi card có icon và màu sắc phân biệt
- [ ] Có thể có trend indicator (↑↓) nếu so sánh với tháng trước

### Kết quả mong đợi (Charts - nếu có):
- [ ] Biểu đồ hiển thị (nếu có):
  - [ ] Biểu đồ doanh thu theo tháng
  - [ ] Biểu đồ tăng trưởng số xã viên
- [ ] Biểu đồ có tooltip khi hover
- [ ] Dữ liệu hiển thị đúng (có thể là mock data)

### Kết quả mong đợi (Menu):
- [ ] Menu điều hướng hiển thị đầy đủ các mục:
  - [ ] Dashboard (đang active)
  - [ ] Hồ sơ
  - [ ] Quản lý Xã viên
  - [ ] Hợp đồng
  - [ ] Báo cáo
  - [ ] Cài đặt

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 2: CẬP NHẬT HỒ SƠ HTX - THÔNG TIN VĂN BẢN

**Mục tiêu:** Kiểm tra cập nhật thông tin HTX hoạt động.

### Bước thực hiện:
1. Vào menu "Hồ sơ" hoặc "Cài đặt"
2. Hoặc truy cập `/cooperative/profile`
3. Quan sát trang hồ sơ

### Kết quả mong đợi (Form Display):
- [ ] Form hiển thị với các trường:
  - [ ] Logo HTX (có thể upload)
  - [ ] Tên HTX
  - [ ] Giới thiệu về HTX (text editor)
  - [ ] Địa chỉ
  - [ ] Số điện thoại
  - [ ] Email
  - [ ] Các thông tin khác
- [ ] Các trường đã có sẵn giá trị (từ lúc đăng ký)

### Cập nhật thông tin:
4. Thay đổi "Giới thiệu về HTX" (ví dụ: thêm mô tả mới)
5. Thay đổi "Địa chỉ" (nếu có)
6. Click "Lưu" hoặc "Cập nhật"

### Kết quả mong đợi (Save):
- [ ] Hiển thị thông báo "Lưu thành công" (hoặc tương tự)
- [ ] Form không bị reset (giữ nguyên giá trị vừa nhập)
- [ ] Có loading indicator khi đang lưu

### Verify Changes:
7. Reload trang (F5)
8. Quan sát

### Kết quả mong đợi (Persistence):
- [ ] Thông tin vừa cập nhật vẫn còn (đã được lưu vào database)
- [ ] Giới thiệu mới hiển thị đúng
- [ ] Địa chỉ mới hiển thị đúng

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 3: UPLOAD LOGO HTX

**Mục tiêu:** Kiểm tra upload logo hoạt động.

### Bước thực hiện:
1. Vào trang Hồ sơ
2. Tìm phần upload Logo
3. Quan sát

### Kết quả mong đợi (Upload UI):
- [ ] Có nút "Chọn ảnh" hoặc drag & drop area
- [ ] Hiển thị logo hiện tại (nếu đã có)
- [ ] Có preview khi chọn ảnh mới

### Upload logo mới:
4. Click "Chọn ảnh" hoặc kéo thả file ảnh
5. Chọn file ảnh (JPG, PNG, format hợp lệ)
6. Quan sát

### Kết quả mong đợi (Upload Process):
- [ ] Preview ảnh hiển thị ngay sau khi chọn
- [ ] Có thể crop/resize ảnh (nếu có feature này)
- [ ] Click "Lưu" để upload

### Kết quả mong đợi (Upload Success):
- [ ] Hiển thị thông báo "Upload thành công"
- [ ] Logo mới hiển thị trên trang hồ sơ
- [ ] Logo mới hiển thị trên header/dashboard

### Verify Logo Display:
7. Quay lại Dashboard
8. Quan sát

### Kết quả mong đợi (Display):
- [ ] Logo mới hiển thị trên header/dashboard
- [ ] Logo không bị vỡ, hiển thị đúng tỷ lệ

### Test với file không hợp lệ:
9. Thử upload file không phải ảnh (ví dụ: .pdf, .doc)
10. Quan sát

### Kết quả mong đợi (Validation):
- [ ] Hiển thị lỗi "File không hợp lệ" hoặc "Chỉ chấp nhận file ảnh"
- [ ] Không upload file

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 4: KIỂM TRA RESPONSIVE DESIGN

**Mục tiêu:** Kiểm tra dashboard hoạt động trên mobile.

### Bước thực hiện:
1. Mở Developer Tools (F12)
2. Chuyển sang chế độ responsive
3. Chọn kích thước Mobile (375px)
4. Quan sát Dashboard

### Kết quả mong đợi (Mobile):
- [ ] Layout tự động điều chỉnh
- [ ] Stats cards xếp thành 1-2 cột (thay vì 4 cột)
- [ ] Menu có thể collapse thành hamburger menu
- [ ] Charts vẫn hiển thị được (có thể scroll ngang)
- [ ] Text vẫn đọc được, không bị cắt

### Test Navigation trên Mobile:
5. Click vào hamburger menu
6. Quan sát

### Kết quả mong đợi (Mobile Menu):
- [ ] Menu dropdown/sidebar hiển thị
- [ ] Có thể click vào các mục menu
- [ ] Menu đóng lại sau khi chọn

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 5: KIỂM TRA PERFORMANCE

**Mục tiêu:** Kiểm tra dashboard load nhanh.

### Bước thực hiện:
1. Mở Developer Tools → Network tab
2. Reload trang Dashboard
3. Quan sát thời gian load

### Kết quả mong đợi:
- [ ] Trang load trong vòng 2-3 giây (hoặc chấp nhận được)
- [ ] Stats cards hiển thị ngay (không bị delay lâu)
- [ ] Charts load sau (có thể có skeleton loader)

### Test với Slow Network:
4. Thử throttle network về "Slow 3G" trong DevTools
5. Reload trang
6. Quan sát

### Kết quả mong đợi (Slow Network):
- [ ] Có loading indicator (spinner, skeleton)
- [ ] Không bị màn hình trắng quá lâu
- [ ] Nội dung hiển thị từng phần (progressive loading)

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
- [ ] Dashboard hiển thị chuyên nghiệp, tạo cảm giác "Quản trị"
- [ ] Stats và charts hoạt động đúng
- [ ] Cập nhật hồ sơ và logo hoạt động
- [ ] Sẵn sàng cho Phase 06 (Quản lý Xã viên)

### Ghi chú cuối cùng:
_________________________________________________
_________________________________________________

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 05 - HTX Dashboard & Profile
