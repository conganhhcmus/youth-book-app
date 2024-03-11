/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import LoadingPage from '@/components/Loading';

const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));

export default [
    {
        path: APP_PATH.login,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.register,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Register />
            </Suspense>
        ),
    },
];
