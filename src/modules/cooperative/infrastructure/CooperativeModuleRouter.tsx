import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const CooperativeLandingPage = lazy(() => import('../presentation/pages/CooperativeLandingPage'));
const CooperativeLoginPage = lazy(() => import('../presentation/pages/CooperativeLoginPage'));
const CooperativeRegisterAccountPage = lazy(() => import('../presentation/pages/CooperativeRegisterAccountPage'));
const CooperativePortalPage = lazy(() => import('../presentation/pages/CooperativePortalPage'));
const CooperativeDashboardPage = lazy(() => import('../presentation/pages/CooperativeDashboardPage'));
const CooperativeProfilePage = lazy(() => import('../presentation/pages/CooperativeProfilePage'));

export const cooperativeRoutes: RouteObject[] = [
  {
    path: '/cooperative',
    children: [
      { path: 'landing/:coopId?', element: <CooperativeLandingPage /> },
      { path: 'login', element: <CooperativeLoginPage /> },
      { path: 'register-account', element: <CooperativeRegisterAccountPage /> },
      { path: 'portal', element: <CooperativePortalPage /> },
      { path: 'dashboard', element: <CooperativeDashboardPage /> },
      { path: 'profile', element: <CooperativeProfilePage /> },
    ],
  },
];
