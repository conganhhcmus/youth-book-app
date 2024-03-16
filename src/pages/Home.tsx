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

const Home: React.FC = () => {
    const { queryParams, defaultQueryParams } = useRequestParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { data: recommendList } = useQuery({
        queryKey: ['recommend-comics', defaultQueryParams],
        queryFn: () => comicApis.recommendComics(defaultQueryParams),
        staleTime: 3 * 60 * 1000,
    });

    const { data: recentList } = useQuery({
        queryKey: ['recent-comics', queryParams],
        queryFn: () => comicApis.recentComics(queryParams),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topDailyList } = useQuery({
        queryKey: ['top-daily-comics', defaultQueryParams],
        queryFn: () => comicApis.topComics(TOP_COMICS.daily, defaultQueryParams),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topWeeklyList } = useQuery({
        queryKey: ['top-weekly-comics', defaultQueryParams],
        queryFn: () => comicApis.topComics(TOP_COMICS.weekly, defaultQueryParams),
        staleTime: 3 * 60 * 1000,
    });

    const { data: topMonthlyList } = useQuery({
        queryKey: ['top-monthly-comics', defaultQueryParams],
        queryFn: () => comicApis.topComics(TOP_COMICS.monthly, defaultQueryParams),
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
                    isShowMore={true}
                />
                <Banner data={recommendData?.data} />
            </section>
            <div className="flex flex-row gap-4 pt-10">
                <div className="">
                    <TitlePreview
                        img={iconRecent}
                        title={translate('recent-update')}
                        url={APP_PATH.recent}
                        isShowMore={true}
                    />
                    <ListPreview data={recentData?.data} />
                    {recentData?.totalPage && (
                        <Pagination
                            queryConfig={queryParams}
                            page={recentData?.currentPage}
                            totalPage={recentData?.totalPage}
                        />
                    )}
                </div>
                <div className="ml-4 hidden w-[350px] lg:block">
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-daily')}
                            url={APP_PATH.recent}
                            isShowMore={true}
                        />
                        {topDailyData && <TopPreview data={topDailyData?.data} />}
                    </div>
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-weekly')}
                            url={APP_PATH.recent}
                            isShowMore={true}
                        />
                        {topWeeklyData && <TopPreview data={topWeeklyData?.data} />}
                    </div>
                    <div className="mb-2 border p-4">
                        <TitlePreview
                            title={translate('top-monthly')}
                            url={APP_PATH.recent}
                            isShowMore={true}
                        />
                        {topMonthlyData && <TopPreview data={topMonthlyData?.data} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
