import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { useState } from 'react';
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom';
import imgLoading from '@/assets/icons/loading.gif';
import { useQuery } from 'react-query';
import analyticsApis from '@/apis/analytics';
import { Pagination } from '@/components/Pagination';
import moment from 'moment';
import useAxiosRequest from '@/hooks/useAxiosRequest';

const AnalyticsDetail: React.FC = () => {
    const { userId } = useParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const [, setSearchParams] = useSearchParams();
    const { callRequest } = useAxiosRequest();

    const [searchText, setSearchText] = useState<string>('');

    const { data: resultData, isLoading } = useQuery({
        queryKey: ['getAnalytics', userId, { ...queryParams, q: searchText }],
        queryFn: () => analyticsApis.getAnalyticsDetail(userId, { ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
        enabled: !!userId,
    });

    const analyticsDetailResult = resultData?.data;
    const analyticsDetailData = analyticsDetailResult?.data;

    const exportExcel = () => {
        callRequest(
            analyticsApis.exportAnalyticsDetail(userId, { ...queryParams }),
            (res) => {
                const filename = res.headers ? res.headers['content-disposition'].split('=')[1] : 'download.xlsx';
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            },
            (err) => {
                console.log(err);
            },
        );
    };

    return (
        <div className="relative h-full min-h-[680px] w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
                <div className="relative">
                    <button
                        onClick={() => history.back()}
                        className="mb-2 me-2 rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {translate('go-back')}
                    </button>
                    <button
                        onClick={exportExcel}
                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {translate('export-excel')}
                    </button>
                </div>

                <div className="relative">
                    <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setSearchParams(
                                createSearchParams({
                                    ...queryParams,
                                    page: '1',
                                }),
                            );
                        }}
                        id="table-search-comic"
                        className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder={translate('search-for-comic')}
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                    <img
                        src={imgLoading}
                        alt="loading icon"
                        loading="lazy"
                    />
                    {translate('loading')}
                </div>
            ) : (
                <>
                    <div className="relative h-[450px] w-full overflow-y-auto sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('username')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('comic-name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('chapter-name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('view-at')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyticsDetailData &&
                                    analyticsDetailData.map((analytics, index) => (
                                        <tr
                                            key={index}
                                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                            <td className="max-w-60 px-6 py-4 font-bold capitalize">{analytics.username}</td>
                                            <td className="max-w-60 px-6 py-4 font-bold capitalize">{analytics.comicName}</td>
                                            <td className="max-w-60 px-6 py-4 font-bold capitalize">{analytics.chapterName}</td>
                                            <td className="px-6 py-4 capitalize">{moment(analytics.createTime).format('HH:mm:ss DD/MM/YYYY')}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {Array.isArray(analyticsDetailData) && !analyticsDetailData.length && (
                            <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                        )}
                    </div>
                    {analyticsDetailResult?.totalPage && analyticsDetailResult.totalPage > 0 ? (
                        <Pagination
                            queryConfig={queryParams}
                            page={analyticsDetailResult?.currentPage}
                            totalPage={analyticsDetailResult?.totalPage}
                        />
                    ) : (
                        <div className="h-20"></div>
                    )}
                </>
            )}
        </div>
    );
};

export default AnalyticsDetail;
