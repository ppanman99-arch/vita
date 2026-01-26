# MỤC LỤC & LỘ TRÌNH TRIỂN KHAI CHI TIẾT

Tài liệu này chia nhỏ kế hoạch tái cấu trúc `RESTRUCTURE_PLAN.md` thành các gói công việc (Work Packages) nhỏ, độc lập. Mỗi gói công việc đều có tiêu chí nghiệm thu (UAT) dành cho người không chuyên kỹ thuật (Non-technical Tester).

## 📁 Cấu trúc Tài liệu

### Tài liệu Tổng quan (Architecture & Analysis)
- 📊 [Đánh giá Kiến trúc](./ARCHITECTURE_REVIEW.md) - Đánh giá tổng thể kế hoạch migration
- 📋 [Tình trạng Hiện tại](./00_current_status.md) - Phân tích codebase hiện tại và các vấn đề
- 🔗 [Phân tích Dependencies](./00_dependencies_analysis.md) - Dependencies giữa các modules
- 🗺️ [Path Mapping](./00_path_mapping.md) - Bảng mapping old paths → new paths

### Tài liệu theo Phase

Mỗi phase có một thư mục riêng với 2 file:
- **`implementation.md`**: Chi tiết các sửa đổi sẽ thực hiện (cho Developer)
- **`test-checklist.md`**: Checklist các test case để kiểm thử (cho Tester/Product Owner)

---

## Nguyên tắc Nghiệm thu
1. **Không nhìn code:** Người kiểm thử chỉ thao tác trên trình duyệt.
2. **Luồng nghiệp vụ:** Kiểm thử theo luồng người dùng (User Flow).
3. **So sánh:** So sánh với phiên bản cũ (nếu là tính năng migrate) hoặc mockup (nếu là tính năng mới).

---

## Danh sách Giai đoạn (Phases)

### Giai đoạn 1: Nền tảng & Khởi động (Foundation)
**Mục tiêu:** Thiết lập kiến trúc lõi & Migrate trang Login.

- 📄 [Chi tiết triển khai](./phase-01/implementation.md)
- ✅ [Checklist kiểm thử](./phase-01/test-checklist.md)

---

### Giai đoạn 2: Website nguyenmanhthuan - Hiển thị cơ bản
**Mục tiêu:** Đưa website `nguyenmanhthuan` vào trong dự án VITA. Hiển thị Trang chủ & Danh sách sản phẩm.

- 📄 [Chi tiết triển khai](./phase-02/implementation.md)
- ✅ [Checklist kiểm thử](./phase-02/test-checklist.md)

---

### Giai đoạn 3: Website nguyenmanhthuan - Thương mại & Tích điểm
**Mục tiêu:** Kích hoạt tính năng mua sắm (E-commerce) và tích hợp hệ thống **Green Points**.

- 📄 [Chi tiết triển khai](./phase-03/implementation.md)
- ✅ [Checklist kiểm thử](./phase-03/test-checklist.md)

---

### Giai đoạn 4: Cổng Hợp Tác Xã (HTX) - Truy cập & Định danh
**Mục tiêu:** Chuyển đổi (Migrate) các trang Đăng ký và Đăng nhập dành riêng cho HTX.

- 📄 [Chi tiết triển khai](./phase-04/implementation.md)
- ✅ [Checklist kiểm thử](./phase-04/test-checklist.md)

---

### Giai đoạn 5: Cổng Hợp Tác Xã (HTX) - Quản trị & Hồ sơ
**Mục tiêu:** Xây dựng Dashboard quản trị cho HTX.

- 📄 [Chi tiết triển khai](./phase-05/implementation.md)
- ✅ [Checklist kiểm thử](./phase-05/test-checklist.md)

---

### Giai đoạn 6: Cổng Hợp Tác Xã (HTX) - Quản lý Xã viên
**Mục tiêu:** Cung cấp công cụ để HTX quản lý danh sách xã viên và các hợp đồng.

- 📄 [Chi tiết triển khai](./phase-06/implementation.md)
- ✅ [Checklist kiểm thử](./phase-06/test-checklist.md)

---

