import comicApis from '@/apis/comic';
import { MiniPagination, Pagination } from '@/components/Pagination';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, createSearchParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { ListPreview } from '@/components/Preview';
import imgLoading from '@/assets/icons/loading.gif';

const New: React.FC = () => {
    const { queryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const {
        data: recentResultData,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['recent-comics', queryParams],
        queryFn: () => comicApis.recentComics(queryParams),
        staleTime: 3 * 60 * 1000,
    });

    const resultData = recentResultData?.data;
    const comicList = resultData?.data;

    if (isLoading)
        return (
            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                <img
                    src={imgLoading}
                    alt="loading icon"
                    loading="lazy"
                />
                {translate('loading')}
            </div>
        );

    return (
        <>
            <Helmet>
                <title>{translate('new-title')}</title>
                <meta
                    name="description"
                    content={translate('new-title')}
                />
            </Helmet>
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

export default New;
