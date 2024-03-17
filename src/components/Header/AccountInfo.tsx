import { APP_PATH } from '@/constants/path';
import { COOKIE_KEYS, ROLES } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAlertMsg from '@/hooks/useAlertMsg';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { UserJwtPayload } from '@/types/auth';
import { removeCookie } from '@/utils/cookies';
import { formatCurrency } from '@/utils/format';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface AccountInfoProps {
    userInfo: UserJwtPayload;
}

const AccountInfo = ({ userInfo }: AccountInfoProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { dontSupportAlert } = useAlertMsg();

    const logout = () => {
        removeCookie(COOKIE_KEYS.token);
        removeCookie(COOKIE_KEYS.refreshToken);
        window.location.href = APP_PATH.home;
    };

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative flex w-20 cursor-pointer flex-col items-center px-2 py-1 hover:text-primary">
            {userInfo.avatarImg ? (
                <img
                    className="h-6 w-6"
                    src={userInfo.avatarImg}
                />
            ) : (
                <svg
                    className="h-6 w-5"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M508.3136 498.2784A221.4912 221.4912 0 1 0 286.72 276.48a221.7984 221.7984 0 0 0 221.5936 221.7984z m0-393.8304A172.3392 172.3392 0 1 1 336.0768 276.48a172.4416 172.4416 0 0 1 172.2368-172.032zM680.5504 536.7808a44.7488 44.7488 0 0 0-37.5808 3.2768 276.48 276.48 0 0 1-266.752 1.4336 44.6464 44.6464 0 0 0-37.6832-2.8672A481.28 481.28 0 0 0 30.0032 942.08a24.576 24.576 0 0 0 22.016 26.9312h2.4576a24.576 24.576 0 0 0 24.4736-22.1184 432.5376 432.5376 0 0 1 275.0464-361.472A326.5536 326.5536 0 0 0 665.6 583.68a437.4528 437.4528 0 0 1 279.4496 362.9056 24.576 24.576 0 1 0 48.9472-4.5056 487.0144 487.0144 0 0 0-313.4464-405.2992z"
                        fill=""
                    />
                </svg>
            )}

            <span className="mt-[2px] text-xs">{userInfo.username}</span>
            {isOpen && (
                <div className="absolute top-10 z-50 w-36 bg-transparent py-2">
                    <div className="items-left flex flex-col justify-center border bg-white p-1 text-black shadow-lg lg:p-2">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className="flex items-center justify-center gap-x-1 font-bold text-primary">{formatCurrency(userInfo.wallet)}</p>
                            <Link
                                className="flex w-[80%] items-center justify-center rounded-lg border bg-gradient px-2 text-white"
                                title={translate('deposit')}
                                to={APP_PATH.payment_deposit}>
                                {translate('deposit')}
                            </Link>
                        </div>
                        <span className="my-1 h-[1px] w-[80%] border-b border-dashed" />
                        <Link
                            title={translate('account-page')}
                            to={APP_PATH.account}
                            className="flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 capitalize hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)]">
                            <svg
                                className="mt-1 h-4 w-4 fill-gray-600"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M9.6,3.32a3.86,3.86,0,1,0,3.86,3.85A3.85,3.85,0,0,0,9.6,3.32M16.35,11a.26.26,0,0,0-.25.21l-.18,1.27a4.63,4.63,0,0,0-.82.45l-1.2-.48a.3.3,0,0,0-.3.13l-1,1.66a.24.24,0,0,0,.06.31l1,.79a3.94,3.94,0,0,0,0,1l-1,.79a.23.23,0,0,0-.06.3l1,1.67c.06.13.19.13.3.13l1.2-.49a3.85,3.85,0,0,0,.82.46l.18,1.27a.24.24,0,0,0,.25.2h1.93a.24.24,0,0,0,.23-.2l.18-1.27a5,5,0,0,0,.81-.46l1.19.49c.12,0,.25,0,.32-.13l1-1.67a.23.23,0,0,0-.06-.3l-1-.79a4,4,0,0,0,0-.49,2.67,2.67,0,0,0,0-.48l1-.79a.25.25,0,0,0,.06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13L19.5,13a4.07,4.07,0,0,0-.82-.45l-.18-1.27a.23.23,0,0,0-.22-.21H16.46M9.71,13C5.45,13,2,14.7,2,16.83v1.92h9.33a6.65,6.65,0,0,1,0-5.69A13.56,13.56,0,0,0,9.71,13m7.6,1.43a1.45,1.45,0,1,1,0,2.89,1.45,1.45,0,0,1,0-2.89Z"></path>
                                </g>
                            </svg>
                            <span className="mt-[2px] text-xs">{translate('account-page')}</span>
                        </Link>
                        <span className="my-1 h-[1px] w-[80%] border-b border-dashed" />
                        {(userInfo.role === ROLES.admin || userInfo.role === ROLES.collaborators) && (
                            <>
                                <Link
                                    title={translate('management-page')}
                                    to={APP_PATH.management}
                                    className="flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 capitalize hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)]">
                                    <svg
                                        className="mt-1 h-4 w-4 fill-gray-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
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
                                            <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z"></path>{' '}
                                        </g>
                                    </svg>
                                    <span className="mt-[2px] text-xs">{translate('management-page')}</span>
                                </Link>
                                <span className="my-1 h-[1px] w-[80%] border-b border-dashed" />
                            </>
                        )}
                        <Link
                            onClick={(event) => {
                                event.preventDefault();
                                dontSupportAlert(false);
                            }}
                            title={translate('wish-list')}
                            to={APP_PATH.account_wishlist}
                            className="flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 capitalize hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)]">
                            <svg
                                className="mt-1 h-4 w-4 fill-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
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
                                    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>{' '}
                                </g>
                            </svg>
                            <span className="mt-[2px] text-xs">{translate('wish-list')}</span>
                        </Link>
                        <span className="my-1 h-[1px] w-[80%] border-b border-dashed" />
                        <button
                            title={translate('logout')}
                            onClick={logout}
                            className={`flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 text-xs capitalize hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)]`}>
                            <svg
                                className="mt-1 h-4 w-4 fill-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
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
                                    <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"></path>{' '}
                                    <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"></path>{' '}
                                </g>
                            </svg>
                            {translate('logout')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;
