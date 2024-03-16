/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import LoadingPage from '@/components/Loading';

const ComicDetail = lazy(() => import('@/pages/ComicDetail'));
const ChapterDetail = lazy(() => import('@/pages/ChapterDetail'));
const Genres = lazy(() => import('@/pages/Genres'));

export default [
    {
        path: APP_PATH.comics + '/:comicId',
        element: (
            <Suspense fallback={<LoadingPage />}>
                <ComicDetail />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.comics_chapters + '/:chapterId',
        element: (
            <Suspense fallback={<LoadingPage />}>
                <ChapterDetail />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.genres,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Genres />
            </Suspense>
        ),
    },
];
