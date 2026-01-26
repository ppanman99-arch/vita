# PHASE 12: CỔNG ESG CÁ NHÂN (INDIVIDUAL) - CHI TIẾT TRIỂN KHAI

**Mục tiêu:** Tạo một dashboard tổng hợp cho Cá nhân, nơi họ thấy được toàn bộ đóng góp của mình cho môi trường (từ việc tiêu dùng xanh, đầu tư xanh đến thói quen sinh hoạt).

---

## 1. CREATE MODULE STRUCTURE

```
src/modules/esg-individual/
├── domain/
│   ├── PersonalESG.ts
│   └── CarbonFootprint.ts
├── application/
│   ├── PersonalESGService.ts
│   ├── ESGInvestmentAggregatorService.ts
│   └── ImpactCalculatorService.ts
├── presentation/
│   ├── pages/
│   │   ├── ESGIndividualDashboardPage.tsx
│   │   ├── CarbonFootprintTrackerPage.tsx
│   │   ├── ESGPortfolioPage.tsx
│   │   ├── GreenImpactPage.tsx
│   │   ├── ESGLearningPage.tsx
│   │   ├── ESGChallengesPage.tsx
│   │   └── ESGCommunityPage.tsx
│   └── components/
│       ├── CarbonFootprintWidget.tsx
│       └── ImpactVisualization.tsx
└── infrastructure/
    └── ESGIndividualModuleRouter.tsx
```

**Action Items:**
- [ ] Create module structure
- [ ] Create all 7 pages

---

## 2. CREATE AGGREGATION SERVICE

### 2.1 ESGInvestmentAggregatorService
```typescript
// Aggregate data from multiple modules:
// - Investor Module: ESG investments
// - Member Module (Capital): ESG contributions
// - Core: Green Points

async getAggregatedESGPortfolio(userId: string): Promise<ESGPortfolio> {
  const [investorESG, memberCapital, greenPoints] = await Promise.all([
    this.investorService.getESGInvestments(userId),
    this.capitalService.getESGContributions(userId),
    this.greenPointsService.getUserGreenPoints(userId),
  ]);
  
  return {
    totalESGValue: investorESG.total + memberCapital.total,
    carbonOffset: this.calculateCarbonOffset(...),
    greenPoints: greenPoints.total,
    impactScore: this.calculateImpactScore(...),
  };
}
```

**Action Items:**
- [ ] Create aggregator service
- [ ] Implement aggregation logic
- [ ] Test data aggregation

---

## 3. CREATE PAGES

### 3.1 ESG Individual Dashboard
- [ ] Impact Score display
- [ ] Aggregated portfolio summary
- [ ] Carbon footprint widget
- [ ] Achievements/badges

### 3.2 Carbon Footprint Tracker
- [ ] Input activities (transport, energy, etc.)
- [ ] Calculate CO2 emissions
- [ ] Charts and trends
- [ ] Offset suggestions

### 3.3 ESG Portfolio
- [ ] All ESG investments from all sources
- [ ] Breakdown by source
- [ ] Performance metrics

### 3.4 Green Impact
- [ ] Impact visualization
- [ ] Trees planted equivalent
- [ ] CO2 offset equivalent
- [ ] Social impact metrics

### 3.5 Learning, Challenges, Community
- [ ] Educational content
- [ ] Gamification (challenges, badges)
- [ ] Leaderboard
- [ ] Community discussions

**Action Items:**
- [ ] Create all 7 pages
- [ ] Design UI/UX (focus on gamification)

---

## 4. VERIFICATION CHECKLIST

- [ ] All 7 pages created
- [ ] Dashboard aggregates data correctly
- [ ] Carbon tracker calculates correctly
- [ ] Impact visualization works
- [ ] Gamification elements work
- [ ] Build succeeds

---

## 5. DEPENDENCIES & NOTES

### Dependencies
- Phase 08: Member Capital
- Phase 09: Member Consumer
- Phase 10-11: ESG Enterprise
- Phase 01: GreenPointsService

### Notes
- This is a NEW module, not a migration
- Focus on user experience and gamification
- Performance: Dashboard should load < 2 seconds
