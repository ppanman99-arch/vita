# PHASE 10: CỔNG ESG DOANH NGHIỆP - CƠ BẢN - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Cung cấp công cụ cho Doanh nghiệp quản lý các dự án ESG (Môi trường - Xã hội - Quản trị) và hồ sơ năng lực xanh.

---

## 1. CREATE MODULE STRUCTURE

```
src/modules/esg-enterprise/
├── domain/
│   ├── ESGProject.ts
│   └── ESGCertification.ts
├── application/
│   ├── ESGProjectService.ts
│   └── ESGReportService.ts
├── presentation/
│   ├── pages/
│   │   ├── ESGPortalPage.tsx (migrate)
│   │   ├── ESGLoginPage.tsx (migrate)
│   │   ├── ESGRegisterPage.tsx (migrate)
│   │   ├── ESGDashboardPage.tsx (new)
│   │   ├── ESGProjectsPage.tsx (new)
│   │   └── ESGProjectDetailPage.tsx (new)
│   └── components/
│       └── ESGScoreCard.tsx
└── infrastructure/
    └── ESGEnterpriseModuleRouter.tsx
```

**Action Items:**
- [ ] Create module structure
- [ ] Migrate existing pages

---

## 2. CREATE NEW PAGES

### 2.1 ESG Dashboard
- [ ] ESG Score display
- [ ] Active projects summary
- [ ] Carbon offset summary
- [ ] Certifications badges

### 2.2 ESG Projects Page
- [ ] List all ESG projects
- [ ] CRUD operations
- [ ] Status filters
- [ ] Search functionality

### 2.3 Project Detail Page
- [ ] Project information
- [ ] Timeline/progress
- [ ] Metrics and KPIs
- [ ] Update progress form

**Action Items:**
- [ ] Create all new pages
- [ ] Design UI/UX

---

## 3. CREATE ESG SERVICES

```typescript
// src/modules/esg-enterprise/application/ESGProjectService.ts

async createProject(data: Partial<ESGProject>): Promise<ESGProject>
async updateProject(id: string, data: Partial<ESGProject>): Promise<ESGProject>
async getProjects(enterpriseId: string): Promise<ESGProject[]>
async updateProgress(projectId: string, progress: number): Promise<void>
```

**Action Items:**
- [ ] Create ESGProjectService
- [ ] Implement CRUD methods
- [ ] Add progress tracking

---

## 4. VERIFICATION CHECKLIST

- [ ] All pages created
- [ ] Dashboard shows ESG score
- [ ] Can create/view projects
- [ ] Can update project progress
- [ ] Build succeeds

---

## 5. DEPENDENCIES & NOTES

### Dependencies
- Phase 01: Core Foundation

### Notes
- ESG Score calculation logic cần rõ ràng
- Project status workflow: draft → active → completed
