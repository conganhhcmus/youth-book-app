import MainLayout from '@/layouts/MainLayout';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import homeRoute from './home';
import authRoute from './auth';
import accountRoute from './account';
import managementRoute from './management';
import comicRoute from './comic';
import PaymentRoute from './payment';

const router = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [...homeRoute, ...authRoute, ...accountRoute, ...managementRoute, ...comicRoute, ...PaymentRoute],
    },
];

export default router;
