import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages (use @modules alias so Vite resolves chunks consistently)
const HomePage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/HomePage'));
const DashboardPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/DashboardPage'));
const UsersPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/UsersPage'));
const CartPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/CartPage'));
const CheckoutPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/OrderHistoryPage'));
const SetPasswordPage = lazy(() => import('@modules/nguyenmanhthuan/presentation/pages/SetPasswordPage'));

export const nguyenManhthuanRoutes: RouteObject[] = [
  {
    path: '/nguyen-manh-thuan',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'set-password', element: <SetPasswordPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'orders', element: <OrderHistoryPage /> },
    ],
  },
];
