import authApis from '@/apis/auth';
import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { User } from '@/types/user';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const refUserName = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const refConfirmPassword = useRef<HTMLInputElement>(null);
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { callRequest } = useAxiosRequest();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setIsSubmitted(true);

        if (refConfirmPassword.current?.value !== refPassword.current?.value) {
            alert(`Confirm Password not match!`);
            setIsSubmitted(false);
            return;
        }

        const data = {
            username: refUserName.current?.value,
            email: refEmail.current?.value,
            password: refPassword.current?.value,
        } as User;

        callRequest(
            authApis.register(data),
            () => navigate(APP_PATH.login),
            (err) => {
                alert(err.response?.data);
                setIsSubmitted(false);
            },
        );
    };

    return (
        <div className="container flex min-h-full items-center justify-center px-4 pt-4 xl:px-0">
            <Helmet>
                <title>{translate('register-title')}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <div className="w-full rounded-lg border bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-xl md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        {translate('register')}
                    </h1>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="space-y-4 md:space-y-6"
                        action="#">
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                {translate('your-username')}
                            </label>
                            <input
                                ref={refUserName}
                                type="username"
                                name="username"
                                id="username"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="username"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                {translate('your-email')}
                            </label>
                            <input
                                ref={refEmail}
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="email@example.com"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                {translate('password')}
                            </label>
                            <input
                                ref={refPassword}
                                type="password"
                                name="password"
                                minLength={4}
                                id="password"
                                placeholder="••••••••"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                {translate('confirm-password')}
                            </label>
                            <input
                                ref={refConfirmPassword}
                                type="password"
                                name="confirm-password"
                                minLength={4}
                                id="confirm-password"
                                placeholder="••••••••"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                required={true}
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
                                    required={true}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300">
                                    {translate('accept-term')}{' '}
                                    <a
                                        className="font-medium capitalize text-gray-700 hover:text-primary hover:underline dark:text-gray-200 dark:hover:text-primary"
                                        href="#">
                                        {translate('terms-conditions')}
                                    </a>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className="w-full rounded-lg bg-gradient px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:bg-gradient dark:hover:bg-gradient dark:focus:ring-primary">
                            {translate('register')}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {translate('already-account')}{' '}
                            <Link
                                to={APP_PATH.login}
                                className="text-grey-700 font-medium capitalize hover:text-primary hover:underline dark:text-gray-200 dark:hover:text-primary">
                                {translate('login-here')}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
