# PHASE 08: CỔNG XÃ VIÊN - GÓP VỐN (CAPITAL SUB-MODULE) - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Xây dựng phân hệ dành cho Xã viên góp vốn. Cho phép họ xem cơ hội đầu tư và quản lý danh mục đầu tư của mình tại các HTX.

---

## 1. CREATE SUB-MODULE STRUCTURE

```
src/modules/member/
├── capital/
│   ├── pages/
│   │   ├── CapitalContributionDashboardPage.tsx
│   │   ├── InvestmentOpportunitiesPage.tsx
│   │   ├── CapitalPortfolioPage.tsx
│   │   ├── DividendHistoryPage.tsx
│   │   └── CapitalTransactionsPage.tsx
│   └── components/
│       ├── InvestmentCard.tsx
│       └── PortfolioChart.tsx
```

**Action Items:**
- [ ] Create capital subdirectory
- [ ] Create pages structure

---

## 2. CREATE PAGES

### 2.1 Capital Dashboard
- [ ] Overview: Total invested, ROI, portfolio value
- [ ] Stats cards
- [ ] Recent investments

### 2.2 Investment Opportunities
- [ ] List HTX projects open for investment
- [ ] Project details: ROI, duration, target amount
- [ ] Invest button

### 2.3 Portfolio
- [ ] User's capital contributions across HTXs
- [ ] Breakdown by project
- [ ] Performance metrics

### 2.4 Dividend History
- [ ] Dividend/profit distribution history
- [ ] Filters by date, project

### 2.5 Transactions
- [ ] All capital transactions (invest, withdraw, dividend)
- [ ] Transaction details

**Action Items:**
- [ ] Create all 5 pages
- [ ] Design UI/UX

---

## 3. CREATE CAPITAL SERVICE

```typescript
// src/modules/member/application/CapitalService.ts

async getInvestmentOpportunities(): Promise<InvestmentOpportunity[]>
async invest(opportunityId: string, amount: number): Promise<Investment>
async getPortfolio(userId: string): Promise<Portfolio>
async getDividendHistory(userId: string): Promise<Dividend[]>
async getTransactions(userId: string): Promise<Transaction[]>
```

**Action Items:**
- [ ] Create CapitalService
- [ ] Implement all methods
- [ ] Add error handling

---

## 4. VERIFICATION CHECKLIST

- [ ] All 5 pages created
- [ ] Dashboard shows correct data
- [ ] Can view opportunities
- [ ] Can view portfolio
- [ ] Can view dividends
- [ ] Can view transactions
- [ ] Build succeeds

---

## 5. DEPENDENCIES & NOTES

### Dependencies
- Phase 07: Member Core (Role Switcher)

### Notes
- Investment flow sẽ integrate với payment gateway sau
- ROI calculation cần business logic rõ ràng
