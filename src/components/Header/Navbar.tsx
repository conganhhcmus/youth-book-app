import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { NavLink, Link, createSearchParams, useMatch } from 'react-router-dom';

const Navbar = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const navItems = [
        {
            title: translate('new-comic-title'),
            link: {
                pathname: APP_PATH.recent,
                search: createSearchParams({
                    type: 'all',
                    page: '1',
                }).toString(),
            },
            name: translate('new-comic'),
            isCurrent: useMatch(APP_PATH.recent),
        },
        {
            title: translate('top-comic-title'),
            link: {
                pathname: APP_PATH.top,
                search: createSearchParams({
                    type: 'all',
                    page: '1',
                }).toString(),
            },
            name: translate('top-comic'),
            isCurrent: useMatch(APP_PATH.top),
        },
        {
            title: translate('genres-title'),
            link: {
                pathname: APP_PATH.genres,
                search: createSearchParams({
                    type: 'all',
                    page: '1',
                }).toString(),
            },
            name: translate('genres'),
            isCurrent: useMatch(APP_PATH.genres),
        },
        {
            title: translate('history-title'),
            link: {
                pathname: APP_PATH.history,
                search: createSearchParams({
                    type: 'all',
                    page: '1',
                }).toString(),
            },
            name: translate('history'),
            isCurrent: useMatch(APP_PATH.history),
        },
    ];

    return (
        <div className="bg-gray-200 text-black/80 dark:bg-gray-900 dark:text-white">
            <nav className="container min-h-[56px] p-4 lg:py-0 xl:p-0">
                <ul className="ml-4 flex items-center gap-3 overflow-x-auto overflow-y-hidden">
                    <li>
                        <NavLink
                            title={translate('home-title')}
                            to={APP_PATH.home}>
                            <svg
                                fill="#000000"
                                version="1.1"
                                id="home"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 495.398 495.398"
                                xmlSpace="preserve"
                                className={`h-5 w-5 hover:fill-primary ${useMatch(APP_PATH.home) && 'fill-primary'}`}>
                                <g
                                    id="SVGRepo_bgCarrier"
                                    strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <g>
                                                {' '}
                                                <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"></path>{' '}
                                                <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"></path>{' '}
                                            </g>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </NavLink>
                    </li>
                    {navItems &&
                        navItems.map((navItem) => (
                            <li key={navItem.name}>
                                <NavLink
                                    title={navItem.title}
                                    to={navItem.link}
                                    className={`text-sm font-semibold uppercase hover:text-primary ${navItem.isCurrent && ' text-primary'}`}>
                                    {navItem.name}
                                </NavLink>
                            </li>
                        ))}

                    <li className="ml-auto hidden lg:block">
                        <Link
                            to="https://www.facebook.com/profile.php?id=61555957911950&mibextid=uzlsIk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center gap-1 px-1 py-4 text-sm font-semibold uppercase hover:text-primary">
                            <span>{translate('group')}</span>
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
                            </span>
                        </Link>
                    </li>
                    <li className="hidden lg:block">
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            to="https://www.facebook.com/profile.php?id=61555957911950&mibextid=uzlsIk"
                            className="px-1 py-4 text-sm font-semibold uppercase hover:text-primary">
                            {translate('fanpage')}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
