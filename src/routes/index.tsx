import MainLayout from '@/layouts/MainLayout';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import homeRoute from './home';

const router = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [homeRoute],
    },
];

export default router;
