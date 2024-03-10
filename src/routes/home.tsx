/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';

import LoadingPage from '@/components/Loading';
const Home = lazy(() => import('@/pages/Home'));

export default [
    {
        index: true,
        path: APP_PATH.home,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Home />
            </Suspense>
        ),
    },
];
