/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';

import LoadingPage from '@/components/Loading';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import AccountLayout from '@/layouts/AccountLayout';

const AccountInfo = lazy(() => import('@/pages/Account/AccountInfo'));
const Billing = lazy(() => import('@/pages/Account/Billing'));
const ChangePassword = lazy(() => import('@/pages/Account/ChangePassword'));

export default [
    {
        path: APP_PATH.account,
        element: <AccountLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                path: APP_PATH.account,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <AccountInfo />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.account_billing,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Billing />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.account_password,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <ChangePassword />
                    </Suspense>
                ),
            },
        ],
    },
];
