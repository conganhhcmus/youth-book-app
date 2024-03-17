import { APP_PATH } from '@/constants/path';
import { COOKIE_KEYS, ROLES } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { getCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';

const ManagementLayout = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const token = getCookie(COOKIE_KEYS.token);
    const userInfoPayload = decodeJWTToken(token);

    if (!userInfoPayload) {
        window.location.href = APP_PATH.home;
    }

    return (
        <div className="container ">
            <Helmet>
                <title>{translate('management-page')}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <div className="flex min-h-[600px] justify-start gap-4 px-4 pt-4 xl:px-0">
                <div className="min-w-fit overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {(userInfoPayload?.role === ROLES.admin || userInfoPayload?.role === ROLES.collaborators) && (
                            <li>
                                <Link
                                    title={translate('billing-management')}
                                    to={APP_PATH.management_billing}
                                    className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <svg
                                        className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                        viewBox="0 0 12 12"
                                        enableBackground="new 0 0 12 12"
                                        version="1.1"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M11,1.5H1c-0.5517578,0-1,0.4482422-1,1v7c0,0.5517578,0.4482422,1,1,1h10c0.5517578,0,1-0.4482422,1-1v-7 C12,1.9482422,11.5517578,1.5,11,1.5z M4,8.5H2v-1h2V8.5z M8,8.5H5v-1h3V8.5z"></path>
                                        </g>
                                    </svg>
                                    <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('billing-management')}</span>
                                </Link>
                            </li>
                        )}
                        {userInfoPayload?.role === ROLES.admin && (
                            <>
                                <li>
                                    <Link
                                        title={translate('comic-management')}
                                        to={APP_PATH.management_comics}
                                        className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <svg
                                            className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {' '}
                                                <path
                                                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
                                                    stroke="#000000"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"></path>{' '}
                                            </g>
                                        </svg>
                                        <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('comic-management')}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        title={translate('genres-management')}
                                        to={APP_PATH.management_genres}
                                        className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <svg
                                            className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {' '}
                                                <path
                                                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
                                                    stroke="#000000"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"></path>{' '}
                                            </g>
                                        </svg>
                                        <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('genres-management')}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        title={translate('user-management')}
                                        to={APP_PATH.management_users}
                                        className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <svg
                                            className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 18">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
                                        <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('user-management')}</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default ManagementLayout;
