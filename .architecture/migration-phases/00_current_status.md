# CURRENT PROJECT STATUS & MESS ANALYSIS

> **Ngày phân tích:** 26/01/2026  
> **Mục đích:** Phân tích tình trạng hiện tại của codebase để xác định các vấn đề cần giải quyết trong quá trình migration

---

## 📊 PROJECT INVENTORY

### File Count by Type
```
src/
├── pages/          ~100+ pages (flat structure)
├── components/     ~20 components
├── lib/            ~10 services (greenPoints, supabase, users, etc.)
├── router/         2 files (config.tsx, index.tsx)
└── utils/          ~5 utility files
```

### Lines of Code (Estimated)
- **Total:** ~50,000+ lines
- **Pages:** ~40,000 lines
- **Components:** ~5,000 lines
- **Services:** ~3,000 lines
- **Utils:** ~2,000 lines

### Dependencies (from package.json)
**Core Dependencies:**
- `react`, `react-dom` (v19.1.0)
- `react-router-dom` (v7.6.3)
- `@supabase/supabase-js` (v2.57.4)
- `firebase` (v12.0.0)
- `@stripe/react-stripe-js` (v4.0.2)

**UI Libraries:**
- `recharts` (v3.2.0)
- `lucide-react` (v0.469.0)
- `tailwindcss` (v3.4.17)

---

## 🔴 MESS ANALYSIS

### 1. Tight Coupling Issues

#### Problem: Direct Supabase Calls
**Location:** Throughout `src/pages/` and `src/lib/`

**Example:**
```typescript
// ❌ BAD: Direct Supabase call in page component
import { supabase } from '../../lib/supabase';

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
```

**Impact:**
- Business logic coupled với infrastructure
- Khó test
- Khó thay đổi database provider

**Files Affected:**
- `src/pages/login/page.tsx`
- `src/pages/*/page.tsx` (many pages)

---

#### Problem: Direct GreenPoints Service Calls
**Location:** Multiple pages

**Example:**
```typescript
// ❌ BAD: Direct service call
import { earnPoints } from '../../lib/greenPoints/service';

await earnPoints(userId, 'Purchase', 100, 'purchase', 'consumer-portal');
```

**Files Affected:**
- `src/pages/investor-wallet/page.tsx`
- `src/pages/consumer-wallet/page.tsx`
- `src/pages/farmer-consumer/page.tsx`
- `src/pages/investor-community/page.tsx`
- `src/pages/consumer-community/page.tsx`
- `src/pages/farmer-dashboard/page.tsx`

---

### 2. Duplicate Code Locations

#### Problem: Repeated Auth Logic
**Multiple login pages with similar logic:**
- `src/pages/login/page.tsx`
- `src/pages/htx-brand/login/page.tsx`
- `src/pages/expert-portal/login/page.tsx`
- `src/pages/investor-portal/login/page.tsx`
- `src/pages/esg-portal/login/page.tsx`
- `src/pages/gov-portal/login/page.tsx`
- `src/pages/timber-trading/login/page.tsx`
- `src/pages/vita-supply/login/page.tsx`
- `src/pages/creator-hub/login/page.tsx`

**Impact:**
- Code duplication
- Inconsistent behavior
- Hard to maintain

---

#### Problem: Repeated Portal Switcher
**Location:** Multiple portal pages

**Files:**
- `src/pages/htx-brand/login/page.tsx`
- `src/pages/htx-brand/register/page.tsx`
- `src/pages/vita-supply/register/page.tsx`
- `src/pages/timber-trading/register/page.tsx`
- `src/pages/investor-portal/register/page.tsx`
- `src/pages/creator-hub/register/page.tsx`
- `src/pages/esg-portal/login/page.tsx`
- `src/pages/gov-portal/register/page.tsx`

**Pattern:**
```typescript
import PortalSwitcher from '../../../components/shared/PortalSwitcher';
```

---

### 3. Flat Structure Issues

#### Problem: All Pages in One Directory
**Current Structure:**
```
src/pages/
├── login/
├── farmer-dashboard/
├── farmer-wallet/
├── admin-dashboard/
├── admin-finance/
├── htx-brand/
├── investor-portal/
├── esg-portal/
└── ... (100+ pages)
```

**Issues:**
- No module separation
- Hard to find related pages
- No clear ownership

---

#### Problem: Shared Components Mixed
**Current Structure:**
```
src/components/
├── feature/        (RoleSwitcher, AdminTopBar, etc.)
└── shared/         (BackButton, GreenPointsBadge, etc.)
```

**Issues:**
- Unclear what's truly shared vs feature-specific
- No module-specific components directory

---

### 4. Circular Dependencies (Potential)

#### Risk Areas:
1. **Pages → Components → Services → Pages**
   - Pages import components
   - Components might import services
   - Services might reference pages (navigation)

2. **GreenPoints ↔ VitaScore**
   - `src/lib/greenPoints/service.ts`
   - `src/lib/vitaScore/linkService.ts`
   - Potential circular dependency

