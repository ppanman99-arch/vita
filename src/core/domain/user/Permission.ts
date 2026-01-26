export const Permission = {
  // Farmer permissions
  FARMER_VIEW_DASHBOARD: 'farmer:view:dashboard',
  FARMER_CREATE_DIARY: 'farmer:create:diary',
  FARMER_VIEW_FARM: 'farmer:view:farm',
  FARMER_MANAGE_FARM: 'farmer:manage:farm',
  
  // Investor permissions
  INVESTOR_VIEW_PORTFOLIO: 'investor:view:portfolio',
  INVESTOR_INVEST: 'investor:invest',
  INVESTOR_VIEW_REPORTS: 'investor:view:reports',
  
  // Admin/Cooperative permissions
  ADMIN_MANAGE_MEMBERS: 'admin:manage:members',
  ADMIN_VIEW_DASHBOARD: 'admin:view:dashboard',
  ADMIN_MANAGE_FINANCE: 'admin:manage:finance',
  ADMIN_MANAGE_PRODUCTION: 'admin:manage:production',
  
  // Consumer permissions
  CONSUMER_VIEW_WALLET: 'consumer:view:wallet',
  CONSUMER_MAKE_PURCHASE: 'consumer:make:purchase',
  
  // Enterprise permissions
  ENTERPRISE_VIEW_PROJECTS: 'enterprise:view:projects',
  ENTERPRISE_CREATE_PROJECT: 'enterprise:create:project',
  ENTERPRISE_MANAGE_PROJECTS: 'enterprise:manage:projects',
  
  // Expert permissions
  EXPERT_VIEW_CONSULTATIONS: 'expert:view:consultations',
  EXPERT_CREATE_SOP: 'expert:create:sop',
  
  // Research permissions
  RESEARCH_VIEW_LAB: 'research:view:lab',
  RESEARCH_MANAGE_SEEDS: 'research:manage:seeds',
} as const;

export type Permission = typeof Permission[keyof typeof Permission];
