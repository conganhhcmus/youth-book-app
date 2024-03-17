import chapterApi from '@/apis/chapter';
import Popup from '@/components/Popup';
import { TextAreaEditor } from '@/components';
import { COMIC_TYPES_LIST } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Chapter, ChapterModel } from '@/types/comic';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useAlertMsg from '@/hooks/useAlertMsg';
import { formatCurrency } from '@/utils/format';

const ChapterManagement: React.FC = () => {
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    const [isShowNewAction, setIsShowNewAction] = useState<boolean>(false);
    const [chapterInfo, setChapterInfo] = useState<Chapter>();
    const [searchText, setSearchText] = useState<string>('');

    const { comicId } = useParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();
    const { deleteSuccessAlert, updateSuccessAlert, addSuccessAlert, confirmWarningAlert } = useAlertMsg();

    // Ref
    const [chapterContent, setChapterContent] = useState<string>('');
    const refName = useRef<HTMLInputElement>(null);
    const refShortName = useRef<HTMLInputElement>(null);
    const refPrice = useRef<HTMLInputElement>(null);
    const refType = useRef<HTMLSelectElement>(null);

    const { data: chapterResultData } = useQuery({
        queryKey: ['getAllChapters', { ...queryParams, q: searchText }, { comicId }],
        queryFn: () => chapterApi.getAllChapters(comicId, { ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
    });

    const chapterResult = chapterResultData?.data;

    const chapterList = chapterResult?.data;

    const handleNew = () => {
        setChapterInfo(undefined);
        setIsShowNewAction(true);
    };

    const handleEdit = (id: string) => {
        setIsShowEditAction(true);
        callRequest(chapterApi.getChapterById(id), (res) => {
            setChapterInfo(res.data);
        });
    };

    const handleDelete = (id: string) => {
        confirmWarningAlert(() =>
            callRequest(chapterApi.deleteChapter(id), (res) => {
                console.log(res.data);
                deleteSuccessAlert(true);
            }),
        );
    };

    const isValidNew = () => {
        return refName.current?.value && refShortName.current?.value && chapterContent && refPrice.current?.value && refType.current?.value;
    };

    const isValidEdit = () => {
        return chapterContent || refName.current?.value || refShortName.current?.value || refPrice.current?.value || refType.current?.value;
    };

    const handleEditSubmit = () => {
        if (!isValidEdit()) {
            alert(translate('NoChange'));
            return;
        }

        const data = {
            ...chapterInfo,
            name: refName.current?.value || chapterInfo?.name,
            shortName: refShortName.current?.value || chapterInfo?.shortName,
            type: (refType.current?.value && parseInt(refType.current?.value)) || chapterInfo?.type,
            content: chapterContent || chapterInfo?.content,
            price: (refPrice.current?.value && parseInt(refPrice.current?.value)) || chapterInfo?.price,
        } as ChapterModel;

        callRequest(chapterApi.updateChapter(chapterInfo?._id, data), (res) => {
            console.log(res.data);
            updateSuccessAlert(true);
        });
    };

    const handleNewSubmit = () => {
        if (!isValidNew()) {
            alert(translate('Invalid Data'));
            return;
        }

        const data = {
            comicId: comicId,
            name: refName.current?.value,
            shortName: refShortName.current?.value,
            type: parseInt(refType.current?.value || '0'),
            content: chapterContent,
            price: parseInt(refPrice.current?.value || '0'),
            createTime: moment().utc().toDate(),
        } as ChapterModel;

        callRequest(chapterApi.addChapter(data), (res) => {
            console.log(res.data);
            addSuccessAlert(true);
        });
    };

    const _chapterInfoForm = () => (
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
                    placeholder={chapterInfo?.name}
                    required={true}
                />
            </div>
            <div>
                <label
                    htmlFor="shortName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('short-name')}
                </label>
                <input
                    ref={refShortName}
                    type="shortName"
                    name="shortName"
                    id="shortName"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder={chapterInfo?.shortName}
                    required={true}
                />
            </div>
            <div>
                <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('price')}
                </label>
                <input
                    ref={refPrice}
                    type="number"
                    name="price"
                    id="price"
                    min={0}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    defaultValue={chapterInfo?.price || 0}
                    required={true}
                />
            </div>
            <div>
                <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('type')}
                </label>
                <select
                    ref={refType}
                    id="type"
                    defaultValue={chapterInfo?.type}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    {COMIC_TYPES_LIST.map((type) => (
                        <option
                            key={type.value}
                            value={type.value}>
                            {translate(type.name)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label
                    htmlFor="content"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('content')}
                </label>
                <TextAreaEditor
                    onChange={(val) => setChapterContent(val)}
                    initialValue={chapterInfo?.content}
                />
            </div>
        </form>
    );

    return (
        <div className="relative h-full w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            {isShowEditAction && (
                <Popup
                    closeHandle={() => setIsShowEditAction(false)}
                    title={translate('edit-chapter')}
                    content={_chapterInfoForm()}
                    submitHandle={handleEditSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            {isShowNewAction && (
                <Popup
                    closeHandle={() => setIsShowNewAction(false)}
                    title={translate('add-chapter')}
                    content={_chapterInfoForm()}
                    submitHandle={handleNewSubmit}
                    cancelHandle={() => setIsShowNewAction(false)}
                />
            )}
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
                <div className="relative">
                    <button
                        onClick={() => history.back()}
                        className="mb-2 me-2 rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {translate('go-back')}
                    </button>
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
                                {translate('price')}
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
                        {chapterList &&
                            chapterList.map((chapter) => (
                                <tr
                                    key={chapter._id}
                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <td className="max-w-60 px-6 py-4 font-bold capitalize">{chapter.name}</td>
                                    <td className="min-w-20 px-6 py-4 font-bold text-primary">{formatCurrency(chapter.price)}</td>
                                    <td className="px-6 py-4 capitalize">{moment(chapter.createTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4 capitalize">{moment(chapter.updateTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(chapter._id)}
                                            className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('edit')}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(chapter._id)}
                                            className="ml-2 font-medium capitalize text-red-600 hover:underline dark:text-red-500">
                                            {translate('delete')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChapterManagement;
