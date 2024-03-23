import { Banner } from '@/components';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Helmet } from 'react-helmet-async';
import { ListPreview, TitlePreview, TopPreview } from '@/components/Preview';

import iconRecommend from '@/assets/icons/recommend.webp';
import iconRecent from '@/assets/icons/recent.webp';
import { APP_PATH, TOP_COMICS } from '@/constants/path';
import { useQuery } from 'react-query';
import comicApis from '@/apis/comic';
import { ComicBaseData, ComicData } from '@/types/comic';
import { Pagination } from '@/components/Pagination';
import useRequestParams from '@/hooks/useRequestParams';
import imgLoading from '@/assets/icons/loading.gif';

const Home: React.FC = () => {
    const { queryParams, defaultQueryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { data: recommendList, isLoading: isLoadingRecommend } = useQuery({
        queryKey: ['recommend-comics', defaultQueryParams],
        queryFn: () => comicApis.recommendComics(defaultQueryParams),
        staleTime: 3 * 60 * 1000,
    });

    const { data: recentList, isLoading: isLoadingRecent } = useQuery({
        queryKey: ['recent-comics', { ...queryParams, status: 'all' }],
        queryFn: () => comicApis.recentComics({ ...queryParams, status: 'all' }),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topDailyList, isLoading: isLoadingTopDaily } = useQuery({
        queryKey: ['top-daily-comics', { ...defaultQueryParams, type: TOP_COMICS.daily }],
        queryFn: () => comicApis.topComics({ ...defaultQueryParams, type: TOP_COMICS.daily }),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topWeeklyList, isLoading: isLoadingWeekly } = useQuery({
        queryKey: ['top-weekly-comics', { ...defaultQueryParams, type: TOP_COMICS.weekly }],
        queryFn: () => comicApis.topComics({ ...defaultQueryParams, type: TOP_COMICS.weekly }),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topMonthlyList, isLoading: isLoadingMonthly } = useQuery({
        queryKey: ['top-monthly-comics', { ...defaultQueryParams, type: TOP_COMICS.monthly }],
        queryFn: () => comicApis.topComics({ ...defaultQueryParams, type: TOP_COMICS.monthly }),
        staleTime: 3 * 60 * 1000,
    });

    const recommendData = recommendList?.data as ComicBaseData;
    const recentData = recentList?.data as ComicData;
    const topDailyData = topDailyList?.data as ComicData;
    const topWeeklyData = topWeeklyList?.data as ComicData;
    const topMonthlyData = topMonthlyList?.data as ComicData;

    return (
        <div className="container px-4 xl:px-0">
            <Helmet>
                <title>{translate('home-title')}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <section className="pt-10">
                <TitlePreview
                    img={iconRecommend}
                    title={translate('recommend')}
                    url={APP_PATH.recommend}
                    isShowMore={false}
                />
                {isLoadingRecommend ? (
                    <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                        <img
                            src={imgLoading}
                            alt="loading icon"
                            loading="lazy"
                        />
                        {translate('loading')}
                    </div>
                ) : (
                    <Banner data={recommendData?.data} />
                )}
                {Array.isArray(recommendData?.data) && !recommendData?.data.length && (
                    <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                )}
            </section>
            <div className="flex flex-row gap-4 pt-10">
                <div className="flex-1">
                    <TitlePreview
                        img={iconRecent}
                        title={translate('recent-update')}
                        url={APP_PATH.recent}
                        isShowMore={true}
                    />
                    {isLoadingRecent ? (
                        <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                            <img
                                src={imgLoading}
                                alt="loading icon"
                                loading="lazy"
                            />
                            {translate('loading')}
                        </div>
                    ) : (
                        <ListPreview data={recentData?.data} />
                    )}
                    {recentData?.totalPage && recentData.totalPage > 0 && (
                        <Pagination
                            queryConfig={queryParams}
                            page={recentData?.currentPage}
                            totalPage={recentData?.totalPage}
                        />
                    )}
                    {Array.isArray(recentData?.data) && !recentData?.data.length && (
                        <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                    )}
                </div>
                <div className="ml-4 hidden w-[300px] lg:block">
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-daily')}
                            url={APP_PATH.top}
                            isShowMore={true}
                        />
                        {isLoadingTopDaily ? (
                            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                                <img
                                    src={imgLoading}
                                    alt="loading icon"
                                    loading="lazy"
                                />
                                {translate('loading')}
                            </div>
                        ) : (
                            <TopPreview data={topDailyData.data} />
                        )}
                    </div>
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-weekly')}
                            url={APP_PATH.top}
                            isShowMore={true}
                        />
                        {isLoadingWeekly ? (
                            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                                <img
                                    src={imgLoading}
                                    alt="loading icon"
                                    loading="lazy"
                                />
                                {translate('loading')}
                            </div>
                        ) : (
                            <TopPreview data={topWeeklyData.data} />
                        )}
                    </div>
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-monthly')}
                            url={APP_PATH.top}
                            isShowMore={true}
                        />
                        {isLoadingMonthly ? (
                            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                                <img
                                    src={imgLoading}
                                    alt="loading icon"
                                    loading="lazy"
                                />
                                {translate('loading')}
                            </div>
                        ) : (
                            <TopPreview data={topMonthlyData.data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
