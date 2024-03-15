/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import LoadingPage from '@/components/Loading';

const Deposit = lazy(() => import('@/pages/Payment/Deposit'));

export default [
    {
        path: APP_PATH.payment_deposit,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Deposit />
            </Suspense>
        ),
    },
];
