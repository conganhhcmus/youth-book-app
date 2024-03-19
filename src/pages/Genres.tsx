import comicApis from '@/apis/comic';
import genresApi from '@/apis/genres';
import { MiniPagination, Pagination } from '@/components/Pagination';
import { ListPreview } from '@/components/Preview';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, createSearchParams } from 'react-router-dom';
import imgLoading from '@/assets/icons/loading.gif';

const Genres: React.FC = () => {
    const { queryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const type = useMemo(() => (queryParams.type !== undefined ? queryParams.type : 'all'), [queryParams.type]);

    const { data: genresResultData, isLoading: isLoadingGenres } = useQuery({
        queryKey: ['getFullGenres'],
        queryFn: () => genresApi.getFullGenres(),
        staleTime: 3 * 60 * 1000,
    });

    const { data: comicResultData, isLoading: isLoadingComic } = useQuery({
        queryKey: ['getComicByGenres', queryParams],
        queryFn: () => comicApis.getComicByGenres(queryParams),
        staleTime: 3 * 60 * 1000,
    });

    const genresFullList = genresResultData?.data && [
        {
            _id: 'all',
            name: 'Tất cả',
        },
        ...genresResultData.data,
    ];

    const resultData = comicResultData?.data;

    if (isLoadingGenres || isLoadingComic)
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
                <title>{`${translate('genres-comic-title')} ${genresFullList?.find((item) => item._id === type)?.name} - YouthBook`}</title>
                <meta
                    name="description"
                    content={`${translate('genres-comic-title')} ${genresFullList?.find((item) => item._id === type)?.name}`}
                />
            </Helmet>
            <div className="bg-[#f8f8f9] px-5 py-4 dark:bg-gray-800">
                <ul className="container grid max-h-[154px] grid-cols-2 gap-2 overflow-auto rounded border-t-4 border-primary bg-white px-2 py-3 shadow dark:bg-gray-900 sm:grid-cols-3 sm:px-6 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
                    {genresFullList &&
                        genresFullList.map((item) => (
                            <li
                                key={item._id}
                                id={item._id}>
                                <Link
                                    title={item.name}
                                    className={classNames(
                                        'flex min-w-[100px] items-center justify-center overflow-hidden whitespace-nowrap rounded-md border px-12 py-2 text-center font-semibold leading-5 text-black dark:border-gray-600 dark:text-white sm:min-w-[130px]',
                                        {
                                            'bg-primary text-white': genresFullList.map((item) => item._id).includes(type)
                                                ? type === item._id
                                                : item._id === 'all',
                                            'hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary':
                                                type !== item._id,
                                        },
                                    )}
                                    to={{
                                        search: createSearchParams({
                                            ...queryParams,
                                            page: '1',
                                            type: item._id,
                                        }).toString(),
                                    }}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            {resultData && (
                <div className="container min-h-screen w-full gap-4 pt-2">
                    <div className="flex h-9 items-center justify-between">
                        <h2 className="text-2xl font-semibold capitalize text-black dark:text-white">
                            <strong className="text-primary">{`${genresFullList?.find((item) => item._id === type)?.name}`}</strong>
                            <span className="ml-2 hidden md:inline-block">{`- ${translate('page')} ${queryParams.page}`}</span>
                        </h2>
                        {resultData.totalPage > 0 && (
                            <MiniPagination
                                queryConfig={queryParams}
                                page={resultData?.currentPage}
                                totalPage={resultData?.totalPage}
                            />
                        )}
                    </div>

                    <ListPreview
                        className="mt-5 grid grid-cols-2 gap-3 gap-y-5 sm:grid-cols-4 md:grid-cols-6"
                        data={resultData?.data}
                    />
                    {resultData.totalPage > 0 && (
                        <Pagination
                            queryConfig={queryParams}
                            page={resultData?.currentPage}
                            totalPage={resultData?.totalPage}
                        />
                    )}

                    {Array.isArray(resultData?.data) && !resultData?.data.length && (
                        <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                    )}
                </div>
            )}
        </>
    );
};

export default Genres;
