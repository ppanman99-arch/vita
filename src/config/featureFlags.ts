/**
 * Feature flags for go-live and demo behavior.
 * VITE_USE_REAL_AUTH: use Supabase Auth for login/register (HTX, member).
 * VITE_SHOW_DEMO_FEATURES: when false, hide demo routes/menu.
 */

export const useRealAuth = (): boolean =>
  import.meta.env.VITE_USE_REAL_AUTH === 'true' || import.meta.env.VITE_USE_REAL_AUTH === true;

export const showDemoFeatures = (): boolean => {
  const v = import.meta.env.VITE_SHOW_DEMO_FEATURES;
  if (v === 'false' || v === false) return false;
  return true; // default: show demo
};
