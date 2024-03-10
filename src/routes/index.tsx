import MainLayout from '@/layouts/MainLayout';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import homeRoute from './home';
import accountRoute from './account';

const router = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [...homeRoute, ...accountRoute],
    },
];

export default router;
