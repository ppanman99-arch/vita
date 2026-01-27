import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ESGPortalPage = lazy(() => import('../presentation/pages/ESGPortalPage'));
const ESGLoginPage = lazy(() => import('../presentation/pages/ESGLoginPage'));
const ESGRegisterPage = lazy(() => import('../presentation/pages/ESGRegisterPage'));
const ESGDashboardPage = lazy(() => import('../presentation/pages/ESGDashboardPage'));
const ESGProjectsPage = lazy(() => import('../presentation/pages/ESGProjectsPage'));
const ESGProjectDetailPage = lazy(() => import('../presentation/pages/ESGProjectDetailPage'));

export const esgEnterpriseRoutes: RouteObject[] = [
  { path: '/esg-portal', element: <ESGPortalPage /> },
  { path: '/esg-portal/login', element: <ESGLoginPage /> },
  { path: '/esg-portal/dashboard', element: <ESGDashboardPage /> },
  { path: '/esg-portal/projects', element: <ESGProjectsPage /> },
  { path: '/esg-portal/projects/:id', element: <ESGProjectDetailPage /> },
];

export const esgRegisterRoute: RouteObject = {
  path: '/esg-register',
  element: <ESGRegisterPage />,
};
