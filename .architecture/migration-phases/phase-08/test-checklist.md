# PHASE 08: TEST CHECKLIST - XÃ VIÊN GÓP VỐN

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Thời gian ước tính:** 30-35 phút  
**Điều kiện tiên quyết:** Phase 07 đã hoàn thành, đang ở role "Nhà đầu tư"

---

## ✅ PRE-TEST CHECKLIST

- [ ] Developer đã báo "Phase 08 hoàn thành"
- [ ] Đã chuyển sang role "Nhà đầu tư"
- [ ] Có sẵn dữ liệu test (cơ hội đầu tư, portfolio...)

---

## 🧪 TEST CASE 1: XEM CƠ HỘI ĐẦU TƯ

**Mục tiêu:** Kiểm tra danh sách cơ hội đầu tư.

### Bước thực hiện:
1. Vào menu "Cơ hội đầu tư"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách các dự án/HTX đang kêu gọi vốn
- [ ] Mỗi dự án hiển thị:
  - [ ] Tên dự án/HTX
  - [ ] Lãi suất kỳ vọng (ví dụ: "18%")
  - [ ] Thời hạn (ví dụ: "24 tháng")
  - [ ] Số tiền cần huy động (ví dụ: "500 triệu")
  - [ ] Đã huy động được (ví dụ: "300 triệu / 500 triệu")
  - [ ] Nút "Đầu tư ngay"

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: KIỂM TRA DANH MỤC ĐẦU TƯ

**Mục tiêu:** Kiểm tra portfolio hiển thị đúng.

### Bước thực hiện:
1. Vào menu "Danh mục của tôi"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách các khoản đã góp:
  - [ ] "HTX Dược liệu A - 50 triệu - +8% - Đang hoạt động"
  - [ ] "HTX Nông nghiệp Xanh - 100 triệu - +15% - Đang hoạt động"
- [ ] Tổng giá trị tài sản hiển thị đúng
- [ ] Tổng ROI hiển thị

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: XEM LỊCH SỬ LỢI NHUẬN

**Mục tiêu:** Kiểm tra lịch sử cổ tức.

### Bước thực hiện:
1. Vào menu "Lịch sử giao dịch" hoặc "Cổ tức"
2. Quan sát

### Kết quả mong đợi:
- [ ] Bảng kê các lần nhận tiền lãi/cổ tức:
  - [ ] Ngày tháng
  - [ ] Số tiền
  - [ ] Nguồn (HTX nào)
  - [ ] Dự án nào
- [ ] Có thể filter theo thời gian

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Đánh giá tổng thể:
- [ ] Số liệu tài chính hiển thị rõ ràng, chính xác
- [ ] Có thể xem đầy đủ thông tin đầu tư
- [ ] Sẵn sàng cho Phase 09 (Consumer)

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 08 - Member Capital
