/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';

import LoadingPage from '@/components/Loading';
const Management = lazy(() => import('@/pages/Management'));

export default [
    {
        path: APP_PATH.management,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Management />
            </Suspense>
        ),
    },
];
