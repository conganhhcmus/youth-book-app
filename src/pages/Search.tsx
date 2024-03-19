import comicApis from '@/apis/comic';
import { MiniPagination, Pagination } from '@/components/Pagination';
import { ListPreview } from '@/components/Preview';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import imgLoading from '@/assets/icons/loading.gif';

const Search: React.FC = () => {
    const { queryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { data: comicResultData, isLoading } = useQuery({
        queryKey: ['search-suggest', queryParams],
        queryFn: () => comicApis.suggestSearch(queryParams),
        staleTime: 3 * 60 * 1000,
    });

    const resultData = comicResultData?.data;

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
                <title>{`${translate('search-comic-title')} - YouthBook`}</title>
                <meta
                    name="description"
                    content={`${translate('search-comic-title')}`}
                />
            </Helmet>
            {resultData && (
                <div className="container min-h-screen w-full gap-4 pt-2">
                    <div className="flex h-9 items-center justify-between">
                        <h2 className="text-2xl font-semibold capitalize text-black dark:text-white">
                            <strong className="text-primary">{`${translate('search')} "${queryParams.q}"`}</strong>
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

                    {Array.isArray(resultData.data) && !resultData.data.length && (
                        <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                    )}
                </div>
            )}
        </>
    );
};

export default Search;
