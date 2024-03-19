/* eslint-disable react-refresh/only-export-components */
import { APP_PATH } from '@/constants/path';
import { lazy, Suspense } from 'react';
import LoadingPage from '@/components/Loading';

const ComicDetail = lazy(() => import('@/pages/ComicDetail'));
const ChapterDetail = lazy(() => import('@/pages/ChapterDetail'));
const Genres = lazy(() => import('@/pages/Genres'));
const History = lazy(() => import('@/pages/History'));
const New = lazy(() => import('@/pages/New'));
const Top = lazy(() => import('@/pages/Top'));
const Search = lazy(() => import('@/pages/Search'));

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
    {
        path: APP_PATH.history,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <History />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.recent,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <New />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.top,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Top />
            </Suspense>
        ),
    },
    {
        path: APP_PATH.search,
        element: (
            <Suspense fallback={<LoadingPage />}>
                <Search />
            </Suspense>
        ),
    },
];
