import dashboardApis from '@/apis/dashboard';
import { APP_PATH } from '@/constants/path';
import { ROLES } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { selectAccessToken } from '@/redux/slices/token';
import { formatCurrency } from '@/utils/format';
import { decodeJWTToken } from '@/utils/token';
import { useQuery } from 'react-query';

const Dashboard: React.FC = () => {
    const token = useAppSelector((state) => selectAccessToken(state.token));
    const userInfoPayload = decodeJWTToken(token);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    if (!userInfoPayload) {
        window.location.href = APP_PATH.home;
    }
    if (userInfoPayload?.role == ROLES.collaborators) {
        window.location.href = APP_PATH.management_billing;
    }

    const { data: dashBoardResponse } = useQuery({
        queryKey: ['getDashboard'],
        queryFn: () => dashboardApis.getDashboard(),
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000,
    });

    const dashboardData = dashBoardResponse?.data;

    return (
        dashboardData && (
            <div className="w-full rounded-lg border-2 border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <div
                    id="fullWidthTabContent"
                    className="border-t border-gray-200 dark:border-gray-600">
                    <div
                        className="rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8"
                        id="stats"
                        role="tabpanel"
                        aria-labelledby="stats-tab">
                        <dl className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 p-4 text-gray-900 dark:text-white sm:grid-cols-3 sm:p-8 xl:grid-cols-3">
                            {dashboardData.payment.map((element) => (
                                <div
                                    key={element.name}
                                    className="flex flex-col items-center justify-center rounded-lg border-2 p-4">
                                    <dd className="mb-2 font-bold capitalize text-gray-900 dark:text-gray-400">{translate(element.name)}</dd>
                                    <dt className="text-3xl font-extrabold text-primary">{formatCurrency(element.value)}</dt>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-32 px-20">
                    <div className="py-3 sm:py-4">
                        <div className="flex items-center gap-4">
                            <div className="ms-4 inline-flex min-w-0">
                                <p className="truncate text-2xl font-medium capitalize text-gray-900 dark:text-white">
                                    {translate(dashboardData?.totalComics.name)} :
                                </p>
                            </div>
                            <div className="inline-flex items-center text-4xl font-semibold text-gray-900 dark:text-white">
                                {dashboardData?.totalComics.value}
                            </div>
                        </div>
                    </div>
                    <div className="py-3 sm:py-4">
                        <div className="flex items-center gap-4">
                            <div className="ms-4 inline-flex min-w-0">
                                <p className="truncate text-2xl font-medium capitalize text-gray-900 dark:text-white">
                                    {translate(dashboardData?.totalUsers.name)} :
                                </p>
                            </div>
                            <div className="inline-flex items-center text-4xl font-semibold text-gray-900 dark:text-white">
                                {dashboardData?.totalUsers.value}
                            </div>
                        </div>
                    </div>
                    <div className="py-3 sm:py-4">
                        <div className="flex items-center gap-4">
                            <div className="ms-4 inline-flex min-w-0">
                                <p className="truncate text-2xl font-medium capitalize text-gray-900 dark:text-white">
                                    {translate(dashboardData?.totalViews.name)} :
                                </p>
                            </div>
                            <div className="inline-flex items-center text-4xl font-semibold text-gray-900 dark:text-white">
                                {dashboardData?.totalViews.value}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
