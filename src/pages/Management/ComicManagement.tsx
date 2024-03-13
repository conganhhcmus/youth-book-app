import comicApis from '@/apis/comic';
import { Pagination } from '@/components/Pagination';
import Popup from '@/components/Popup';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
// import { Comic } from '@/types/comic';
import { useState } from 'react';
import { useQuery } from 'react-query';

const ComicManagement: React.FC = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    // const [comicInfo, setComicInfo] = useState<Comic>();

    const translate = useTranslation(lang);
    const [searchText, setSearchText] = useState<string>('');
    const { queryParams } = useRequestParams();

    const { data: resultData } = useQuery({
        queryKey: ['suggestSearch', { ...queryParams, q: searchText }],
        queryFn: () => comicApis.suggestSearch({ ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
    });

    const result = resultData?.data;
    const comicList = result?.data;

    const handleSubmit = () => {};
    const _editComic = () => <></>;

    return (
        <div className="relative h-full w-full overflow-x-auto p-8 shadow-md sm:rounded-lg">
            {isShowEditAction && (
                <Popup
                    closeHandle={() => setIsShowEditAction(false)}
                    title={translate('edit-comic')}
                    content={_editComic()}
                    submitHandle={handleSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
                <div className="relative">
                    <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                        id="table-search-users"
                        className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Search for users"
                    />
                </div>
            </div>
            <div className="relative h-96 w-full overflow-y-auto sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('title')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('genres')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('author')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('latest-chapter')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comicList &&
                            comicList.map((comic) => (
                                <tr
                                    key={comic._id}
                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
                                        {comic.thumbnail ? (
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={comic.thumbnail}
                                                alt={comic.title}
                                            />
                                        ) : (
                                            <svg
                                                className="h-10 w-10 rounded-full"
                                                viewBox="0 0 1024 1024"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M508.3136 498.2784A221.4912 221.4912 0 1 0 286.72 276.48a221.7984 221.7984 0 0 0 221.5936 221.7984z m0-393.8304A172.3392 172.3392 0 1 1 336.0768 276.48a172.4416 172.4416 0 0 1 172.2368-172.032zM680.5504 536.7808a44.7488 44.7488 0 0 0-37.5808 3.2768 276.48 276.48 0 0 1-266.752 1.4336 44.6464 44.6464 0 0 0-37.6832-2.8672A481.28 481.28 0 0 0 30.0032 942.08a24.576 24.576 0 0 0 22.016 26.9312h2.4576a24.576 24.576 0 0 0 24.4736-22.1184 432.5376 432.5376 0 0 1 275.0464-361.472A326.5536 326.5536 0 0 0 665.6 583.68a437.4528 437.4528 0 0 1 279.4496 362.9056 24.576 24.576 0 1 0 48.9472-4.5056 487.0144 487.0144 0 0 0-313.4464-405.2992z"
                                                    fill=""
                                                />
                                            </svg>
                                        )}
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{comic.title}</div>
                                            <div className="font-normal text-gray-500">{comic.authors}</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 capitalize italic">{comic.genres.map((_) => _.name).join(', ')}</td>
                                    <td className="px-6 py-4 capitalize">{comic.authors}</td>
                                    <td className="px-6 py-4 capitalize">{comic.latest_chapter.slice(-1)[0].name}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setIsShowEditAction(true)}
                                            className="font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('edit')}
                                        </button>
                                        <button className="ml-2 font-medium capitalize text-red-600 hover:underline dark:text-red-500">
                                            {translate('delete')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {result?.totalPage && (
                <Pagination
                    queryConfig={queryParams}
                    page={result?.currentPage}
                    totalPage={result?.totalPage}
                />
            )}
        </div>
    );
};

export default ComicManagement;