### Giai đoạn 7: Cổng Xã Viên (Member) - Hub & Role Switcher
**Mục tiêu:** Tạo ra một "Cổng thông tin chung" (Member Hub) cho người dùng cá nhân với khả năng chuyển đổi vai trò.

- 📄 [Chi tiết triển khai](./phase-07/implementation.md)
- ✅ [Checklist kiểm thử](./phase-07/test-checklist.md)

---

### Giai đoạn 8: Cổng Xã Viên - Góp vốn (Capital Sub-module)
**Mục tiêu:** Xây dựng phân hệ dành cho Xã viên góp vốn.

- 📄 [Chi tiết triển khai](./phase-08/implementation.md)
- ✅ [Checklist kiểm thử](./phase-08/test-checklist.md)

---

### Giai đoạn 9: Cổng Xã Viên - Tiêu dùng (Consumer Sub-module)
**Mục tiêu:** Xây dựng phân hệ dành cho Xã viên tiêu dùng.

- 📄 [Chi tiết triển khai](./phase-09/implementation.md)
- ✅ [Checklist kiểm thử](./phase-09/test-checklist.md)

---

### Giai đoạn 10: Cổng ESG Doanh nghiệp - Cơ bản
**Mục tiêu:** Cung cấp công cụ cho Doanh nghiệp quản lý các dự án ESG.

- 📄 [Chi tiết triển khai](./phase-10/implementation.md)
- ✅ [Checklist kiểm thử](./phase-10/test-checklist.md)

---

### Giai đoạn 11: Cổng ESG Doanh nghiệp - Nâng cao (Báo cáo & Tín chỉ)
**Mục tiêu:** Tính năng cao cấp cho Doanh nghiệp: Báo cáo dấu chân Carbon và Sàn giao dịch tín chỉ Carbon.

- 📄 [Chi tiết triển khai](./phase-11/implementation.md)
- ✅ [Checklist kiểm thử](./phase-11/test-checklist.md)

---

### Giai đoạn 12: Cổng ESG Cá nhân (Individual)
**Mục tiêu:** Tạo một dashboard tổng hợp cho Cá nhân, nơi họ thấy được toàn bộ đóng góp của mình cho môi trường.

- 📄 [Chi tiết triển khai](./phase-12/implementation.md)
- ✅ [Checklist kiểm thử](./phase-12/test-checklist.md)

---

## 🔄 Lưu ý về Thứ tự Triển khai

**Có thể làm song song:**
- Giai đoạn 2 (nguyenmanhthuan) + Giai đoạn 4 (HTX): Cả 2 không phụ thuộc nhau

**Phải làm tuần tự:**
- Giai đoạn 1 → Tất cả các giai đoạn khác (Core Foundation là nền tảng)
- Giai đoạn 2 → Giai đoạn 3 (nguyenmanhthuan: hiển thị trước, commerce sau)
- Giai đoạn 4 → Giai đoạn 5 → Giai đoạn 6 (HTX: access → dashboard → members)
- Giai đoạn 7 → Giai đoạn 8, 9 (Member: core → capital/consumer)
- Giai đoạn 10 → Giai đoạn 11 (ESG Enterprise: basic → advanced)
- Giai đoạn 8, 9, 10, 11 → Giai đoạn 12 (ESG Individual cần aggregate từ các module khác)

---

## 📊 Timeline Ước tính

| Phase | Thời gian ước tính | Phụ thuộc |
|-------|-------------------|-----------|
| Phase 01 | 2-3 giờ | - |
| Phase 02 | 3-4 giờ | Phase 01 |
| Phase 03 | 4-5 giờ | Phase 02 |
| Phase 04 | 2-3 giờ | Phase 01 |
| Phase 05 | 3-4 giờ | Phase 04 |
| Phase 06 | 4-5 giờ | Phase 05 |
| Phase 07 | 3-4 giờ | Phase 01 |
| Phase 08 | 4-5 giờ | Phase 07 |
| Phase 09 | 4-5 giờ | Phase 07 |
| Phase 10 | 3-4 giờ | Phase 01 |
| Phase 11 | 4-5 giờ | Phase 10 |
| Phase 12 | 5-6 giờ | Phase 08, 09, 10, 11 |

**Tổng thời gian ước tính:** 40-50 giờ (1-2 tuần với 1 developer full-time)
