# PHASE 08: VERIFICATION REPORT - CỔNG XÃ VIÊN GÓP VỐN (CAPITAL)

**Ngày hoàn thành:** 2026-01-26  
**Trạng thái:** ✅ HOÀN THÀNH

---

## Tóm tắt triển khai

### 1. Cấu trúc sub-module `member/capital`
- `src/modules/member/domain/capital.ts` – InvestmentOpportunity, Investment, Portfolio, Dividend, CapitalTransaction
- `src/modules/member/application/CapitalService.ts` – getInvestmentOpportunities, invest, getPortfolio, getDividendHistory, getTransactions (mock)
- `src/modules/member/capital/components/` – InvestmentCard, PortfolioChart
- `src/modules/member/capital/pages/` – CapitalContributionDashboardPage, InvestmentOpportunitiesPage, CapitalPortfolioPage, DividendHistoryPage, CapitalTransactionsPage

### 2. CapitalService
- `getInvestmentOpportunities()` – danh sách dự án đang kêu gọi vốn (mock)
- `invest(opportunityId, amount)` – đăng ký góp vốn (demo, chưa payment gateway)
- `getPortfolio(userId)` – danh mục đầu tư, tổng giá trị, ROI
- `getDividendHistory(userId)` – lịch sử cổ tức, có filter theo dự án
- `getTransactions(userId)` – giao dịch góp vốn / cổ tức, filter theo loại

### 3. Trang & components
- **Capital Dashboard** (`/member-hub/capital`): tổng quan (tổng giá trị, đã góp, ROI), 4 shortcut (Cơ hội, Danh mục, Cổ tức, Giao dịch), PortfolioChart, danh sách gần đây.
- **Investment Opportunities** (`/member-hub/capital/opportunities`): lưới InvestmentCard, nút "Đầu tư ngay" → prompt số tiền → invest (demo).
- **Portfolio** (`/member-hub/capital/portfolio`): thống kê, PortfolioChart, chi tiết từng dự án (đã góp, giá trị hiện tại, ROI, cổ tức tiếp).
- **Dividend History** (`/member-hub/capital/dividends`): bảng cổ tức, filter theo dự án.
- **Transactions** (`/member-hub/capital/transactions`): lịch sử giao dịch, filter theo loại (Góp vốn / Cổ tức / Rút vốn).

### 4. Routing & tích hợp
- `MemberModuleRouter`: thêm routes `capital`, `capital/opportunities`, `capital/portfolio`, `capital/dividends`, `capital/transactions`.
- **MemberHubPage**: nút "Quản lý Danh mục góp vốn" (Góp vốn) → `/member-hub/capital`.

### 5. Verification
- [x] Build thành công
- [x] Dashboard hiển thị đúng số liệu
- [x] Cơ hội đầu tư: danh sách, ROI, thời hạn, đã huy động, nút Đầu tư
- [x] Danh mục: tổng giá trị, ROI, phân bổ (PortfolioChart), chi tiết từng dự án
- [x] Lịch sử cổ tức: bảng, filter theo dự án
- [x] Lịch sử giao dịch: bảng, filter theo loại

---

## Ghi chú
- Dữ liệu mock; chưa kết nối payment gateway. `invest()` chỉ validate và trả stub.
- ROI tính từ `currentValue` vs `invested` trong mock.
- Sẵn sàng Phase 09 (Consumer).

---

## Files thêm/sửa

**Mới:** capital.ts, CapitalService.ts, InvestmentCard, PortfolioChart, 5 capital pages.

**Sửa:** MemberModuleRouter (capital routes), MemberHubPage (nút Góp vốn → `/member-hub/capital`).
