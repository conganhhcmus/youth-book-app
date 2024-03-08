import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { paramOption } from '@/types/request';
import classNames from 'classnames';
import { createSearchParams, useNavigate } from 'react-router-dom';

interface MiniPaginationProps {
    totalPage: number;
    page: number;
    queryConfig: paramOption;
}

const MiniPagination = ({ totalPage, page, queryConfig }: MiniPaginationProps) => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const navigate = useNavigate();

    const nextPage = () => {
        if (page < totalPage) {
            navigate({
                search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString(),
                }).toString(),
            });
        }
    };
    const PrevPage = () => {
        if (page > 1) {
            navigate({
                search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString(),
                }).toString(),
            });
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-lg text-black dark:text-white">
                <strong className="text-primary">{page}</strong>/{totalPage}
            </span>
            <div className="flex items-center gap-1">
                <button
                    title={translate('prevPage')}
                    onClick={PrevPage}
                    className={classNames(
                        'flex justify-center rounded-md border px-3 py-2 text-black active:scale-95 dark:border-gray-500 dark:text-gray-300',
                        {
                            'cursor-default text-gray-400 opacity-60': page === 1,
                            'hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary': page !== 1,
                        },
                    )}>
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
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <button
                    title={translate('nextPage')}
                    onClick={nextPage}
                    className={classNames(
                        'flex justify-center rounded-md border px-3 py-2 text-black active:scale-95 dark:border-gray-500 dark:text-gray-300',
                        {
                            'cursor-default text-gray-400 opacity-60': totalPage === page,
                            'hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary': totalPage !== page,
                        },
                    )}>
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
                </button>
            </div>
        </div>
    );
};

export default MiniPagination;
