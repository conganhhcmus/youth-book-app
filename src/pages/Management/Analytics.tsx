import analyticsApis from '@/apis/analytics';
import { Pagination } from '@/components/Pagination';
import { FILTER_OPTIONS } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import imgLoading from '@/assets/icons/loading.gif';
import { APP_PATH } from '@/constants/path';

const Analytics: React.FC = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const [, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState<string>('');
    const [filterOptions, setFilterOptions] = useState<number>(0);

    const { data: resultData, isLoading } = useQuery({
        queryKey: ['getAnalytics', { ...queryParams, q: searchText, type: filterOptions }],
        queryFn: () => analyticsApis.getAnalytics({ ...queryParams, q: searchText, type: filterOptions.toString() }),
        staleTime: 3 * 60 * 1000,
    });

    const analyticsResult = resultData?.data;
    const analyticsData = analyticsResult?.data;

    return (
        <div className="relative h-full min-h-[680px] w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
                <div className="flex flex-col">
                    <div
                        key="options"
                        className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700">
                        {FILTER_OPTIONS.map((option) => (
                            <div
                                key={`option - ${option.value}`}
                                className="mb-[0.125rem] mr-8 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={option.name}
                                    value={option.value}
                                    checked={option.value == filterOptions}
                                    onChange={() => {
                                        setFilterOptions(option.value);
                                        setSearchParams(
                                            createSearchParams({
                                                ...queryParams,
                                                page: '1',
                                            }),
                                        );
                                    }}
                                />
                                <label
                                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                    htmlFor={option.name}>
                                    {translate(option.name)}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700">
                        <button
                            onClick={() => navigate(APP_PATH.management_analytics + `/get-all?type=${filterOptions}`)}
                            className="me-2 rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium capitalize text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {translate('view-detail-all')}
                        </button>
                    </div>
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
                        id="table-search-users"
                        className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder={translate('search-for-users')}
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
                                        {translate('total-view-comics')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('total-view-chapters')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('action')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyticsData &&
                                    analyticsData.map((analytics) => (
                                        <tr
                                            key={analytics.userId}
                                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{analytics.username}</td>
                                            <td className="px-6 py-4">{analytics.totalViewComic}</td>
                                            <td className="px-6 py-4">{analytics.totalViewChapter}</td>
                                            <td className={`px-6 py-4 ${analytics.userId ? '' : 'hidden'}`}>
                                                <button
                                                    onClick={() =>
                                                        navigate(APP_PATH.management_analytics + `/${analytics.userId}?type=${filterOptions}`)
                                                    }
                                                    className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                                    {translate('view-detail')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {Array.isArray(analyticsData) && !analyticsData.length && (
                            <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                        )}
                    </div>
                    {analyticsResult?.totalPage && analyticsResult.totalPage > 0 ? (
                        <Pagination
                            queryConfig={queryParams}
                            page={analyticsResult?.currentPage}
                            totalPage={analyticsResult?.totalPage}
                        />
                    ) : (
                        <div className="h-20"></div>
                    )}
                </>
            )}
        </div>
    );
};

export default Analytics;
