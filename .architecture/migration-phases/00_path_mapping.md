# ATOMIC ACTION PLAN - PATH MAPPING

> **Ngày tạo:** 26/01/2026  
> **Mục đích:** Bảng mapping chi tiết old paths → new paths cho từng phase

---

## 📋 FILE MIGRATION TABLE

### Phase 01: Core Foundation

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/login/page.tsx` | `src/pages/login/page.tsx` | **Refactor** (keep location, change implementation) | Use `@core/application/auth/AuthService` instead of direct Supabase | Phase 01 |
| `src/lib/supabase.ts` | `src/core/infrastructure/adapters/auth/SupabaseAuthAdapter.ts` | **Move & Refactor** | Create adapter implementing `IAuthPort` | Phase 01 |
| N/A | `src/core/domain/user/User.ts` | **Create** | New domain entity | Phase 01 |
| N/A | `src/core/domain/user/Role.ts` | **Create** | New domain entity | Phase 01 |
| N/A | `src/core/domain/user/Permission.ts` | **Create** | New domain entity | Phase 01 |
| N/A | `src/core/infrastructure/ports/IAuthPort.ts` | **Create** | New port interface | Phase 01 |
| N/A | `src/core/application/auth/AuthService.ts` | **Create** | New application service | Phase 01 |

**Breaking Changes:**
- All direct `supabase.auth.*` calls must be replaced with `AuthService`
- All imports of `supabase` from `../../lib/supabase` must be updated

---

### Phase 02: nguyenmanhthuan - Basic Display

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `nguyenmanhthuan-repo/src/pages/HomePage.tsx` | `src/modules/nguyenmanhthuan/presentation/pages/HomePage.tsx` | **Move** | Update relative imports | Phase 02 |
| `nguyenmanhthuan-repo/src/pages/ProductsPage.tsx` | `src/modules/nguyenmanhthuan/presentation/pages/ProductsPage.tsx` | **Move** | Update relative imports | Phase 02 |
| `nguyenmanhthuan-repo/src/pages/ProductDetailPage.tsx` | `src/modules/nguyenmanhthuan/presentation/pages/ProductDetailPage.tsx` | **Move** | Update relative imports | Phase 02 |
| `nguyenmanhthuan-repo/src/components/*` | `src/modules/nguyenmanhthuan/presentation/components/*` | **Move** | Update relative imports | Phase 02 |
| `nguyenmanhthuan-repo/public/images/*` | `src/modules/nguyenmanhthuan/assets/images/*` | **Move** | Update image paths in code | Phase 02 |
| N/A | `src/modules/nguyenmanhthuan/infrastructure/NguyenManhthuanModuleRouter.tsx` | **Create** | New module router | Phase 02 |

**Import Changes Required:**
```typescript
// BEFORE
import { supabase } from '../../lib/supabase';

// AFTER
import { AuthService } from '@core/application/auth/AuthService';
```

---

### Phase 03: nguyenmanhthuan - Commerce

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `nguyenmanhthuan-repo/src/pages/CartPage.tsx` | `src/modules/nguyenmanhthuan/presentation/pages/CartPage.tsx` | **Move** | Update imports | Phase 03 |
| `nguyenmanhthuan-repo/src/pages/CheckoutPage.tsx` | `src/modules/nguyenmanhthuan/presentation/pages/CheckoutPage.tsx` | **Move** | Update imports | Phase 03 |
| `src/lib/greenPoints/service.ts` | `src/core/application/shared/GreenPointsService.ts` | **Move & Refactor** | Update all `earnPoints` calls | Phase 03 |
| N/A | `src/core/infrastructure/ports/IPaymentPort.ts` | **Create** | New port interface | Phase 03 |
| N/A | `src/core/infrastructure/adapters/payment/VNPayAdapter.ts` | **Create** | New adapter | Phase 03 |
| N/A | `src/core/application/shared/PaymentService.ts` | **Create** | New service | Phase 03 |

**GreenPoints Migration:**
```typescript
// BEFORE
import { earnPoints } from '../../lib/greenPoints/service';
await earnPoints(userId, 'Purchase', 100, 'purchase', 'consumer-portal');

// AFTER
import { GreenPointsService } from '@core/application/shared/GreenPointsService';
const greenPointsService = new GreenPointsService();
await greenPointsService.earnPoints(userId, 'consumer', 100, 'Purchase', 'purchase', 'nguyenmanhthuan');
```

---

### Phase 04: Cooperative - Access

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/cooperative-register/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeRegisterPage.tsx` | **Move** | Update imports | Phase 04 |
| `src/pages/htx-brand/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativePortalPage.tsx` | **Move** | Update imports | Phase 04 |
| `src/pages/htx-brand/login/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeLoginPage.tsx` | **Move** | Update imports | Phase 04 |
| `src/pages/htx-brand/register/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeRegisterAccountPage.tsx` | **Move** | Update imports | Phase 04 |
| `src/pages/htx-landing/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeLandingPage.tsx` | **Move** | Update imports | Phase 04 |
| `src/pages/htx-brand/components/BrandTopBar.tsx` | `src/modules/cooperative/presentation/components/BrandTopBar.tsx` | **Move** | Update imports | Phase 04 |
| N/A | `src/modules/cooperative/domain/Cooperative.ts` | **Create** | New domain entity | Phase 04 |
| N/A | `src/modules/cooperative/application/CooperativeService.ts` | **Create** | New service | Phase 04 |
| N/A | `src/modules/cooperative/infrastructure/CooperativeModuleRouter.tsx` | **Create** | New router | Phase 04 |

**Router Update:**
```typescript
// src/router/config.tsx
// REMOVE old routes:
// - /cooperative-register
// - /htx-brand/*
// - /htx-landing

// ADD new routes:
import { cooperativeRoutes } from '@modules/cooperative/infrastructure/CooperativeModuleRouter';
```

---

### Phase 05-06: Cooperative - Dashboard & Members

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/admin-dashboard/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeDashboardPage.tsx` | **Move** (partial - HTX-specific parts) | Update imports | Phase 05 |
| `src/pages/admin-members/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeMembersPage.tsx` | **Move** | Update imports | Phase 06 |
| `src/pages/admin-finance/page.tsx` | `src/modules/cooperative/presentation/pages/CooperativeFinancePage.tsx` | **Move** (partial) | Update imports | Phase 05 |
| N/A | `src/modules/cooperative/domain/CooperativeMember.ts` | **Create** | New domain entity | Phase 06 |
| N/A | `src/modules/cooperative/application/CooperativeMemberService.ts` | **Create** | New service | Phase 06 |

**Note:** `admin-*` pages might be shared between HTX and other admin roles. Need careful analysis.

---

### Phase 07: Member - Hub & Role Switcher

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/member-hub/page.tsx` | `src/modules/member/presentation/pages/MemberHubPage.tsx` | **Move** | Update imports | Phase 07 |
| `src/pages/member-hub/notifications/page.tsx` | `src/modules/member/presentation/pages/MemberNotificationsPage.tsx` | **Move** | Update imports | Phase 07 |
| `src/components/feature/RoleSwitcher.tsx` | `src/modules/member/presentation/components/RoleSwitcher.tsx` | **Move & Refactor** | Use `@core/application/context/ContextManager` | Phase 07 |
| N/A | `src/core/domain/context/UserContext.ts` | **Create** | New domain entity | Phase 07 |
| N/A | `src/core/application/context/ContextManager.ts` | **Create** | New service | Phase 07 |
| N/A | `src/modules/member/domain/Member.ts` | **Create** | New domain entity | Phase 07 |
| N/A | `src/modules/member/application/MemberService.ts` | **Create** | New service | Phase 07 |
| N/A | `src/modules/member/infrastructure/MemberModuleRouter.tsx` | **Create** | New router | Phase 07 |

**RoleSwitcher Refactor:**
```typescript
// BEFORE
// Direct state management in component

// AFTER
import { useContextManager } from '@core/application/context/useContextManager';
const { switchContext, currentContext } = useContextManager();
```

---

### Phase 08-09: Member - Capital & Consumer

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/farmer-investor/page.tsx` | `src/modules/member/presentation/pages/MemberCapitalPage.tsx` | **Move** | Update imports | Phase 08 |
| `src/pages/investor-wallet/page.tsx` | `src/modules/member/presentation/pages/MemberInvestorWalletPage.tsx` | **Move** | Update imports | Phase 08 |
| `src/pages/investor-community/page.tsx` | `src/modules/member/presentation/pages/MemberInvestorCommunityPage.tsx` | **Move** | Update imports | Phase 08 |
| `src/pages/farmer-consumer/page.tsx` | `src/modules/member/presentation/pages/MemberConsumerPage.tsx` | **Move** | Update imports | Phase 09 |
| `src/pages/consumer-wallet/page.tsx` | `src/modules/member/presentation/pages/MemberConsumerWalletPage.tsx` | **Move** | Update imports | Phase 09 |
| `src/pages/consumer-community/page.tsx` | `src/modules/member/presentation/pages/MemberConsumerCommunityPage.tsx` | **Move** | Update imports | Phase 09 |

**GreenPoints Updates:**
All these pages use `earnPoints` - need to update to use `GreenPointsService` (from Phase 03).

---

### Phase 10-11: ESG Enterprise

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/esg-portal/page.tsx` | `src/modules/esg-enterprise/presentation/pages/ESGPortalPage.tsx` | **Move** | Update imports | Phase 10 |
| `src/pages/esg-portal/login/page.tsx` | `src/modules/esg-enterprise/presentation/pages/ESGLoginPage.tsx` | **Move** | Update imports | Phase 10 |
| `src/pages/esg-portal/register/page.tsx` | `src/modules/esg-enterprise/presentation/pages/ESGRegisterPage.tsx` | **Move** | Update imports | Phase 10 |
| `src/pages/esg-project-creation/page.tsx` | `src/modules/esg-enterprise/presentation/pages/ESGProjectCreationPage.tsx` | **Move** | Update imports | Phase 10 |
| N/A | `src/modules/esg-enterprise/presentation/pages/ESGDashboardPage.tsx` | **Create** | New page | Phase 10 |
| N/A | `src/modules/esg-enterprise/presentation/pages/ESGProjectsPage.tsx` | **Create** | New page | Phase 10 |
| N/A | `src/modules/esg-enterprise/domain/ESGProject.ts` | **Create** | New domain entity | Phase 10 |
| N/A | `src/modules/esg-enterprise/application/ESGProjectService.ts` | **Create** | New service | Phase 10 |
| N/A | `src/modules/esg-enterprise/infrastructure/ESGEnterpriseModuleRouter.tsx` | **Create** | New router | Phase 10 |

---

### Phase 12: ESG Individual

| Old Path | New Path | Action | Import Changes | Status |
|----------|----------|--------|----------------|--------|
| `src/pages/vita-green-dashboard/page.tsx` | `src/modules/esg-individual/presentation/pages/ESGIndividualDashboardPage.tsx` | **Move** | Update imports | Phase 12 |
| N/A | `src/modules/esg-individual/domain/ESGContribution.ts` | **Create** | New domain entity | Phase 12 |
| N/A | `src/modules/esg-individual/application/ESGIndividualService.ts` | **Create** | New service | Phase 12 |
| N/A | `src/modules/esg-individual/infrastructure/ESGIndividualModuleRouter.tsx` | **Create** | New router | Phase 12 |

**Dependencies:**
- Needs to aggregate data from `esg-enterprise` module
- Needs `GreenPointsService` from core

---

## 🔄 SHARED SERVICES MIGRATION

### GreenPoints Service

| Old Path | New Path | Files Affected | Status |
|----------|----------|----------------|--------|
| `src/lib/greenPoints/service.ts` | `src/core/application/shared/GreenPointsService.ts` | 10+ pages | Phase 03 |
| `src/lib/greenPoints/types.ts` | `src/core/domain/greenPoints/GreenPoints.ts` | 10+ pages | Phase 03 |
| `src/lib/greenPoints/helpers.ts` | `src/core/application/shared/GreenPointsService.ts` (merge) | 5+ pages | Phase 03 |
| `src/lib/greenPoints/realtimeService.ts` | `src/core/infrastructure/adapters/greenPoints/GreenPointsRealtimeAdapter.ts` | 3+ pages | Phase 03 |

**Files to Update:**
- `src/pages/investor-wallet/page.tsx`
- `src/pages/consumer-wallet/page.tsx`
- `src/pages/farmer-consumer/page.tsx`
- `src/pages/investor-community/page.tsx`
- `src/pages/consumer-community/page.tsx`
- `src/pages/farmer-dashboard/page.tsx`
- `src/pages/member-hub/page.tsx`
- `src/pages/vita-green-dashboard/page.tsx`

---

### VitaScore Service

| Old Path | New Path | Files Affected | Status |
|----------|----------|----------------|--------|
| `src/lib/vitaScore/linkService.ts` | `src/core/application/shared/VitaScoreService.ts` | 5+ pages | Phase 07 |
| `src/lib/vitaScore/types.ts` | `src/core/domain/vitaScore/VitaScore.ts` | 5+ pages | Phase 07 |
| `src/lib/vitaScore/index.ts` | `src/core/application/shared/VitaScoreService.ts` (merge) | 3+ pages | Phase 07 |

**Files to Update:**
- `src/pages/member-hub/page.tsx`
- `src/pages/investor-home/page.tsx`
- `src/pages/vita-green-dashboard/page.tsx`

---

## 📝 IMPORT UPDATE PATTERNS

### Pattern 1: Supabase → AuthService
```typescript
// BEFORE
import { supabase } from '../../lib/supabase';
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// AFTER
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';
const authService = new AuthService(new SupabaseAuthAdapter());
const result = await authService.signIn({ email, password });
```

### Pattern 2: GreenPoints → GreenPointsService
```typescript
// BEFORE
import { earnPoints } from '../../lib/greenPoints/service';
await earnPoints(userId, 'Purchase', 100, 'purchase', 'consumer-portal');

// AFTER
import { GreenPointsService } from '@core/application/shared/GreenPointsService';
const greenPointsService = new GreenPointsService();
await greenPointsService.earnPoints(userId, 'consumer', 100, 'Purchase', 'purchase', 'nguyenmanhthuan');
```

### Pattern 3: Relative Imports → Path Aliases
```typescript
// BEFORE
import Header from '../../../components/shared/Header';

// AFTER (if in same module)
import Header from '../components/Header';

// AFTER (if from core)
import { AuthService } from '@core/application/auth/AuthService';
```

---

## ✅ VERIFICATION CHECKLIST

### After Each Phase:
- [ ] All old paths removed or marked as deprecated
- [ ] All new paths created
- [ ] All imports updated
- [ ] TypeScript compilation succeeds
- [ ] No broken references
- [ ] Router updated
- [ ] Tests updated (if any)

### Final Verification:
- [ ] No references to old paths
- [ ] All modules use `@core/*` for shared services
- [ ] All modules use `@modules/{module}/*` for module-specific code
- [ ] No circular dependencies
- [ ] All third-party calls go through adapters

---

## 📊 MIGRATION PROGRESS TRACKER

| Phase | Files Moved | Files Created | Files Refactored | Status |
|-------|-------------|---------------|------------------|--------|
| Phase 01 | 0 | 7 | 1 | ⏳ Pending |
| Phase 02 | ~10 | 1 | 0 | ⏳ Pending |
| Phase 03 | ~5 | 3 | ~10 | ⏳ Pending |
| Phase 04 | ~6 | 3 | 0 | ⏳ Pending |
| Phase 05-06 | ~3 | 2 | 0 | ⏳ Pending |
| Phase 07 | ~3 | 5 | 1 | ⏳ Pending |
| Phase 08-09 | ~6 | 0 | ~6 | ⏳ Pending |
| Phase 10-11 | ~4 | 6 | 0 | ⏳ Pending |
| Phase 12 | ~1 | 3 | 0 | ⏳ Pending |

**Total Estimated:**
- **Files to Move:** ~38
- **Files to Create:** ~27
- **Files to Refactor:** ~18
- **Total Changes:** ~83 files
