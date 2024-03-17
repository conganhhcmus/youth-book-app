import comicApis from '@/apis/comic';
import { MiniPagination, Pagination } from '@/components/Pagination';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, NavLink, createSearchParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { ListPreview } from '@/components/Preview';
import { TOP_COMICS } from '@/constants/path';

const Top: React.FC = () => {
    const { queryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { data: recentResultData, isError } = useQuery({
        queryKey: ['recent-comics', queryParams],
        queryFn: () => comicApis.topComics(queryParams),
        staleTime: 3 * 60 * 1000,
    });

    const resultData = recentResultData?.data;
    const comicList = resultData?.data;

    return (
        <>
            <Helmet>
                <title>{translate('new-title')}</title>
                <meta
                    name="description"
                    content={translate('new-title')}
                />
            </Helmet>
            <div className="mt-2 block text-black/60 dark:text-white">
                <nav className="container min-h-[56px] border-t-[3px] border-primary bg-white p-3 dark:bg-gray-900">
                    <ul className="flex items-center gap-3 overflow-x-auto overflow-y-hidden">
                        <li>
                            <NavLink
                                to={{
                                    search: createSearchParams({
                                        ...queryParams,
                                        page: '1',
                                        type: TOP_COMICS.all,
                                    }).toString(),
                                }}
                                className={classNames(
                                    'flex items-center justify-center gap-1 whitespace-nowrap px-1 py-3 text-[15px] font-semibold capitalize hover:text-primary',
                                    {
                                        'text-primary': queryParams.type === TOP_COMICS.all,
                                        'text-current': queryParams.type !== TOP_COMICS.all,
                                    },
                                )}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="hidden h-5 w-5 lg:block"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M102.594 25.97l90.062 345.78L481.844 395 391.75 49.22 102.594 25.97zm-18.906 1.593c-30.466 11.873-55.68 53.098-49.75 75.312l3.25 11.78c.667-1.76 1.36-3.522 2.093-5.28C49.19 85.668 65.84 62.61 89.657 50.47l-5.97-22.907zm44.937 18.906l247.813 21.593 80.937 305.156-249.344-20.064L128.626 46.47zM94.53 69.155c-16.66 10.01-29.916 28.068-38 47.406-5.245 12.552-8.037 25.64-8.75 36.532l64.814 235.28c.293-.55.572-1.105.875-1.655 10.6-19.254 27.822-37.696 51.124-48.47L94.53 69.156zm74.876 287.563c-17.673 9.067-31.144 23.712-39.562 39-4.464 8.105-7.262 16.36-8.688 23.75l11.688 42.405 1.625.125c-3.825-27.528 11.382-60.446 41.25-81.03l-6.314-24.25zm26.344 34.03c-32.552 17.26-46.49 52.402-41.844 72.906l289.844 24.53c-5.315-7.75-8.637-17.84-8.594-28.342l-22.562-9.063 46.625-7.31-13.595-12.97c5.605-6.907 13.688-13.025 24.78-17.656L195.75 390.75z" />
                                </svg>
                                {translate('top-all')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={{
                                    search: createSearchParams({
                                        ...queryParams,
                                        page: '1',
                                        type: TOP_COMICS.daily,
                                    }).toString(),
                                }}
                                className={classNames(
                                    'flex items-center justify-center gap-1 whitespace-nowrap px-1 py-3 text-[15px] font-semibold capitalize hover:text-primary',
                                    {
                                        'text-primary': queryParams.type === TOP_COMICS.daily,
                                        'text-current': queryParams.type !== TOP_COMICS.daily,
                                    },
                                )}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="hidden h-5 w-5 lg:block"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect
                                        width={416}
                                        height={384}
                                        x={48}
                                        y={80}
                                        fill="none"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        rx={48}
                                    />
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M128 48v32m256-32v32"
                                    />
                                    <rect
                                        width={96}
                                        height={96}
                                        x={112}
                                        y={224}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        rx={13}
                                    />
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M464 160H48"
                                    />
                                </svg>
                                {translate('top-daily')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={{
                                    search: createSearchParams({
                                        ...queryParams,
                                        page: '1',
                                        type: TOP_COMICS.weekly,
                                    }).toString(),
                                }}
                                className={classNames(
                                    'flex items-center justify-center gap-1 whitespace-nowrap px-1 py-3 text-[15px] font-semibold capitalize hover:text-primary',
                                    {
                                        'text-primary': queryParams.type === TOP_COMICS.weekly,
                                        'text-current': queryParams.type !== TOP_COMICS.weekly,
                                    },
                                )}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 16 16"
                                    className="hidden h-5 w-5 lg:block"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                </svg>
                                {translate('top-weekly')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={{
                                    search: createSearchParams({
                                        ...queryParams,
                                        page: '1',
                                        type: TOP_COMICS.monthly,
                                    }).toString(),
                                }}
                                className={classNames(
                                    'flex items-center justify-center gap-1 whitespace-nowrap px-1 py-3 text-[15px] font-semibold capitalize hover:text-primary',
                                    {
                                        'text-primary': queryParams.type === TOP_COMICS.monthly,
                                        'text-current': queryParams.type !== TOP_COMICS.monthly,
                                    },
                                )}>
                                <svg
                                    stroke="currentColor"
                                    strokeWidth={0}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="hidden h-6 w-6 lg:block"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                                </svg>
                                {translate('top-monthly')}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container px-4 xl:px-0">
                {!comicList && isError ? (
                    <NotFound />
                ) : (
                    <>
                        <div className="mt-8 flex h-9 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Link
                                    title={translate('all')}
                                    className={classNames(
                                        'rounded-md border border-primary px-2 py-1 text-center capitalize leading-5 hover:underline',
                                        {
                                            'bg-primary text-white hover:no-underline': queryParams.status === 'all',
                                            'bg-transparent text-primary': queryParams.status !== 'all',
                                        },
                                    )}
                                    to={{
                                        search: createSearchParams({
                                            ...queryParams,
                                            page: '1',
                                            status: 'all',
                                        }).toString(),
                                    }}>
                                    {translate('all')}
                                </Link>
                                <Link
                                    title={translate('completed')}
                                    className={classNames(
                                        'rounded-md border border-primary px-2 py-1 text-center capitalize leading-5 hover:underline',
                                        {
                                            'bg-primary text-white hover:no-underline': queryParams.status === 'completed',
                                            'bg-transparent text-primary': queryParams.status !== 'completed',
                                        },
                                    )}
                                    to={{
                                        search: createSearchParams({
                                            ...queryParams,
                                            page: '1',
                                            status: 'completed',
                                        }).toString(),
                                    }}>
                                    {translate('completed')}
                                </Link>
                                <Link
                                    title={translate('updating')}
                                    className={classNames(
                                        'rounded-md border border-primary px-2 py-1 text-center capitalize leading-5 hover:underline',
                                        {
                                            'bg-primary text-white hover:no-underline': queryParams.status === 'updating',
                                            'bg-transparent text-primary': queryParams.status !== 'updating',
                                        },
                                    )}
                                    to={{
                                        search: createSearchParams({
                                            ...queryParams,
                                            page: '1',
                                            status: 'updating',
                                        }).toString(),
                                    }}>
                                    {translate('updating')}
                                </Link>
                            </div>
                            {resultData?.totalPage && (
                                <MiniPagination
                                    queryConfig={queryParams}
                                    page={resultData?.currentPage}
                                    totalPage={resultData?.totalPage}
                                />
                            )}
                        </div>
                        {comicList && (
                            <div className="mt-6 min-h-[600px]">
                                <ListPreview
                                    className="mt-5 grid grid-cols-2 gap-3 gap-y-5 sm:grid-cols-4 md:grid-cols-6"
                                    data={comicList}
                                />
                            </div>
                        )}
                        <div className="mt-6">
                            {resultData?.totalPage && (
                                <Pagination
                                    queryConfig={queryParams}
                                    page={Number(queryParams.page)}
                                    totalPage={resultData.totalPage}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Top;
