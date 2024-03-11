import MainLayout from '@/layouts/MainLayout';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import homeRoute from './home';
import authRoute from './auth';
import accountRoute from './account';
import management from './management';

const router = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [...homeRoute, ...authRoute, ...accountRoute, ...management],
    },
];

export default router;
