import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('../presentation/pages/HomePage'));
const DashboardPage = lazy(() => import('../presentation/pages/DashboardPage'));
const UsersPage = lazy(() => import('../presentation/pages/UsersPage'));

export const nguyenManhthuanRoutes: RouteObject[] = [
  {
    path: '/nguyen-manh-thuan',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
];
