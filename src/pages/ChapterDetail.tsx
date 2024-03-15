import chapterApi from '@/apis/chapter';
import { APP_PATH } from '@/constants/path';
import { useAppSelector } from '@/hooks/reduxHook';
import useScrollTop from '@/hooks/useScrollTop';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';

const ChapterDetail: React.FC = () => {
    const { chapterId } = useParams();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const navigate = useNavigate();
    const isShow = useScrollTop(50);

    const { data: chapterDetailResultData } = useQuery({
        queryKey: ['getChapterById', { chapterId }],
        queryFn: () => chapterApi.getChapterById(chapterId),
        staleTime: 3 * 60 * 1000,
    });

    const chapterDetail = chapterDetailResultData?.data;

    const { data: chapterResultData } = useQuery({
        queryKey: ['getAllChapters', { comicId: chapterDetail?.comicId }],
        queryFn: () => chapterApi.getAllChapters(chapterDetail?.comicId),
        staleTime: 3 * 60 * 1000,
    });

    const dataChapter = chapterResultData?.data.data || [];

    const currentIndex = dataChapter.findIndex((chapter) => chapter._id === chapterDetail?._id);

    const onChangeChapter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        navigate(`/${APP_PATH.comics_chapters}/${e.target.value}`);
    };

    const onChangePrevOrNextChapter = (index: number) => {
        const value = dataChapter[index]._id;
        navigate(`/${APP_PATH.comics_chapters}/${value}`);
    };

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
                    'fixed top-0 max-w-[1200px]': isShow,
                })}>
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
                                fill-rule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <p className="ml-2">{translate('prev')}</p>
                    </div>
                </button>
                <select
                    onChange={(e) => onChangeChapter(e)}
                    value={chapterId}
                    className="inline-flex h-10 w-[400px] items-center overflow-hidden text-ellipsis border-2 border-gray-400 bg-yellow-100 pl-4 font-bold text-gray-700">
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
                                fill-rule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <div
                className="flex select-none flex-col gap-y-8 bg-yellow-50 px-16 py-8 text-2xl"
                dangerouslySetInnerHTML={{ __html: chapterDetail?.content || '' }}
            />
        </div>
    );
};

export default ChapterDetail;