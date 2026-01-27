import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const MemberHubPage = lazy(() => import('../presentation/pages/MemberHubPage'));
const MemberNotificationsPage = lazy(() => import('../presentation/pages/MemberNotificationsPage'));
const CapitalContributionDashboardPage = lazy(() => import('../capital/pages/CapitalContributionDashboardPage'));
const InvestmentOpportunitiesPage = lazy(() => import('../capital/pages/InvestmentOpportunitiesPage'));
const CapitalPortfolioPage = lazy(() => import('../capital/pages/CapitalPortfolioPage'));
const DividendHistoryPage = lazy(() => import('../capital/pages/DividendHistoryPage'));
const CapitalTransactionsPage = lazy(() => import('../capital/pages/CapitalTransactionsPage'));
const ConsumerDashboardPage = lazy(() => import('../consumer/pages/ConsumerDashboardPage'));
const ProductCatalogPage = lazy(() => import('../consumer/pages/ProductCatalogPage'));
const PurchaseHistoryPage = lazy(() => import('../consumer/pages/PurchaseHistoryPage'));
const MemberVouchersPage = lazy(() => import('../consumer/pages/MemberVouchersPage'));
const RewardsPage = lazy(() => import('../consumer/pages/RewardsPage'));

export const memberRoutes: RouteObject[] = [
  {
    path: '/member-hub',
    children: [
      { index: true, element: <MemberHubPage /> },
      { path: 'notifications', element: <MemberNotificationsPage /> },
      { path: 'capital', element: <CapitalContributionDashboardPage /> },
      { path: 'capital/opportunities', element: <InvestmentOpportunitiesPage /> },
      { path: 'capital/portfolio', element: <CapitalPortfolioPage /> },
      { path: 'capital/dividends', element: <DividendHistoryPage /> },
      { path: 'capital/transactions', element: <CapitalTransactionsPage /> },
      { path: 'consumer', element: <ConsumerDashboardPage /> },
      { path: 'consumer/catalog', element: <ProductCatalogPage /> },
      { path: 'consumer/history', element: <PurchaseHistoryPage /> },
      { path: 'consumer/vouchers', element: <MemberVouchersPage /> },
      { path: 'consumer/rewards', element: <RewardsPage /> },
    ],
  },
];
