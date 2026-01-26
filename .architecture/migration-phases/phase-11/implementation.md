# PHASE 11: CỔNG ESG DOANH NGHIỆP - NÂNG CAO - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Tính năng cao cấp cho Doanh nghiệp: Báo cáo dấu chân Carbon và Sàn giao dịch tín chỉ Carbon (Marketplace).

---

## 1. CREATE NEW PAGES

### 1.1 CarbonReportPage
- [ ] Carbon footprint tracking
- [ ] Reports and analytics
- [ ] Comparison charts
- [ ] Reduction recommendations

### 1.2 CarbonMarketplacePage
- [ ] List carbon credits for sale
- [ ] List carbon credits to buy
- [ ] Trading interface
- [ ] Transaction history

### 1.3 CertificationsPage
- [ ] ESG certifications list
- [ ] Verification status
- [ ] Certificate documents

**Action Items:**
- [ ] Create all 3 pages
- [ ] Design UI/UX

---

## 2. CREATE SERVICES

```typescript
// src/modules/esg-enterprise/application/CarbonService.ts

async calculateCarbonFootprint(enterpriseId: string): Promise<CarbonFootprint>
async generateCarbonReport(enterpriseId: string, period: string): Promise<Report>
async listCarbonCredits(): Promise<CarbonCredit[]>
async buyCarbonCredits(creditId: string, amount: number): Promise<Transaction>
async sellCarbonCredits(amount: number, price: number): Promise<CarbonCredit>
```

**Action Items:**
- [ ] Create CarbonService
- [ ] Implement calculation logic
- [ ] Implement marketplace logic

---

## 3. VERIFICATION CHECKLIST

- [ ] Carbon report generates correctly
- [ ] Marketplace displays credits
- [ ] Can buy/sell credits
- [ ] Certifications display
- [ ] Build succeeds

---

## 4. DEPENDENCIES & NOTES

### Dependencies
- Phase 10: ESG Enterprise Basic

### Notes
- Carbon calculation cần công thức rõ ràng
- Marketplace cần payment integration
