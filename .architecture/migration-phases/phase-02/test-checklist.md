# PHASE 02: TEST CHECKLIST - NGUYENMANHTHUAN HIỂN THỊ CƠ BẢN

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 20-25 phút  
**Điều kiện tiên quyết:** Phase 01 đã hoàn thành

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 02 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Có quyền truy cập vào nguyenmanhthuan source code (để so sánh)

---

## 🧪 TEST CASE 1: TRUY CẬP TRANG CHỦ NGUYENMANHTHUAN

**Mục tiêu:** Kiểm tra routing và hiển thị trang chủ.

### Bước thực hiện:
1. Mở trình duyệt
2. Truy cập URL: `http://localhost:5173/nguyen-manh-thuan`
3. Quan sát trang

### Kết quả mong đợi:
- [ ] Trang chủ NguyenManhThuan hiển thị (KHÔNG phải trang VITA)
- [ ] Logo/branding của NguyenManhThuan hiển thị đúng
- [ ] Màu sắc, font chữ đặc trưng của NguyenManhThuan
- [ ] Banner/hero section hiển thị (nếu có)
- [ ] Menu navigation hiển thị
- [ ] **KHÔNG** có lỗi 404
- [ ] **KHÔNG** có lỗi trong Console (F12)

### So sánh với bản gốc:
- [ ] Giao diện giống với website nguyenmanhthuan gốc (nếu có thể so sánh)
- [ ] Layout không bị vỡ (responsive trên mobile/desktop)

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 2: XEM DANH SÁCH SẢN PHẨM

**Mục tiêu:** Kiểm tra trang danh sách sản phẩm hoạt động.

### Bước thực hiện:
1. Từ trang chủ, click vào menu "Sản phẩm" hoặc "Cửa hàng"
2. Hoặc truy cập trực tiếp: `/nguyen-manh-thuan/products`
3. Quan sát danh sách

### Kết quả mong đợi:
- [ ] Danh sách sản phẩm hiển thị
- [ ] Mỗi sản phẩm có:
  - [ ] Hình ảnh sản phẩm (rõ nét, không bị lỗi ảnh)
  - [ ] Tên sản phẩm
  - [ ] Giá sản phẩm (định dạng VNĐ)
- [ ] Có phân trang hoặc scroll infinite (nếu có nhiều sản phẩm)
- [ ] Có bộ lọc/tìm kiếm (nếu có trong design)

### Test Filter/Search (nếu có):
4. Thử dùng bộ lọc (theo danh mục, giá...)
5. Thử tìm kiếm sản phẩm

### Kết quả mong đợi (Filter):
- [ ] Danh sách cập nhật theo filter
- [ ] Kết quả tìm kiếm hiển thị đúng

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 3: XEM CHI TIẾT SẢN PHẨM

**Mục tiêu:** Kiểm tra trang chi tiết sản phẩm.

### Bước thực hiện:
1. Từ danh sách sản phẩm, click vào một sản phẩm bất kỳ
2. Quan sát trang chi tiết

### Kết quả mong đợi:
- [ ] Trang chi tiết sản phẩm hiển thị
- [ ] Có đầy đủ thông tin:
  - [ ] Tên sản phẩm
  - [ ] Hình ảnh sản phẩm (có thể có nhiều ảnh, có gallery)
  - [ ] Giá sản phẩm
  - [ ] Mô tả sản phẩm
  - [ ] Thông số kỹ thuật (nếu có)
- [ ] Nút "Thêm vào giỏ hàng" hiển thị (chưa cần click được ở phase này)
- [ ] Có nút "Quay lại" hoặc breadcrumb navigation

### Test Image Gallery (nếu có):
3. Click vào các ảnh khác nhau trong gallery
4. Quan sát

### Kết quả mong đợi (Gallery):
- [ ] Ảnh thay đổi khi click
- [ ] Ảnh hiển thị rõ nét, không bị vỡ

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 4: NAVIGATION GIỮA CÁC TRANG

**Mục tiêu:** Kiểm tra navigation hoạt động mượt mà.

### Bước thực hiện:
1. Từ trang chủ, navigate đến:
   - Trang Sản phẩm
   - Trang Chi tiết sản phẩm
   - Quay lại Trang chủ
2. Quan sát mỗi lần chuyển trang

### Kết quả mong đợi:
- [ ] Chuyển trang mượt mà, không bị lag
- [ ] URL thay đổi đúng (ví dụ: `/nguyen-manh-thuan/products`)
- [ ] Không bị reload toàn bộ trang (SPA behavior)
- [ ] Browser back/forward buttons hoạt động đúng
- [ ] Không có lỗi trong Console khi navigate

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 5: RESPONSIVE DESIGN

**Mục tiêu:** Kiểm tra giao diện trên các kích thước màn hình khác nhau.

### Bước thực hiện:
1. Mở Developer Tools (F12)
2. Chuyển sang chế độ responsive (Toggle device toolbar)
3. Test các kích thước:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

### Kết quả mong đợi:
- [ ] Layout tự động điều chỉnh theo màn hình
- [ ] Menu có thể collapse thành hamburger menu trên mobile
- [ ] Hình ảnh không bị vỡ
- [ ] Text vẫn đọc được, không bị cắt
- [ ] Buttons vẫn click được

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 6: KIỂM TRA KHÔNG CONFLICT VỚI VITA

**Mục tiêu:** Đảm bảo nguyenmanhthuan không ảnh hưởng đến VITA.

### Bước thực hiện:
1. Truy cập trang VITA chính: `/` hoặc `/home`
2. Quan sát
3. Navigate đến các trang VITA khác (ví dụ: `/farmer-dashboard`)
4. Quan sát

### Kết quả mong đợi:
- [ ] Trang VITA vẫn hoạt động bình thường
- [ ] Không có lỗi JavaScript
- [ ] Styling của VITA không bị ảnh hưởng
- [ ] Có thể chuyển qua lại giữa VITA và nguyenmanhthuan mà không lỗi

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
- [ ] Website nguyenmanhthuan hiển thị đúng, sẵn sàng cho Phase 03
- [ ] Cần fix bugs trước khi tiếp tục
- [ ] Cần review lại với developer

### Ghi chú cuối cùng:
_________________________________________________
_________________________________________________

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 02 - NguyenManhThuan Basic Display
