import authApis from '@/apis/auth';
import { Footer } from '@/components';
import { Header, Navbar } from '@/components/Header';
import ScrollToTop from '@/components/ScrollTop';
import { APP_PATH } from '@/constants/path';
import { COOKIE_KEYS } from '@/constants/settings';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import { getCookie, setCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { callRequest } = useAxiosRequest();
    const token = getCookie(COOKIE_KEYS.token);
    const userInfoPayload = decodeJWTToken(token);

    useEffect(() => {
        if (userInfoPayload) {
            callRequest(
                authApis.fetchInfo(),
                (res) => {
                    const token = res.data;
                    !!token && setCookie(COOKIE_KEYS.token, token);
                },
                (err) => {
                    console.log(err);
                },
            );
        }
    }, [callRequest, navigate, userInfoPayload]);

    return (
        <div className="grid h-full min-h-screen grid-cols-1 place-content-between">
            <header
                className={classNames('left-0 right-0 top-0 z-20', {
                    sticky: !location.pathname.includes(APP_PATH.comics_chapters),
                })}>
                <Header />
                <Navbar />
            </header>
            <main className="place-self-stretch">
                <Outlet />
            </main>
            <footer className="mt-20 w-full bg-gray-200">
                <Footer />
            </footer>
            <ScrollToTop />
        </div>
    );
};

export default MainLayout;
