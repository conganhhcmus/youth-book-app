import comicApis from '@/apis/comic';
import genresApi from '@/apis/genres';
import DropDown from '@/components/Dropdown';
import { Pagination } from '@/components/Pagination';
import Popup from '@/components/Popup';
import { APP_PATH } from '@/constants/path';
import { COOKIE_KEYS } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Comic, ComicModel } from '@/types/comic';
import { getCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const ComicManagement: React.FC = () => {
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    const [isShowNewAction, setIsShowNewAction] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [comicInfo, setComicInfo] = useState<Comic>();
    const [genresChecked, setGenresChecked] = useState<string[]>();

    // Ref
    const refTitle = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refThumbnail = useRef<HTMLInputElement>(null);
    const refAuthor = useRef<HTMLInputElement>(null);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();
    const navigate = useNavigate();

    const { data: resultData } = useQuery({
        queryKey: ['suggestSearch', { ...queryParams, q: searchText }],
        queryFn: () => comicApis.suggestSearch({ ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
    });

    const { data: genresResultData } = useQuery({
        queryKey: ['allGenres'],
        queryFn: () => genresApi.getAllGenres(),
        staleTime: 3 * 60 * 1000,
    });

    const result = resultData?.data;
    const comicList = result?.data;

    const genres = genresResultData?.data?.data;

    const token = getCookie(COOKIE_KEYS.token);
    const userInfoPayload = decodeJWTToken(token);

    useEffect(() => {
        if (!userInfoPayload) {
            navigate(APP_PATH.home);
        }
    }, [userInfoPayload, navigate]);

    const handleNew = () => {
        setComicInfo(undefined);
        setIsShowNewAction(true);
    };

    const handleEdit = (id: string) => {
        setIsShowEditAction(true);
        callRequest(comicApis.getComicInfo(id), (res) => {
            setComicInfo(res.data);
        });
    };

    const handleNewSubmit = () => {
        if (!isValidNew()) {
            alert(translate('Invalid Data'));
            return;
        }
        const data = {
            name: refTitle.current?.value,
            description: refDescription.current?.value,
            thumbnail: refThumbnail.current?.value,
            author: refAuthor.current?.value,
            genres: genresChecked,
            createBy: userInfoPayload?._id,
        } as ComicModel;

        callRequest(comicApis.addComic(data), (res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const isValidNew = () => {
        return (
            genresChecked?.length &&
            genresChecked.length > 0 &&
            refAuthor.current?.value &&
            refDescription.current?.value &&
            refTitle.current?.value &&
            refThumbnail.current?.value
        );
    };

    const isValidEdit = () => {
        return (
            (genresChecked?.length && genresChecked.length > 0) ||
            refAuthor.current?.value ||
            refDescription.current?.value ||
            refTitle.current?.value ||
            refThumbnail.current?.value
        );
    };
    const handleEditSubmit = () => {
        if (!isValidEdit()) {
            alert(translate('NoChange'));
            return;
        }
        const data = {
            ...comicInfo,
            genres: genresChecked,
        } as ComicModel;

        callRequest(comicApis.updateComic(comicInfo?._id, data), (res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const handleGenresChange = (value: string[]) => {
        setGenresChecked(value);
    };

    const _comicInfoContent = () => (
        <form
            className="space-y-4 md:space-y-6"
            action="#">
            <div>
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('title')}
                </label>
                <input
                    ref={refTitle}
                    type="title"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={comicInfo?.name}
                    required={true}
                />
            </div>
            <div>
                <label
                    htmlFor="genres"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('genres')}
                </label>
                <DropDown
                    text={translate('choose-genres')}
                    data={genres?.map((x) => ({ id: x._id, title: x.name, value: x._id }))}
                    value={comicInfo?.genres.map((x) => x._id)}
                    onChange={handleGenresChange}
                />
            </div>
            <div>
                <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('description')}
                </label>
                <textarea
                    ref={refDescription}
                    className="rounded-lg border-2"
                    id="description"
                    placeholder={comicInfo?.description}
                    rows={4}
                    cols={66}
                />
            </div>
            <div>
                <label
                    htmlFor="thumbnail"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('thumbnail')}
                </label>
                <input
                    ref={refThumbnail}
                    type="thumbnail"
                    name="thumbnail"
                    id="thumbnail"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={comicInfo?.thumbnail}
                    required={true}
                />
            </div>
            <div>
                <label
                    htmlFor="author"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('author')}
                </label>
                <input
                    ref={refAuthor}
                    type="author"
                    name="author"
                    id="author"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={comicInfo?.author}
                    required={true}
                />
            </div>
        </form>
    );

    return (
        <div className="relative h-full w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            {isShowEditAction && (
                <Popup
                    closeHandle={() => setIsShowEditAction(false)}
                    title={translate('edit-comic')}
                    content={_comicInfoContent()}
                    submitHandle={handleEditSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            {isShowNewAction && (
                <Popup
                    closeHandle={() => setIsShowNewAction(false)}
                    title={translate('add-comic')}
                    content={_comicInfoContent()}
                    submitHandle={handleNewSubmit}
                    cancelHandle={() => setIsShowNewAction(false)}
                />
            )}
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
                <div className="relative">
                    <button
                        onClick={handleNew}
                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {translate('add')}
                    </button>
                </div>

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
                        id="table-search-comic"
                        className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Search for comic"
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
                                {translate('number-chapter')}
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
                                                alt={comic.name}
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
                                            <div className="text-base font-semibold">{comic.name}</div>
                                            <div className="font-normal text-gray-500">{comic.author}</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 capitalize italic">{comic.genres.map((_) => _.name).join(', ')}</td>
                                    <td className="px-6 py-4 capitalize">{comic.author}</td>
                                    <td className="px-6 py-4 capitalize">{comic.chapters.length}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => navigate(APP_PATH.management_chapters)}
                                            className="font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('chapter-management')}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(comic._id)}
                                            className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
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