---

### 5. Code Smells

#### Smell: God Components
**Example:** `src/pages/onboarding/page.tsx` (3388 lines)
- Too many responsibilities
- Hard to test
- Hard to maintain

**Other Large Files:**
- `src/pages/creator-hub/page.tsx` (2281 lines)
- `src/pages/landing/page.tsx` (1455 lines)
- `src/pages/physician-portal/page.tsx` (3553 lines)

---

#### Smell: Magic Strings
**Location:** Throughout codebase

**Example:**
```typescript
// ❌ BAD: Magic strings
await earnPoints(userId, 'Purchase', 100, 'purchase', 'consumer-portal');
```

**Should be:**
```typescript
// ✅ GOOD: Constants
import { ActivityType, Category, Portal } from '@core/domain/greenPoints';

await earnPoints(userId, ActivityType.PURCHASE, 100, Category.PURCHASE, Portal.CONSUMER);
```

---

#### Smell: Inconsistent Naming
**Examples:**
- `farmer-dashboard` vs `admin-dashboard` (consistent)
- `htx-brand` vs `cooperative-register` (inconsistent - should be `cooperative-*`)
- `member-hub` vs `farmer-*` (inconsistent)

---

### 6. Infrastructure Issues

#### Problem: No Adapter Pattern
**Current:** Direct third-party library usage
- `supabase` used directly
- `firebase` used directly
- No abstraction layer

**Impact:**
- Hard to switch providers
- Hard to mock for testing
- Business logic coupled with infrastructure

---

#### Problem: No Port Interfaces
**Missing:**
- `IAuthPort` (should exist)
- `IPaymentPort` (doesn't exist)
- `IDatabasePort` (doesn't exist)
- `INotificationPort` (doesn't exist)

---

## 📈 RISK ASSESSMENT

### High-Risk Areas

1. **Authentication System**
   - **Risk:** High
   - **Reason:** Used everywhere, many duplicate implementations
   - **Migration Complexity:** Medium
   - **Priority:** Phase 01 ✅

2. **GreenPoints Service**
   - **Risk:** High
   - **Reason:** Used in many modules, no abstraction
   - **Migration Complexity:** Medium
   - **Priority:** Phase 01 ✅

3. **Payment Integration**
   - **Risk:** Medium
   - **Reason:** Not yet abstracted, multiple payment gateways
   - **Migration Complexity:** High
   - **Priority:** Phase 03+ (when needed)

4. **Large Page Components**
   - **Risk:** Medium
   - **Reason:** Hard to refactor, many dependencies
   - **Migration Complexity:** High
   - **Priority:** Phase-by-phase

---

### Migration Complexity Scores

| Module/Feature | Complexity | Dependencies | Risk |
|----------------|-----------|--------------|------|
| Login/Auth | Medium | Core | Low |
| GreenPoints | Medium | Core | Low |
| Farmer Pages | High | Many | Medium |
| Admin Pages | High | Many | Medium |
| HTX/Cooperative | Medium | Auth, Database | Low |
| Investor Portal | Medium | Auth, GreenPoints | Low |
| ESG Portal | Medium | Auth, Database | Low |
| Payment | High | Multiple gateways | High |

---

## 🎯 MIGRATION PRIORITIES

### Phase 01 (Foundation) ✅
- **Focus:** Core architecture
- **Risk:** Low (isolated changes)
- **Impact:** High (enables all other phases)

### Phase 02-03 (nguyenmanhthuan)
- **Focus:** E-commerce module
- **Risk:** Medium (depends on Phase 01)
- **Impact:** Medium (one module)

### Phase 04-06 (Cooperative/HTX)
- **Focus:** Cooperative management
- **Risk:** Medium (depends on Phase 01)
- **Impact:** Medium (one module)

### Phase 07-09 (Member)
- **Focus:** Member hub with role switching
- **Risk:** High (complex context management)
- **Impact:** High (core user experience)

### Phase 10-12 (ESG)
- **Focus:** ESG enterprise & individual
- **Risk:** Medium (depends on Phase 01)
- **Impact:** Medium (one module)

---

## 📝 NOTES

### Current Architecture Pattern
- **Type:** Monolithic (all pages in one directory)
- **State Management:** Local state + some shared services
- **Routing:** React Router with flat structure
- **Styling:** Tailwind CSS

### Target Architecture Pattern
- **Type:** Modular (modules separated)
- **State Management:** Services + Context (planned)
- **Routing:** Module-based routers
- **Styling:** Tailwind CSS (unchanged)

### Key Challenges
1. **Large codebase** (~50K+ lines)
2. **Many duplicate implementations**
3. **Tight coupling** with third-party services
4. **No clear module boundaries**
5. **Inconsistent naming conventions**

### Success Criteria
- ✅ All modules separated
- ✅ No direct third-party calls in business logic
- ✅ Shared services in `@core`
- ✅ Module-specific code in `@modules/{module}`
- ✅ All tests passing
- ✅ No circular dependencies
