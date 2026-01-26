# PHASE 09: TEST CHECKLIST - XÃ VIÊN TIÊU DÙNG

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Thời gian ước tính:** 30-35 phút  
**Điều kiện tiên quyết:** Phase 07 đã hoàn thành, đang ở role "Người tiêu dùng"

---

## 🧪 TEST CASE 1: KIỂM TRA KHO VOUCHER

**Mục tiêu:** Kiểm tra voucher hiển thị đúng.

### Bước thực hiện:
1. Vào menu "Voucher của tôi" hoặc "Ưu đãi"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách các mã giảm giá đang có
- [ ] Mỗi voucher hiển thị:
  - [ ] Tên voucher (ví dụ: "Giảm 20% đơn hàng tiếp theo")
  - [ ] Hạn sử dụng (ví dụ: "Exp: 30/01/2025")
  - [ ] Điều kiện áp dụng
  - [ ] Nút "Sử dụng" hoặc "Copy mã"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: ĐỔI ĐIỂM THƯỞNG

**Mục tiêu:** Kiểm tra đổi điểm Green Points.

### Bước thực hiện:
1. Vào trang "Đổi điểm"
2. Ghi nhớ số điểm hiện tại
3. Chọn một phần quà (ví dụ: Voucher 50k)
4. Nhấn "Đổi ngay"

### Kết quả mong đợi:
- [ ] Số điểm Green Points bị trừ tương ứng
- [ ] Voucher mới xuất hiện trong "Kho Voucher"
- [ ] Thông báo "Đổi thành công"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: XEM SẢN PHẨM DÀNH CHO XÃ VIÊN

**Mục tiêu:** Kiểm tra catalog sản phẩm.

### Bước thực hiện:
1. Vào menu "Sản phẩm HTX"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách sản phẩm từ các HTX mà mình là thành viên
- [ ] Giá hiển thị là giá ưu đãi (nếu có logic giảm giá)
- [ ] Có thể filter theo HTX, danh mục

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Đánh giá tổng thể:
- [ ] Trải nghiệm giống các App tích điểm/thành viên thân thiết
- [ ] Voucher và rewards hoạt động đúng
- [ ] Sẵn sàng cho Phase 10 (ESG Enterprise)

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 09 - Member Consumer
