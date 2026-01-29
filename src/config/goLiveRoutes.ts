/**
 * Go-Live feature flags: routes that are part of the production-ready scope (Phase 01-12 in .architecture).
 * All other routes are considered Demo (accessible without real database).
 * When VITE_SHOW_DEMO_FEATURES=false, demo-only paths are hidden (redirect to /home).
 */

/** Path prefixes and exact paths that are Live (production-ready). */
const LIVE_PATH_PREFIXES = [
  '/nguyen-manh-thuan',
  '/cooperative',
  '/member-hub',
  '/esg-portal',
  '/esg-individual',
] as const;

const LIVE_EXACT_PATHS = ['/', '/login', '/home', '/htx-benefits'] as const;

/** Path prefixes that are Demo-only; when VITE_SHOW_DEMO_FEATURES=false these are hidden. */
export const DEMO_ONLY_PREFIXES = [
  '/member-hub/consumer',
  '/admin-production',
  '/admin-warehouse',
  '/admin-gis',
  '/admin-finance',
  '/admin-expert',
  '/admin-opportunities',
  '/admin-forest-funding',
  '/admin-land-audit',
  '/admin-subscription',
  '/admin-skills',
  '/admin-api-integration',
  '/admin-reports',
  '/admin-map',
  '/farmer',
  '/seed-marketplace',
  '/vita-supply',
  '/research-lab',
  '/gene-nursery-hub',
  '/enterprise-',
  '/investor-portal',
  '/physician-',
  '/gov-',
  '/greenlight-command',
  '/onboarding',
  '/onboarding-gateway',
  '/forest-owner-register',
  '/landing',
  '/coop-detail',
  '/coop-marketplace',
  '/timber-trading',
  '/expert-portal',
  '/expert-marketplace',
  '/partner-dashboard',
  '/partner-order',
  '/partner-traceability',
  '/factory-portal',
  '/hospital-portal',
  '/diary',
  '/digital-harvest',
  '/offtake-booking',
  '/input-sourcing',
  '/inventory',
  '/monitoring',
  '/policy-support',
  '/product-trace',
  '/profit-split',
  '/quality-gate',
  '/reinvestment-loop',
  '/research-partner-register',
  '/seed-listing',
  '/smart-disbursement',
  '/task-allocator',
  '/trade-execution',
  '/vita-green-dashboard',
  '/wallet',
  '/consumer-community',
  '/consumer-wallet',
  '/creator-hub',
  '/crowd-investment',
  '/dashboard',
  '/escrow-wallet',
  '/farmer-alerts',
  '/farmer-consumer',
  '/farmer-dashboard',
  '/farmer-diary',
  '/farmer-farm',
  '/farmer-farm-community',
  '/farmer-forestry',
  '/farmer-investor',
  '/farmer-producer',
  '/farmer-resource',
  '/farmer-scan',
  '/farmer-service',
  '/farmer-service-community',
  '/farmer-skill-bank',
  '/farmer-wallet',
  '/htx-brand',
  '/investor-about',
  '/investor-community',
  '/investor-home',
  '/investor-wallet',
  '/land-digitization',
  '/my-farm',
] as const;

/**
 * Returns true if the given pathname is Demo-only and should be hidden when VITE_SHOW_DEMO_FEATURES=false.
 */
export function isDemoOnlyRoute(pathname: string): boolean {
  const normalized = pathname.replace(/\?.*$/, '').replace(/#.*$/, '') || '/';
  return DEMO_ONLY_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(prefix + '/')
  );
}

/**
 * Returns true if the given pathname belongs to a Live (go-live) feature; otherwise Demo.
 */
export function isLiveRoute(pathname: string): boolean {
  const normalized = pathname.replace(/\?.*$/, '').replace(/#.*$/, '') || '/';
  if (LIVE_EXACT_PATHS.includes(normalized as (typeof LIVE_EXACT_PATHS)[number])) {
    return true;
  }
  return LIVE_PATH_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(prefix + '/'));
}

export type FeatureBadgeVariant = 'live' | 'demo';

/**
 * Returns the badge variant for a given pathname.
 */
export function getBadgeVariantForPath(pathname: string): FeatureBadgeVariant {
  return isLiveRoute(pathname) ? 'live' : 'demo';
}

/**
 * Returns true if the route should be visible in nav when demo features are off.
 * Demo-only routes are hidden when VITE_SHOW_DEMO_FEATURES=false.
 */
export function isRouteVisibleInNav(pathname: string, showDemo: boolean): boolean {
  if (showDemo) return true;
  return !isDemoOnlyRoute(pathname);
}
