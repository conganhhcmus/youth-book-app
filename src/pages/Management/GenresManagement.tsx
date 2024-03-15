import genresApi from '@/apis/genres';
import { Pagination } from '@/components/Pagination';
import Popup from '@/components/Popup';
import { COOKIE_KEYS } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Genres, GenresModel } from '@/types/comic';
import { getCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

const GenresManagement: React.FC = () => {
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    const [isShowNewAction, setIsShowNewAction] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [genresInfo, setGenresInfo] = useState<Genres>();

    const refName = useRef<HTMLInputElement>(null);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();

    const { data: genresResultData } = useQuery({
        queryKey: ['allGenres', { ...queryParams, q: searchText }],
        queryFn: () => genresApi.getAllGenres({ ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
    });

    const genresResult = genresResultData?.data;
    const genresList = genresResult?.data;

    const token = getCookie(COOKIE_KEYS.token);
    const userInfoPayload = decodeJWTToken(token);

    const handleNew = () => {
        setGenresInfo(undefined);
        setIsShowNewAction(true);
    };

    const handleEdit = (id: string) => {
        setIsShowEditAction(true);
        callRequest(genresApi.getGenresById(id), (res) => {
            console.log(res.data);
            setGenresInfo(res.data);
        });
    };

    const handleDelete = (id: string) => {
        callRequest(genresApi.deleteGenres(id), (res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const handleEditSubmit = () => {
        if (!refName.current?.value) {
            alert(translate('No Change'));
            return;
        }

        const data = {
            ...genresInfo,
            name: refName.current.value,
        } as GenresModel;

        callRequest(genresApi.updateGenres(genresInfo?._id, data), (res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const handleNewSubmit = () => {
        if (!refName.current?.value) {
            alert(translate('Invalid Data'));
            return;
        }

        const data = {
            name: refName.current.value,
            createTime: moment().utc().toDate(),
            createBy: userInfoPayload?._id,
        } as GenresModel;

        callRequest(genresApi.addGenres(data), (res) => {
            console.log(res.data);
            window.location.reload();
        });
    };

    const _genresInfoForm = () => (
        <form
            className="space-y-4 md:space-y-6"
            action="#">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('name')}
                </label>
                <input
                    ref={refName}
                    type="name"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={genresInfo?.name}
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
                    title={translate('edit-genres')}
                    content={_genresInfoForm()}
                    submitHandle={handleEditSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            {isShowNewAction && (
                <Popup
                    closeHandle={() => setIsShowNewAction(false)}
                    title={translate('add-genres')}
                    content={_genresInfoForm()}
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
                                {translate('name')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('create-at')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('update-at')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('create-by')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {genresList &&
                            genresList.map((genres) => (
                                <tr
                                    key={genres._id}
                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-bold capitalize">{genres.name}</td>
                                    <td className="px-6 py-4 capitalize">{moment(genres.createTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4 capitalize">{moment(genres.updateTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(genres._id)}
                                            className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('edit')}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(genres._id)}
                                            className="ml-2 font-medium capitalize text-red-600 hover:underline dark:text-red-500">
                                            {translate('delete')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {genresResult?.totalPage && (
                <Pagination
                    queryConfig={queryParams}
                    page={genresResult?.currentPage}
                    totalPage={genresResult?.totalPage}
                />
            )}
        </div>
    );
};

export default GenresManagement;
