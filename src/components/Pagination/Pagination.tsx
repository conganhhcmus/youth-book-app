import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { paramOption } from '@/types/request';
import classNames from 'classnames';
import { Link, createSearchParams } from 'react-router-dom';

interface PaginationProps {
    totalPage: number;
    page: number;
    queryConfig: paramOption;
}

const Pagination = ({ page, totalPage, queryConfig }: PaginationProps) => {
    const RANGE = 2;
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const _renderPagination = () => {
        let dotAfter = false;
        let dotBefore = false;
        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span
                        key={index}
                        className="bg-white px-1 pt-2 text-black dark:bg-gray-900 dark:text-white">
                        ...
                    </span>
                );
            }
            return null;
        };
        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span
                        key={index}
                        className="bg-white px-1 pt-2 text-black dark:bg-gray-900 dark:text-white">
                        ...
                    </span>
                );
            }
            return null;
        };
        return Array(totalPage)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;
                if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
                    return renderDotAfter(index);
                } else if (page > RANGE * 2 + 1 && page < totalPage - RANGE * 2) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index);
                    } else if (pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
                        return renderDotAfter(index);
                    }
                } else if (page >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
                    return renderDotBefore(index);
                }

                return (
                    <Link
                        title={`${translate('page')} ${pageNumber}`}
                        to={{
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString(),
                            }).toString(),
                        }}
                        key={index}
                        className={classNames(
                            'mx-1 flex h-[34px] cursor-pointer items-center justify-center rounded border bg-white px-3 text-black shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white',
                            {
                                'border-primary text-primary dark:border-primary dark:text-primary': pageNumber === page,
                                'border hover:border-primary hover:text-primary dark:border-gray-500 dark:hover:border-primary dark:hover:text-primary':
                                    pageNumber !== page,
                            },
                        )}>
                        {pageNumber}
                    </Link>
                );
            });
    };

    console.log(totalPage, page);
    return (
        <div className="mt-4 flex h-20 flex-wrap justify-center gap-1 gap-y-2">
            {page === 1 ? (
                <span className="flex h-[34px] cursor-default items-center justify-center rounded border px-3 text-black opacity-60 shadow-sm dark:border-gray-500 dark:bg-gray-900 dark:text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4 opacity-60">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </span>
            ) : (
                <Link
                    title={translate('prevPage')}
                    to={{
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page - 1).toString(),
                        }).toString(),
                    }}
                    className="flex h-[34px] cursor-pointer items-center justify-center rounded border bg-white px-3 text-black shadow-sm hover:border-primary hover:text-primary dark:border-gray-500 dark:bg-gray-900 dark:text-white dark:hover:border-primary dark:hover:text-primary">
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
                </Link>
            )}
            {_renderPagination()}
            {page === totalPage ? (
                <span className="flex h-[34px] cursor-default items-center justify-center rounded border px-3 text-black opacity-60 shadow-sm dark:border-gray-500 dark:text-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4 opacity-60">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </span>
            ) : (
                <Link
                    title={translate('nextPage')}
                    to={{
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page + 1).toString(),
                        }).toString(),
                    }}
                    className="flex h-[34px] cursor-pointer items-center justify-center rounded border bg-white px-3 text-black shadow-sm hover:border-primary hover:text-primary dark:border-gray-500 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-primary dark:hover:text-primary">
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
            )}
        </div>
    );
};

export default Pagination;
