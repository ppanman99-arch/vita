# PHASE 12: TEST CHECKLIST - CỔNG ESG CÁ NHÂN

**Người kiểm thử:** Product Owner / QA / Non-technical Tester  
**Thời gian ước tính:** 35-40 phút  
**Điều kiện tiên quyết:** Phase 08, 09, 10, 11 đã hoàn thành

---

## 🧪 TEST CASE 1: XEM TỔNG QUAN TÁC ĐỘNG

**Mục tiêu:** Kiểm tra dashboard tổng hợp.

### Bước thực hiện:
1. Đăng nhập tài khoản cá nhân
2. Vào trang "ESG Cá nhân"
3. Quan sát

### Kết quả mong đợi:
- [ ] Thấy tổng số Green Points tích lũy từ mọi nguồn
- [ ] Thấy tổng số tiền đã đầu tư vào các dự án Xanh
- [ ] Thấy huy hiệu/cấp độ "Công dân Xanh"
- [ ] Impact Score hiển thị (ví dụ: "85/100")

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 2: THEO DÕI DẤU CHÂN CARBON CÁ NHÂN

**Mục tiêu:** Kiểm tra carbon tracker.

### Bước thực hiện:
1. Vào "Theo dõi Carbon"
2. Nhập hoạt động (ví dụ: "Đi xe máy 10km")
3. Nhập hoạt động khác (ví dụ: "Dùng 100 số điện")
4. Quan sát

### Kết quả mong đợi:
- [ ] Hệ thống tính ra lượng CO2 phát thải
- [ ] Biểu đồ cập nhật
- [ ] Hệ thống gợi ý cách bù đắp (ví dụ: "Đổi 500 điểm để trồng 1 cây")

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 3: KIỂM TRA AGGREGATION TỪ CÁC MODULE

**Mục tiêu:** Kiểm tra dữ liệu được tổng hợp đúng.

### Bước thực hiện:
1. Có dữ liệu từ:
   - Đầu tư ESG (từ Investor module)
   - Góp vốn HTX (từ Member Capital)
   - Green Points (từ Consumer)
2. Vào ESG Portfolio page
3. Quan sát

### Kết quả mong đợi:
- [ ] Tất cả dữ liệu từ các nguồn đều hiển thị
- [ ] Tổng giá trị tính đúng
- [ ] Breakdown theo nguồn rõ ràng

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 🧪 TEST CASE 4: KIỂM TRA GAMIFICATION

**Mục tiêu:** Kiểm tra badges và challenges.

### Bước thực hiện:
1. Vào "Thử thách" hoặc "Huy hiệu"
2. Quan sát

### Kết quả mong đợi:
- [ ] Danh sách huy hiệu (ví dụ: "🌱 Green Starter", "🌳 Tree Planter x5")
- [ ] Thử thách hàng tuần/tháng
- [ ] Leaderboard (nếu có)

### Kết quả thực tế:
- [ ] ✅ PASS
- [ ] ❌ FAIL - Có lỗi: _______________________

---

## 📊 TỔNG KẾT KIỂM THỬ

### Đánh giá tổng thể:
- [ ] Giao diện đẹp, thân thiện, động viên người dùng
- [ ] Data aggregation hoạt động đúng
- [ ] Carbon tracker chính xác
- [ ] Gamification elements hấp dẫn
- [ ] **HOÀN THÀNH TẤT CẢ PHASES!** 🎉

**Người kiểm thử:** _________________  
**Ngày kiểm thử:** _________________  
**Phiên bản:** Phase 12 - ESG Individual (Final Phase)
