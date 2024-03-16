import { Link, useMatch } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { APP_PATH } from '@/constants/path';
import SearchBar from './SearchBar';
import useMode from '@/hooks/useMode';
import { changeLanguage, selectLanguage, selectMode } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { COOKIE_KEYS } from '@/constants/settings';
import { getCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import AccountInfo from './AccountInfo';

const Header = () => {
    const dispatch = useDispatch();
    const [isOpenMiniMenu, setIsOpenMiniMenu] = useState<boolean>(false);
    const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);
    const mode = useAppSelector((state) => selectMode(state.settings));
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const changeMode = useMode();

    const chooseThemeHandler = (mode: string) => {
        setIsOpenMiniMenu(false);
        changeMode(mode);
    };

    const chooseLanguageHandler = (lang: string) => {
        setIsOpenLanguage(false);
        dispatch(changeLanguage(lang));
    };

    const token = getCookie(COOKIE_KEYS.token);
    const userInfo = decodeJWTToken(token);

    return (
        <div className={`bg-header bg-cover bg-no-repeat text-black shadow`}>
            <div className="container flex h-[74px] items-center justify-between px-4 xl:px-0">
                <div className="flex items-center">
                    <Link
                        to={APP_PATH.home}
                        title="YouthBook">
                        <h1
                            title={translate('home-title')}
                            className="w-52 text-3xl font-bold text-primary">
                            <img
                                className="mr-1 inline-block rounded-full bg-[#fae5c6]"
                                src="/favicon.ico"></img>
                            <p className="inline-block">YouthBook</p>
                        </h1>
                    </Link>
                </div>
                <div className="hidden items-center sm:flex">
                    <SearchBar />
                </div>
                {/* options */}
                <div className="flex items-center">
                    <div
                        onMouseEnter={() => setIsOpenLanguage(true)}
                        onMouseLeave={() => setIsOpenLanguage(false)}
                        className="relative flex w-20 cursor-pointer flex-col items-center px-2 py-1 hover:text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-5">
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                            />
                            <path
                                strokeLinecap="round"
                                d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"
                            />{' '}
                            <path
                                strokeLinecap="round"
                                d="M2.5 9L21.5 9M2.5 15L21.5 15"
                            />
                        </svg>
                        <span className="mt-[2px] text-xs capitalize">{translate(lang)}</span>
                        {isOpenLanguage && (
                            <div className="absolute top-10 z-50 bg-transparent py-2">
                                <div className="flex flex-col items-center justify-center border bg-white p-1 text-black shadow-lg lg:p-2">
                                    <button
                                        title={translate('vi')}
                                        onClick={() => chooseLanguageHandler('vi')}
                                        className={`flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)] ${lang == 'vi' && 'text-primary'}`}>
                                        {translate('vi')}
                                    </button>
                                    <span className="my-1 h-[1px] w-[80%] border-b border-dashed" />
                                    <button
                                        title={translate('en')}
                                        onClick={() => chooseLanguageHandler('en')}
                                        className={`flex min-w-[100px] items-center justify-start gap-2 px-2 py-1 hover:bg-[rgba(0,0,0,0.05)] active:scale-90 dark:hover:bg-[rgba(255,255,255,0.1)] ${lang == 'en' && 'text-primary'}`}>
                                        {translate('en')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        className="relative flex w-12 cursor-pointer flex-col items-center px-2 py-1 hover:text-primary"
                        onClick={() => chooseThemeHandler(mode == 'light' ? 'dark' : 'light')}>
                        {mode == 'light' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-5">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                />
                            </svg>
                        )}
                        <span className="mt-[2px] text-xs capitalize">{translate(mode)}</span>
                    </button>
                </div>
                <div className="hidden items-center sm:flex">
                    {userInfo ? (
                        <AccountInfo userInfo={userInfo} />
                    ) : (
                        <>
                            <Link
                                title={translate('login')}
                                to={APP_PATH.login}
                                className="flex w-20 flex-col items-center rounded-md py-1 hover:text-primary">
                                <span className="mt-[2px] text-xs">{translate('login')}</span>
                            </Link>
                            <span>/</span>
                            <Link
                                title={translate('register')}
                                to={APP_PATH.register}
                                className="flex w-16 flex-col items-center rounded-md py-1 hover:text-primary">
                                <span className="mt-[2px] text-xs">{translate('register')}</span>
                            </Link>
                        </>
                    )}
                </div>
                {/* hamburger button */}
                <div className="flex items-center gap-1 sm:hidden">
                    <button
                        title={translate('search')}
                        onClick={() => setIsOpenMiniMenu((prev) => !prev)}
                        className="h-[18px] w-[18px] bg-search-icon bg-center bg-no-repeat p-4"
                    />
                    <button
                        title={translate('menu-title')}
                        onClick={() => setIsOpenMiniMenu((prev) => !prev)}
                        className="flex flex-col gap-[5px] p-2">
                        <span
                            className={classNames('block h-[3px] w-6 rounded-full bg-gray-400 transition-all duration-300', {
                                'translate-y-2 rotate-45': isOpenMiniMenu,
                                'rotate-0': !isOpenMiniMenu,
                            })}
                        />
                        <span
                            className={classNames('block h-[3px] w-6 rounded-full bg-gray-400 transition-all duration-300', {
                                'opacity-0': isOpenMiniMenu,
                                'opacity-100': !isOpenMiniMenu,
                            })}
                        />
                        <span
                            className={classNames('block h-[3px] w-6 rounded-full bg-gray-400 transition-all duration-300', {
                                '-translate-y-2 -rotate-45': isOpenMiniMenu,
                                'rotate-0': !isOpenMiniMenu,
                            })}
                        />
                    </button>
                </div>
                {/* hamburger open */}
                <div
                    className={`${
                        isOpenMiniMenu ? 'translate-x-0' : 'translate-x-full'
                    } fixed inset-0 top-[74px] z-50 block h-full overflow-y-auto bg-slate-100 p-4 pt-0 transition-all duration-200 dark:bg-gray-700 sm:hidden`}>
                    <div className="my-4">
                        <SearchBar />
                    </div>
                    <ul className="flex flex-col gap-4 text-lg dark:text-white">
                        <li>
                            <Link
                                title={translate('home-title')}
                                to={APP_PATH.home}
                                className={`block capitalize hover:text-primary ${useMatch(APP_PATH.home) && ' text-primary'}`}>
                                {translate('home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                title={translate('history-title')}
                                to={APP_PATH.history}
                                className={`block capitalize hover:text-primary ${useMatch(APP_PATH.history) && ' text-primary'}`}>
                                {translate('history')}
                            </Link>
                        </li>
                    </ul>
                    <br />
                    {!userInfo && (
                        <>
                            <Link
                                to={APP_PATH.login}
                                className="flex flex-col border-y-2 border-gray-400 py-1 hover:text-primary dark:text-white">
                                {translate('login')}
                            </Link>
                            <Link
                                to={APP_PATH.register}
                                className="flex flex-col py-1 hover:text-primary dark:text-white">
                                {translate('register')}
                            </Link>
                        </>
                    )}
                    {userInfo && (
                        <Link
                            to={APP_PATH.logout}
                            className="flex flex-col border-y-2 border-gray-400 py-1 hover:text-primary dark:text-white">
                            {translate('logout')}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
