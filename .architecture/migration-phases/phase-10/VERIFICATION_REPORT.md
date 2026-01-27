# PHASE 10: VERIFICATION REPORT - CỔNG ESG DOANH NGHIỆP CƠ BẢN

**Ngày hoàn thành:** 2026-01-26  
**Trạng thái:** ✅ HOÀN THÀNH

---

## Tóm tắt triển khai

### 1. Module structure
- `src/modules/esg-enterprise/`
  - `domain/`: ESGProject.ts, ESGCertification.ts
  - `application/`: ESGProjectService.ts, ESGReportService.ts
  - `presentation/pages/`: ESGPortalPage, ESGLoginPage, ESGRegisterPage (migrate), ESGDashboardPage, ESGProjectsPage, ESGProjectDetailPage
  - `presentation/components/`: ESGScoreCard.tsx
  - `infrastructure/`: ESGEnterpriseModuleRouter.tsx

### 2. Services
- **ESGProjectService**: getProjects, createProject, updateProject, getProjectById, updateProgress. Mock + localStorage.
- **ESGReportService**: getESGScore (score 0–100, active/completed projects, carbon offset, certifications).

### 3. Migrated pages
- ESGPortalPage, ESGLoginPage, ESGRegisterPage: wrapper re-export từ `@/pages/esg-portal/*`.
- Router dùng lazy import từ module; `/esg-register` giữ nguyên.

### 4. New pages
- **ESGDashboardPage**: ESG Score (ESGScoreCard), carbon offset, certifications, danh sách dự án đang chạy. Link "Xem tất cả" → `/esg-portal/projects`.
- **ESGProjectsPage**: Danh sách dự án, filter (status), search, "Tạo dự án mới" (modal form).
- **ESGProjectDetailPage**: Thông tin dự án, progress bar, metrics (diện tích, CO₂, cây đã trồng), form cập nhật tiến độ (khi status = active).

### 5. Routing
- `/esg-portal`, `/esg-portal/login`, `/esg-register`: giữ như cũ, component từ module.
- Thêm: `/esg-portal/dashboard`, `/esg-portal/projects`, `/esg-portal/projects/:id`.

### 6. Navigation
- Tab "Dashboard ESG" trong ESG Portal có link "Xem Tổng quan ESG (điểm số, chứng nhận, dự án)" → `/esg-portal/dashboard`.

### 7. Verification
- [x] Build thành công
- [x] Dashboard hiển thị ESG score, carbon offset, certifications
- [x] Tạo/xem dự án tại `/esg-portal/projects`
- [x] Cập nhật tiến độ tại `/esg-portal/projects/:id`

---

## Ghi chú
- ESG Score: công thức đơn giản (base + active/completed + carbon tier). Có thể bổ sung logic nghiệp vụ sau.
- Dự án: workflow draft → active → completed; demo dùng localStorage.
- Upload hình minh chứng (evidence) chưa tích hợp; updateProgress nhận `evidenceUrls` tùy chọn.

---

## Files thêm/sửa

**Mới:** ESGProject, ESGCertification, ESGProjectService, ESGReportService, ESGScoreCard, ESGDashboardPage, ESGProjectsPage, ESGProjectDetailPage, ESGEnterpriseModuleRouter, wrappers Portal/Login/Register.

**Sửa:** `router/config.tsx` (ESG routes → module, thêm dashboard/projects), `pages/esg-portal/page.tsx` (link tới Dashboard).

---

Phase 10 hoàn thành. Sẵn sàng Phase 11 (ESG Advanced).
