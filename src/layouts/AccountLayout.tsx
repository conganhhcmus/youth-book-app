import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';

const AccountLayout = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    return (
        <div className="container ">
            <Helmet>
                <title>{translate('account-info-title')}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <div className="flex min-h-[600px] justify-start gap-4 px-4 pt-4 xl:px-0">
                <div className="min-w-fit overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                title={translate('account-info')}
                                to={APP_PATH.account_info}
                                className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('account-info')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                title={translate('billing-history')}
                                to={APP_PATH.account_billing}
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
                                <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('billing-history')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                title={translate('change-password')}
                                to={APP_PATH.account_password}
                                className="group flex items-center rounded-lg fill-gray-700 p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                <svg
                                    className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor">
                                    <g strokeWidth="0"></g>
                                    <g
                                        strokeLinecap="round"
                                        strokeLinejoin="round"></g>
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <g>
                                                {' '}
                                                <rect
                                                    width="48"
                                                    height="48"
                                                    fill="none"></rect>{' '}
                                            </g>{' '}
                                            <g>
                                                {' '}
                                                <path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM14,35a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,23,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,32,35Z"></path>{' '}
                                            </g>{' '}
                                        </g>{' '}
                                    </g>
                                </svg>
                                <span className="ms-3 flex-1 whitespace-nowrap capitalize">{translate('change-password')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AccountLayout;
