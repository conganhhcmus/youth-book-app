/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import { redirect } from 'react-router-dom';

import LoadingPage from '@/components/Loading';
import ManagementLayout from '@/layouts/ManagementLayout';
import { ErrorBoundary } from '@/pages/ErrorBoundary';
const ComicManagement = lazy(() => import('@/pages/Management/ComicManagement'));
const ChapterManagement = lazy(() => import('@/pages/Management/ChapterManagement'));
const GenresManagement = lazy(() => import('@/pages/Management/GenresManagement'));
const UserManagement = lazy(() => import('@/pages/Management/UserManagement'));
const BillingManagement = lazy(() => import('@/pages/Management/BillingManagement'));

export default [
    {
        path: APP_PATH.management,
        element: <ManagementLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                path: APP_PATH.management,
                loader: () => redirect(APP_PATH.management_comics),
            },
            {
                path: APP_PATH.management_comics,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <ComicManagement />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.management_chapters + '/:comicId',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <ChapterManagement />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.management_genres,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <GenresManagement />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.management_users,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <UserManagement />
                    </Suspense>
                ),
            },
            {
                path: APP_PATH.management_billing,
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <BillingManagement />
                    </Suspense>
                ),
            },
        ],
    },
];
