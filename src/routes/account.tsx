/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import { redirect } from 'react-router-dom';

import LoadingPage from '@/components/Loading';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
import AccountLayout from '@/layouts/AccountLayout';

const AccountInfo = lazy(() => import('@/pages/Account/AccountInfo'));
const BillingHistory = lazy(() => import('@/pages/Account/PaymentHistory'));
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
                loader: () => redirect(APP_PATH.account_info),
            },
            {
                path: APP_PATH.account_info,
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
                        <BillingHistory />
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
