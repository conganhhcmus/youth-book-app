import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
    title: string;
    url: string;
}

const Breadcrumb = ({ title, url }: BreadcrumbProps) => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    return (
        <nav className="mt-2 flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        className="inline-flex items-center font-medium capitalize text-black hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                        to={APP_PATH.home}
                        title={translate('home')}>
                        <svg
                            className="me-2.5 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        {translate('home')}
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg
                            className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <Link
                            className="ms-1 font-medium capitalize text-black hover:text-primary dark:text-white dark:hover:text-primary md:ms-2"
                            to={url}
                            title={title}>
                            {title}
                        </Link>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
