import comicApis from '@/apis/comic';
import genresApi from '@/apis/genres';
import DropDown from '@/components/Dropdown';
import { Pagination } from '@/components/Pagination';
import Popup from '@/components/Popup';
import { APP_PATH } from '@/constants/path';
import { COMIC_STATUS_LIST } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAlertMsg from '@/hooks/useAlertMsg';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Comic, ComicModel } from '@/types/comic';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import imgLoading from '@/assets/icons/loading.gif';
import { selectAccessToken } from '@/redux/slices/token';
import { decodeJWTToken } from '@/utils/token';

const ComicManagement: React.FC = () => {
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    const [isShowNewAction, setIsShowNewAction] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [comicInfo, setComicInfo] = useState<Comic>();
    const [genresChecked, setGenresChecked] = useState<string[]>([]);

    // Ref
    const refName = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refThumbnail = useRef<HTMLInputElement>(null);
    const refAuthor = useRef<HTMLInputElement>(null);
    const refRecommend = useRef<HTMLInputElement>(null);
    const refStatus = useRef<HTMLSelectElement>(null);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();
    const navigate = useNavigate();
    const { deleteSuccessAlert, updateSuccessAlert, addSuccessAlert, confirmWarningAlert } = useAlertMsg();

    const { data: resultData, isLoading } = useQuery({
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

    const token = useAppSelector((state) => selectAccessToken(state.token));
    const userInfoPayload = decodeJWTToken(token);

    const handleNew = () => {
        setComicInfo(undefined);
        setGenresChecked([]);
        setIsShowNewAction(true);
    };

    const handleEdit = (id: string) => {
        setIsShowEditAction(true);
        callRequest(comicApis.getComicInfo(id), (res) => {
            const data = res.data as Comic;
            setComicInfo(data);
            setGenresChecked(data.genres.map((x) => x._id));
        });
    };

    const handleNewSubmit = () => {
        if (!isValidNew()) {
            alert(translate('Invalid Data'));
            return;
        }
        const data = {
            name: refName.current?.value,
            description: refDescription.current?.value,
            thumbnail: refThumbnail.current?.value,
            author: refAuthor.current?.value,
            status: (refStatus.current && parseInt(refStatus.current?.value, 10)) || 0,
            genres: genresChecked,
            createBy: userInfoPayload?._id,
            createTime: moment().utc().toDate(),
        } as ComicModel;

        callRequest(comicApis.addComic(data), (res) => {
            console.log(res.data);
            addSuccessAlert(true);
        });
    };

    const isValidNew = () => {
        return (
            genresChecked &&
            genresChecked.length > 0 &&
            refAuthor.current?.value &&
            refDescription.current?.value &&
            refName.current?.value &&
            refThumbnail.current?.value &&
            refStatus.current?.value
        );
    };

    const isValidEdit = () => {
        return (
            (genresChecked && genresChecked.length > 0) ||
            refAuthor.current?.value ||
            refDescription.current?.value ||
            refName.current?.value ||
            refThumbnail.current?.value ||
            refRecommend.current?.checked !== comicInfo?.recommend ||
            refStatus.current?.value != comicInfo?.status
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
            author: refAuthor.current?.value || comicInfo?.author,
            description: refName.current?.value || comicInfo?.description,
            name: refName.current?.value || comicInfo?.name,
            status: refStatus.current?.value || comicInfo?.status,
            thumbnail: refThumbnail.current?.value || comicInfo?.thumbnail,
            recommend: refRecommend.current?.checked,
        } as ComicModel;

        callRequest(comicApis.updateComic(comicInfo?._id, data), (res) => {
            console.log(res.data);
            updateSuccessAlert(true);
        });
    };

    const handleGenresChange = (value: string, checked: boolean) => {
        let temp = [...genresChecked, value];

        if (!checked) {
            temp = temp.filter((v) => v !== value);
        }

        const uniqueValue = temp.filter(function (item, pos) {
            return temp.indexOf(item) == pos;
        });

        setGenresChecked(uniqueValue);
    };

    const handleDelete = (id: string) => {
        confirmWarningAlert(() =>
            callRequest(comicApis.deleteComic(id), (res) => {
                console.log(res.data);
                deleteSuccessAlert(true);
            }),
        );
    };
    const _comicInfoForm = () => (
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
                    ref={refName}
                    type="title"
                    name="title"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={comicInfo?.name}
                    required={true}
                />
            </div>
            <div className="flex flex-row gap-4">
                <label
                    htmlFor="genres"
                    className="mb-2 mt-2 w-20 text-sm font-medium text-gray-900 dark:text-white">
                    {translate('genres')}
                </label>
                <div className="h-8 w-48">
                    <DropDown
                        text={translate('choose-genres')}
                        data={genres?.map((x) => ({ id: x._id, title: x.name, value: x._id }))}
                        value={comicInfo?.genres.map((x) => x._id)}
                        onChange={handleGenresChange}
                    />
                </div>
                <input
                    type="checkbox"
                    defaultChecked={comicInfo?.recommend}
                    ref={refRecommend}
                    className="mt-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                />
                <label
                    htmlFor="genres"
                    className="mb-2 mt-2 w-20 text-sm font-medium capitalize text-gray-900 dark:text-white">
                    {translate('recommend')}
                </label>
                <label
                    htmlFor="status"
                    className="mt-2 h-4 text-sm font-medium text-gray-900 dark:text-white">
                    {translate('status')}
                </label>
                <select
                    ref={refStatus}
                    id="status"
                    key={comicInfo?.status}
                    defaultValue={comicInfo?.status}
                    className="w-30 h-10 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    {COMIC_STATUS_LIST.map((status) => (
                        <option
                            key={status.value}
                            value={status.value}>
                            {translate(status.name)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('description')}
                </label>
                <textarea
                    ref={refDescription}
                    className="w-full rounded-lg border-2"
                    id="description"
                    placeholder={comicInfo?.description}
                    rows={4}
                    cols={50}
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

    if (isLoading)
        return (
            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                <img
                    src={imgLoading}
                    alt="loading icon"
                    loading="lazy"
                />
                {translate('loading')}
            </div>
        );

    return (
        <div className="relative h-full w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            {isShowEditAction && (
                <Popup
                    closeHandle={() => setIsShowEditAction(false)}
                    title={translate('edit-comic')}
                    content={_comicInfoForm()}
                    submitHandle={handleEditSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            {isShowNewAction && (
                <Popup
                    closeHandle={() => setIsShowNewAction(false)}
                    title={translate('add-comic')}
                    content={_comicInfoForm()}
                    submitHandle={handleNewSubmit}
                    cancelHandle={() => setIsShowNewAction(false)}
                />
            )}
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
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
                                        className="flex items-center px-6 py-4 text-gray-900 dark:text-white">
                                        {comic.thumbnail ? (
                                            <img
                                                className="h-12 w-8 rounded-lg"
                                                src={comic.thumbnail}
                                                alt={comic.name}
                                            />
                                        ) : (
                                            <svg
                                                className="h-10 w-10 rounded-lg"
                                                viewBox="0 0 1024 1024"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M508.3136 498.2784A221.4912 221.4912 0 1 0 286.72 276.48a221.7984 221.7984 0 0 0 221.5936 221.7984z m0-393.8304A172.3392 172.3392 0 1 1 336.0768 276.48a172.4416 172.4416 0 0 1 172.2368-172.032zM680.5504 536.7808a44.7488 44.7488 0 0 0-37.5808 3.2768 276.48 276.48 0 0 1-266.752 1.4336 44.6464 44.6464 0 0 0-37.6832-2.8672A481.28 481.28 0 0 0 30.0032 942.08a24.576 24.576 0 0 0 22.016 26.9312h2.4576a24.576 24.576 0 0 0 24.4736-22.1184 432.5376 432.5376 0 0 1 275.0464-361.472A326.5536 326.5536 0 0 0 665.6 583.68a437.4528 437.4528 0 0 1 279.4496 362.9056 24.576 24.576 0 1 0 48.9472-4.5056 487.0144 487.0144 0 0 0-313.4464-405.2992z"
                                                    fill=""
                                                />
                                            </svg>
                                        )}
                                        <div className="max-w-[200px] ps-3">
                                            <div className="text-base font-semibold">{comic.name}</div>
                                            <div className="font-normal text-gray-500">{comic.author}</div>
                                        </div>
                                    </th>

                                    <td className="max-w-[200px] px-6 py-4 capitalize italic">{comic.genres.map((_) => _.name).join(', ')}</td>
                                    <td className="px-6 py-4 capitalize">{comic.author}</td>
                                    <td className="px-6 py-4 font-bold capitalize">{comic.chapters.length}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => navigate(APP_PATH.management_chapters + `/${comic._id}`)}
                                            className="font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('management')}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(comic._id)}
                                            className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('edit')}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comic._id)}
                                            className="ml-2 font-medium capitalize text-red-600 hover:underline dark:text-red-500">
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
