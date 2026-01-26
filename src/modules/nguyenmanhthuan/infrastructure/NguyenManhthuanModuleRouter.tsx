import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('../presentation/pages/HomePage'));
const DashboardPage = lazy(() => import('../presentation/pages/DashboardPage'));
const UsersPage = lazy(() => import('../presentation/pages/UsersPage'));
const CartPage = lazy(() => import('../presentation/pages/CartPage'));
const CheckoutPage = lazy(() => import('../presentation/pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('../presentation/pages/OrderHistoryPage'));

export const nguyenManhthuanRoutes: RouteObject[] = [
  {
    path: '/nguyen-manh-thuan',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'orders', element: <OrderHistoryPage /> },
    ],
  },
];
