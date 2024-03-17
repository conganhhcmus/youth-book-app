import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Link, createSearchParams } from 'react-router-dom';

interface TittlePreviewProps {
    img?: string;
    title: string;
    url?: string;
    isShowMore?: boolean;
}

const TitlePreview = ({ img, title, url = '', isShowMore = false }: TittlePreviewProps) => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    return (
        <div className="mb-4 flex items-end justify-between">
            <div className="flex items-center gap-2 lg:gap-4">
                {img && (
                    <img
                        src={img}
                        alt="Icon"
                        className="h-5 w-auto lg:h-[24px]"
                        loading="lazy"
                    />
                )}
                <h2 className="mt-1 text-base font-semibold capitalize leading-5 text-black dark:text-white lg:text-[24px]">{title}</h2>
            </div>
            {isShowMore && (
                <div className="w-24">
                    <Link
                        title={translate('all')}
                        to={{
                            pathname: url,
                            search: createSearchParams({
                                page: '1',
                                status: 'all',
                                type: 'all',
                            }).toString(),
                        }}
                        className="flex flex-1 items-center justify-end gap-1 text-sm text-black hover:text-primary dark:text-white dark:hover:text-primary">
                        <span>{translate('all')}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TitlePreview;
