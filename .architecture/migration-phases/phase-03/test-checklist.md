# PHASE 03: TEST CHECKLIST - NGUYENMANHTHUAN THƯƠNG MẠI & TÍCH ĐIỂM

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Môi trường:** Local development hoặc Staging  
**Thời gian ước tính:** 30-35 phút  
**Điều kiện tiên quyết:** Phase 01 và Phase 02 đã hoàn thành

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 03 hoàn thành"
- [ ] Build thành công
- [ ] Server đang chạy
- [ ] Đã đăng nhập tài khoản VITA (để test shared session)
- [ ] Ghi nhớ số Green Points hiện tại (để so sánh sau)

---

## 🧪 TEST CASE 1: THÊM VÀO GIỎ HÀNG

**Mục tiêu:** Kiểm tra tính năng giỏ hàng hoạt động.

### Bước thực hiện:
1. Truy cập `/nguyen-manh-thuan`
2. Vào trang sản phẩm
3. Click vào một sản phẩm bất kỳ
4. Click nút "Thêm vào giỏ hàng"
5. Quan sát

### Kết quả mong đợi:
- [ ] Hiển thị thông báo "Đã thêm vào giỏ hàng" (hoặc tương tự)
- [ ] Icon giỏ hàng trên header hiển thị số lượng (ví dụ: badge "1")
- [ ] Click vào icon giỏ hàng, thấy sản phẩm vừa thêm

### Test với nhiều sản phẩm:
6. Thêm thêm 2-3 sản phẩm khác vào giỏ
7. Quan sát

### Kết quả mong đợi (Multiple items):
- [ ] Tất cả sản phẩm đều xuất hiện trong giỏ hàng
- [ ] Số lượng trên icon giỏ hàng cập nhật đúng
- [ ] Tổng tiền tạm tính chính xác

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 2: XEM GIỎ HÀNG

**Mục tiêu:** Kiểm tra trang giỏ hàng hiển thị đúng.

### Bước thực hiện:
1. Có ít nhất 1 sản phẩm trong giỏ hàng
2. Click vào icon giỏ hàng hoặc truy cập `/nguyen-manh-thuan/cart`
3. Quan sát trang giỏ hàng

### Kết quả mong đợi:
- [ ] Danh sách sản phẩm hiển thị với:
  - [ ] Hình ảnh sản phẩm
  - [ ] Tên sản phẩm
  - [ ] Giá đơn vị
  - [ ] Số lượng (có thể tăng/giảm)
  - [ ] Tổng tiền cho mỗi sản phẩm
- [ ] Tổng tiền tạm tính ở cuối trang
- [ ] Nút "Thanh toán" hoặc "Tiến hành đặt hàng" hiển thị

### Test thay đổi số lượng:
4. Thử tăng số lượng một sản phẩm (ví dụ: từ 1 → 2)
5. Quan sát

### Kết quả mong đợi (Quantity):
- [ ] Tổng tiền cho sản phẩm đó cập nhật (giá × số lượng)
- [ ] Tổng tiền tạm tính cập nhật
- [ ] Không có lỗi

### Test xóa sản phẩm:
6. Click nút "Xóa" hoặc icon thùng rác cho một sản phẩm
7. Quan sát

### Kết quả mong đợi (Remove):
- [ ] Sản phẩm biến mất khỏi giỏ hàng
- [ ] Tổng tiền cập nhật
- [ ] Nếu giỏ hàng trống, hiển thị thông báo "Giỏ hàng trống"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 3: ĐẶT HÀNG THÀNH CÔNG (CHECKOUT)

**Mục tiêu:** Kiểm tra flow đặt hàng hoàn chỉnh.

### Bước thực hiện:
1. Có ít nhất 1 sản phẩm trong giỏ hàng
2. Click "Thanh toán" hoặc "Tiến hành đặt hàng"
3. Quan sát trang checkout

### Kết quả mong đợi (Checkout Page):
- [ ] Trang checkout hiển thị:
  - [ ] Thông tin đơn hàng (danh sách sản phẩm, tổng tiền)
  - [ ] Form thông tin giao hàng (Tên, SĐT, Địa chỉ)
  - [ ] Nếu đã đăng nhập, form tự điền thông tin (hoặc có thể sửa)
- [ ] Có phương thức thanh toán (nếu có)

### Điền thông tin và đặt hàng:
4. Điền đầy đủ thông tin giao hàng (nếu chưa có)
5. Click "Đặt hàng" hoặc "Xác nhận đặt hàng"
6. Quan sát

