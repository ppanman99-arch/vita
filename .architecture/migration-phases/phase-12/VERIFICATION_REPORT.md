# PHASE 12: VERIFICATION REPORT - CỔNG ESG CÁ NHÂN (INDIVIDUAL)

**Ngày hoàn thành:** 2026-01-26  
**Trạng thái:** ✅ HOÀN THÀNH

---

## Tóm tắt triển khai

### 1. Module structure
- `src/modules/esg-individual/`
  - **domain/**: PersonalESG.ts (profile, badges, portfolio types), CarbonFootprint.ts (activities, emission factors)
  - **application/**: PersonalESGService, ESGInvestmentAggregatorService, ImpactCalculatorService, CarbonFootprintService
  - **presentation/pages/**: ESGIndividualDashboardPage, CarbonFootprintTrackerPage, ESGPortfolioPage, GreenImpactPage, ESGLearningPage, ESGChallengesPage, ESGCommunityPage
  - **presentation/components/**: CarbonFootprintWidget, ImpactVisualization
  - **infrastructure/**: ESGIndividualModuleRouter.tsx

### 2. Aggregation & services
- **ESGInvestmentAggregatorService**: Gọi `CapitalService.getPortfolio()` và `getUserGreenPoints()` (lib), tổng hợp totalESGValue, totalGreenPoints, carbonOffsetTonnes, impactScore, items theo nguồn (capital, consumer).
- **ImpactCalculatorService**: Tính impact score 0–100, trees equivalent, carbon offset từ giá trị đầu tư.
- **CarbonFootprintService**: Get/add hoạt động (lưu localStorage), get footprint theo kỳ, emission factors (xe máy, điện, bữa ăn), gợi ý bù đắp (cây, điểm).

### 3. Pages (7 trang)
- **ESGIndividualDashboardPage** (`/esg-individual`): Cấp độ Công dân Xanh, Impact Score, VNĐ đầu tư xanh, Điểm Xanh, CarbonFootprintWidget, ImpactVisualization, huy hiệu, 4 nút (Danh mục ESG, Tác động Xanh, Học tập, Cộng đồng).
- **CarbonFootprintTrackerPage** (`/esg-individual/carbon`): Tổng phát thải kỳ, xu hướng (biểu đồ), gợi ý bù đắp, thêm hoạt động (xe máy, ô tô, điện, bữa ăn), lịch sử hoạt động.
- **ESGPortfolioPage** (`/esg-individual/portfolio`): Tổng giá trị, Điểm Xanh, breakdown theo nguồn, danh sách chi tiết; link Hub Xã viên & Dashboard ESG.
- **GreenImpactPage** (`/esg-individual/impact`): Impact visualization (cây tương đương, CO₂ bù, progress bar), ý nghĩa chỉ số.
- **ESGLearningPage** (`/esg-individual/learning`): Danh sách bài đọc (ESG, đầu tư xanh, dấu chân carbon, SDG).
- **ESGChallengesPage** (`/esg-individual/challenges`): Thử thách tuần (tiến độ + điểm thưởng), huy hiệu (đã đạt / chưa đạt).
- **ESGCommunityPage** (`/esg-individual/community`): Bảng xếp hạng Impact, chủ đề thảo luận.

### 4. Routing & navigation
- Routes: `/esg-individual`, `/esg-individual/carbon`, `/esg-individual/portfolio`, `/esg-individual/impact`, `/esg-individual/learning`, `/esg-individual/challenges`, `/esg-individual/community`.
- **Member Hub**: Thẻ "ESG Cá nhân" (full-width) với nút "Mở ESG Cá nhân" → `navigate('/esg-individual')`.

### 5. Verification
- [x] Build thành công
- [x] 7 trang tạo đủ, điều hướng nội bộ đúng
- [x] Dashboard tổng hợp portfolio (Capital + Green Points), impact score, footprint widget
- [x] Carbon tracker: thêm hoạt động, tính CO₂, gợi ý bù đắp
- [x] Impact visualization: cây tương đương, CO₂ bù, score
- [x] Gamification: badges, challenges, leaderboard (UI mock)
- [x] Link "ESG Cá nhân" trên Member Hub → `/esg-individual`

---

## Ghi chú

- Portfolio aggregation dùng `CapitalService` (member) và `getUserGreenPoints` (lib); chưa tích hợp "Investor ESG" riêng.
- Dữ liệu carbon footprint lưu `localStorage` theo userId; badges/challenges/leaderboard dùng mock.
- Phase 12 là module mới (Cổng ESG Cá nhân), không migration; phụ thuộc Phase 08 (Capital), Phase 09 (Consumer/Green Points), Phase 10–11 (ESG Enterprise).

---

## Files thêm/sửa

**Mới:**  
domain/PersonalESG.ts, CarbonFootprint.ts  
application/PersonalESGService, ESGInvestmentAggregatorService, ImpactCalculatorService, CarbonFootprintService  
presentation/components/CarbonFootprintWidget, ImpactVisualization  
presentation/pages/ (7 pages)  
infrastructure/ESGIndividualModuleRouter.tsx  

**Sửa:**  
router/config.tsx (thêm 7 route ESG Individual)  
MemberHubPage.tsx (thêm thẻ ESG Cá nhân + navigate /esg-individual)

---

Phase 12 hoàn thành. Cổng ESG Cá nhân sẵn sàng sử dụng từ Member Hub.
