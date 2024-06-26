import chapterApi from '@/apis/chapter';
import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useReadChapter from '@/hooks/useReadChapter';
import useScrollTop from '@/hooks/useScrollTop';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { isEnabledRead } from '@/utils/comic';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { NotFound } from '../NotFound';
import { useEffect } from 'react';
import { addLocalDb } from '@/utils/indexedDB';
import { INDEXED_DB } from '@/constants/settings';
import comicApis from '@/apis/comic';
import moment from 'moment';
import imgLoading from '@/assets/icons/loading.gif';

const ChapterDetail: React.FC = () => {
    const { chapterId } = useParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const navigate = useNavigate();
    const isShow = useScrollTop(50);
    const { handleBuyEvent, transactionList } = useReadChapter();

    const { data: chapterDetailResultData, isLoading } = useQuery({
        queryKey: ['getChapterById', { chapterId }],
        queryFn: () => chapterApi.getChapterById(chapterId),
        staleTime: 3 * 60 * 1000,
    });

    const chapterDetail = chapterDetailResultData?.data;

    const { data: chapterResultData } = useQuery({
        queryKey: ['getFullChapters', { comicId: chapterDetail?.comicId }],
        queryFn: () => chapterApi.getFullChapters(chapterDetail?.comicId),
        staleTime: 3 * 60 * 1000,
    });

    const dataChapter = chapterResultData?.data || [];

    const { data: comicResultData } = useQuery({
        queryKey: ['getComicInfo', { comicId: chapterDetail?.comicId }],
        queryFn: () => comicApis.getComicInfo(chapterDetail?.comicId),
        staleTime: 3 * 60 * 1000,
        enabled: !!chapterDetail && !!chapterDetail.comicId,
    });

    const comicDetail = comicResultData?.data;
    const currentIndex = dataChapter.findIndex((chapter) => chapter._id === chapterDetail?._id);

    useEffect(() => {
        if (chapterDetail && comicDetail) {
            const data = {
                id: comicDetail._id,
                name: comicDetail.name,
                thumbnail: comicDetail.thumbnail,
                description: comicDetail.description,
                time: moment().format('HH:mm - DD/MM/YYY'),
                chapter_id: chapterDetail._id,
                reading_at: new Date().getTime(),
                last_reading: chapterDetail.name,
            };

            addLocalDb(data, INDEXED_DB.collection.history);
        }
    }, [chapterDetail, comicDetail]);

    const onChangeChapter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const chapter = dataChapter.find((x) => x._id === e.target.value);
        if (!chapter) return window.location.reload();
        if (isEnabledRead(chapter, transactionList)) {
            return navigate(`${APP_PATH.comics_chapters}/${chapter._id}`);
        }
        handleBuyEvent(chapter);
    };

    const onChangePrevOrNextChapter = (index: number) => {
        const chapter = dataChapter[index];
        if (isEnabledRead(chapter, transactionList)) {
            return navigate(`${APP_PATH.comics_chapters}/${chapter._id}`);
        }
        handleBuyEvent(chapter);
    };

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

    if (!isLoading && (!chapterDetail || !isEnabledRead(chapterDetail, transactionList))) return <NotFound />;

    return (
        <div className="container relative border-2 px-4 xl:px-0">
            <Helmet>
                <title>{`${chapterDetail?.name} - YouthBook`}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <div
                className={classNames('flex w-full flex-row items-start justify-center bg-yellow-50 py-6 ', {
                    'fixed top-0 z-50 max-w-[1280px]': isShow,
                })}>
                <button
                    type="button"
                    onClick={() => navigate(`${APP_PATH.comics}/${chapterDetail?.comicId}`)}
                    className={`mr-1 inline-flex h-10 items-center rounded-full border-2 border-gray-400 bg-yellow-100 px-3 py-2 font-bold text-gray-700 hover:bg-yellow-50`}>
                    <div className="flex flex-row align-middle">
                        <svg
                            className="w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g
                                id="SVGRepo_bgCarrier"
                                stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                </button>
                <button
                    type="button"
                    onClick={() => onChangePrevOrNextChapter(currentIndex - 1)}
                    disabled={currentIndex <= 0}
                    className={`mr-1 inline-flex h-10 items-center rounded-l-full border-2 border-gray-400 bg-yellow-100 px-3 py-2 font-bold text-gray-700 ${currentIndex > 0 ? 'hover:bg-yellow-50' : 'opacity-70'}`}>
                    <div className="flex flex-row align-middle">
                        <svg
                            className="mr-2 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                        <p className="ml-2">{translate('prev')}</p>
                    </div>
                </button>
                <select
                    onChange={(e) => onChangeChapter(e)}
                    value={chapterId}
                    className="inline-flex h-10 w-[350px] items-center overflow-hidden text-ellipsis border-2 border-gray-400 bg-yellow-100 pl-4 font-bold text-gray-700">
                    {dataChapter &&
                        dataChapter.map((chapter) => (
                            <option
                                className="font-bold text-gray-700"
                                key={chapter._id}
                                value={chapter._id}>
                                {chapter.name}
                            </option>
                        ))}
                </select>

                <button
                    type="button"
                    onClick={() => onChangePrevOrNextChapter(currentIndex + 1)}
                    disabled={currentIndex >= dataChapter.length - 1}
                    className={`ml-1 inline-flex h-10 items-center rounded-r-full border-2 border-gray-400 bg-yellow-100 px-3 py-2 font-bold text-gray-700 ${currentIndex < dataChapter.length - 1 ? 'hover:bg-yellow-50' : 'opacity-70'} `}>
                    <div className="flex flex-row align-middle">
                        <span className="mr-2">{translate('next')}</span>
                        <svg
                            className="ml-2 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <div
                className="flex min-h-[600px] select-none flex-col gap-y-8 bg-yellow-50 px-16 py-8 text-2xl"
                dangerouslySetInnerHTML={{ __html: chapterDetail?.content || '' }}
            />
        </div>
    );
};

export default ChapterDetail;
