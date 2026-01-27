# PHASE 11: VERIFICATION REPORT - CỔNG ESG DOANH NGHIỆP NÂNG CAO

**Ngày hoàn thành:** 2026-01-26  
**Trạng thái:** ✅ HOÀN THÀNH

---

## Tóm tắt triển khai

### 1. Domain & services
- **domain/carbon.ts**: CarbonFootprint, CarbonReport, CarbonCredit, CarbonTransaction.
- **CarbonService**: calculateCarbonFootprint, generateCarbonReport, listCarbonCredits, buyCarbonCredits, sellCarbonCredits, getTransactionHistory. Mock + localStorage.

### 2. New pages
- **CarbonReportPage** (`/esg-portal/carbon-report`): Dấu chân carbon (tổng, quota, Scope 1/2/3), biểu đồ phát thải theo tháng vs hạn mức (BarChart), so sánh theo kỳ, gợi ý giảm phát thải, nút "Mua tín chỉ Carbon để bù đắp" → marketplace.
- **CarbonMarketplacePage** (`/esg-portal/marketplace`): Tab Mua / Đăng bán / Lịch sử. Mua: danh sách tín chỉ, nhập số tấn, Mua. Đăng bán: form số lượng + đơn giá, Đăng tin. Lịch sử: danh sách giao dịch mua/bán.
- **CertificationsPage** (`/esg-portal/certifications`): Danh sách chứng nhận ESG (từ ESGReportService), trạng thái "Đã xác minh", hết hạn (nếu có).

### 3. Routing & navigation
- Thêm routes: `/esg-portal/carbon-report`, `/esg-portal/marketplace`, `/esg-portal/certifications`.
- Dashboard ESG: 3 nút nhanh "Báo cáo Carbon", "Sàn Tín chỉ Carbon", "Chứng nhận ESG"; block Chứng nhận có thể click vào từng cert → CertificationsPage.

### 4. Verification
- [x] Build thành công
- [x] Báo cáo Carbon có biểu đồ, so sánh, gợi ý
- [x] Marketplace: mua, đăng bán, lịch sử
- [x] Certifications hiển thị đúng

---

## Ghi chú
- Carbon calculation: công thức đơn giản (footprint mock); báo cáo kỳ có thể chọn Q.
- Marketplace: chưa tích hợp thanh toán; mua/bán ghi nhận localStorage.
- Certifications: lấy từ ESGReportService.getESGScore().certifications.

---

## Files thêm/sửa

**Mới:** domain/carbon.ts, CarbonService, CarbonReportPage, CarbonMarketplacePage, CertificationsPage.

**Sửa:** router/config.tsx (thêm 3 route), ESGDashboardPage (quick links + click cert → certifications).

---

Phase 11 hoàn thành. Sẵn sàng Phase 12 (ESG Individual).
