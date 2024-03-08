/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const LoadingPage = lazy(() => import('@/components/Loading'));

export default {
    index: true,
    path: APP_PATH.home,
    element: (
        <Suspense fallback={<LoadingPage />}>
            <Home />
        </Suspense>
    ),
};