### Kết quả mong đợi (Order Success):
- [ ] Hiển thị thông báo "Đặt hàng thành công" (hoặc tương tự)
- [ ] Hiển thị mã đơn hàng (ví dụ: "Đơn hàng #12345")
- [ ] Có thể xem chi tiết đơn hàng
- [ ] Giỏ hàng được xóa sạch (hoặc hiển thị "Giỏ hàng trống")

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 4: KIỂM TRA TÍCH ĐIỂM GREEN POINTS - QUAN TRỌNG

**Mục tiêu:** Kiểm tra Green Points được tích đúng sau khi mua hàng.

### Bước thực hiện:
1. **Ghi nhớ số Green Points hiện tại:**
   - Vào trang VITA (hoặc xem trên header nếu có)
   - Ghi lại số điểm hiện tại (ví dụ: 1,000 điểm)

2. **Thực hiện mua hàng:**
   - Vào nguyenmanhthuan
   - Thêm sản phẩm vào giỏ (ví dụ: giá 500,000 VNĐ)
   - Đặt hàng thành công

3. **Kiểm tra điểm sau khi mua:**
   - Quay lại trang VITA (hoặc reload trang)
   - Xem số Green Points mới

### Kết quả mong đợi:
- [ ] Số Green Points **TĂNG LÊN** so với trước khi mua
- [ ] Số điểm tăng tương ứng với giá trị đơn hàng (theo quy tắc tích điểm)
  - Ví dụ: Nếu quy tắc là 1% giá trị đơn hàng → 500,000 VNĐ = 5,000 điểm
- [ ] Trong lịch sử điểm (nếu có), hiển thị dòng giao dịch:
  - [ ] Nguồn: "NguyenManhThuan" hoặc "nguyenmanhthuan"
  - [ ] Hoạt động: "Purchase" hoặc "Mua hàng"
  - [ ] Số điểm: +X điểm

### Kết quả thực tế:
- [ ] ✅ PASS - Điểm tăng đúng
- [ ] ❌ FAIL - Điểm không tăng hoặc tăng sai: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 5: KIỂM TRA SESSION CHIA SẺ VỚI VITA

**Mục tiêu:** Kiểm tra đăng nhập ở VITA có thể dùng ở nguyenmanhthuan.

### Bước thực hiện:
1. **Đăng nhập ở VITA:**
   - Truy cập trang VITA chính
   - Đăng nhập với tài khoản hợp lệ
   - Xác nhận đã đăng nhập (thấy tên user, menu user...)

2. **Truy cập nguyenmanhthuan:**
   - Mở tab mới hoặc navigate đến `/nguyen-manh-thuan`
   - Quan sát

### Kết quả mong đợi:
- [ ] **KHÔNG** bị yêu cầu đăng nhập lại
- [ ] Có thể thấy thông tin user (tên, avatar) trên header nguyenmanhthuan (nếu có)
- [ ] Có thể thêm vào giỏ hàng và đặt hàng mà không cần login lại

### Test ngược lại:
3. **Đăng xuất ở VITA:**
   - Quay lại trang VITA
   - Click "Đăng xuất"

4. **Truy cập nguyenmanhthuan:**
   - Navigate đến `/nguyen-manh-thuan`
   - Thử thêm vào giỏ hàng hoặc đặt hàng

### Kết quả mong đợi (Logout):
- [ ] Hệ thống yêu cầu đăng nhập (hoặc redirect về login)
- [ ] Không thể đặt hàng khi chưa đăng nhập

### Kết quả thực tế:
- [ ] ✅ PASS - Session shared đúng
- [ ] ❌ FAIL - Có lỗi: _______________________

**Ghi chú:** _________________________________________________

---

## 🧪 TEST CASE 6: XEM LỊCH SỬ ĐƠN HÀNG

**Mục tiêu:** Kiểm tra trang lịch sử đơn hàng (nếu có).

### Bước thực hiện:
1. Đã có ít nhất 1 đơn hàng thành công
2. Tìm menu "Đơn hàng của tôi" hoặc "Lịch sử đơn hàng"
3. Hoặc truy cập `/nguyen-manh-thuan/orders`
4. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách các đơn hàng hiển thị:
  - [ ] Mã đơn hàng
  - [ ] Ngày đặt hàng
  - [ ] Tổng tiền
  - [ ] Trạng thái (Đang xử lý, Đã giao, v.v.)
- [ ] Click vào một đơn hàng, xem được chi tiết:
  - [ ] Danh sách sản phẩm
  - [ ] Thông tin giao hàng
  - [ ] Tổng tiền

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
- [ ] Tính năng mua sắm hoạt động hoàn chỉnh
- [ ] Green Points tích đúng và sync với VITA
- [ ] Session shared giữa VITA và nguyenmanhthuan
- [ ] Sẵn sàng cho Phase tiếp theo

### Ghi chú cuối cùng:
_________________________________________________
_________________________________________________

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 03 - NguyenManhThuan Commerce & Green Points
