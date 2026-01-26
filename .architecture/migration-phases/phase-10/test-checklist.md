# PHASE 10: TEST CHECKLIST - ESG DOANH NGHIỆP CƠ BẢN

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Thời gian ước tính:** 30-35 phút  
**Điều kiện tiên quyết:** Phase 01 đã hoàn thành, có tài khoản doanh nghiệp

---

## 🧪 TEST CASE 1: XEM DASHBOARD ESG

**Mục tiêu:** Kiểm tra dashboard ESG hiển thị.

### Bước thực hiện:
1. Đăng nhập tài khoản doanh nghiệp
2. Vào ESG Portal
3. Quan sát dashboard

### Kết quả mong đợi:
- [ ] Hiển thị Điểm số ESG (ESG Score, ví dụ: "82/100")
- [ ] Tóm tắt số lượng dự án xanh đang chạy
- [ ] Huy hiệu/Chứng nhận xanh (nếu có)
- [ ] Carbon offset summary

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: TẠO DỰ ÁN ESG MỚI

**Mục tiêu:** Kiểm tra tạo dự án ESG.

### Bước thực hiện:
1. Vào menu "Dự án"
2. Nhấn "Tạo dự án mới"
3. Điền thông tin:
   - Tên dự án (ví dụ: "Trồng rừng ngập mặn")
   - Mục tiêu
   - Thời gian
4. Nhấn "Lưu"

### Kết quả mong đợi:
- [ ] Dự án mới xuất hiện trong danh sách
- [ ] Trạng thái là "Mới" hoặc "Chờ duyệt"
- [ ] Có thể click vào xem chi tiết

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: CẬP NHẬT TIẾN ĐỘ DỰ ÁN

**Mục tiêu:** Kiểm tra cập nhật tiến độ.

### Bước thực hiện:
1. Chọn một dự án đang chạy
2. Cập nhật tiến độ (ví dụ: "Đã trồng 1000 cây")
3. Upload hình ảnh minh chứng (nếu có)
4. Lưu

### Kết quả mong đợi:
- [ ] Thanh tiến độ (Progress bar) tăng lên
- [ ] Hình ảnh mới được hiển thị
- [ ] Thông báo "Cập nhật thành công"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Đánh giá tổng thể:
- [ ] Giao diện thể hiện tính "Xanh", minh bạch
- [ ] Quản lý dự án hoạt động đúng
- [ ] Sẵn sàng cho Phase 11 (ESG Advanced)

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 10 - ESG Enterprise Basic
