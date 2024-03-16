import comicApis from '@/apis/comic';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { NotFound } from './NotFound';
import { Link, createSearchParams } from 'react-router-dom';
import { APP_PATH } from '@/constants/path';
import imgError from '@/assets/icons/error.webp';
import RatingStar from '@/components/RatingStar';
import { formatCurrency } from '@/utils/format';
import { useEffect, useRef, useState } from 'react';
import { ListChapter } from '@/components/Comics';
import useReadChapter from '@/hooks/useReadChapter';
import { isEnabledRead } from '@/utils/comic';
import useAlertMsg from '@/hooks/useAlertMsg';

const ComicDetail: React.FC = () => {
    const { comicId } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const refDescription = useRef<HTMLParagraphElement>(null);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { handleReadChapter, transactionList } = useReadChapter();
    const { dontSupportAlert } = useAlertMsg();

    const { data: comicResultData, isError } = useQuery({
        queryKey: ['getComicInfo', { comicId }],
        queryFn: () => comicApis.getComicInfo(comicId),
        staleTime: 3 * 60 * 1000,
    });

    const dataComics = comicResultData?.data;

    useEffect(() => {
        if (refDescription.current) {
            setIsShow(refDescription.current.scrollHeight !== refDescription.current.clientHeight);
        }
    }, [dataComics]);

    if (isError) return <NotFound />;

    return (
        <div className="">
            <Helmet>
                <title>{`${dataComics?.name} [Tới ${dataComics?.chapters.at(0)?.name}] - YouthBook`}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            {dataComics && (
                <>
                    <div className="relative min-h-[400px] w-full overflow-hidden">
                        <p
                            className="h-[400px] bg-cover bg-no-repeat"
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                backgroundImage: `url('${dataComics?.thumbnail}')`,
                                filter: 'blur(5px)',
                            }}
                        />
                    </div>
                    <div className="container mt-[-300px] blur-0">
                        <div className="w-full">
                            <div className="container h-full rounded-t-lg bg-white px-4 dark:bg-gray-900 lg:px-10">
                                <div className="min-h-[300px] pb-[30px] pt-[35px]">
                                    {dataComics && (
                                        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                                            <figure className="-mt-20 h-[280px] w-[200px] flex-shrink-0 overflow-hidden rounded-md shadow-[0_0_5px_#444] dark:border dark:border-gray-600 sm:h-[330px] sm:w-[240px]">
                                                <img
                                                    src={dataComics.thumbnail}
                                                    loading="lazy"
                                                    alt={dataComics.name}
                                                    className="pointer-events-none h-full w-full select-none object-cover"
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = imgError;
                                                    }}
                                                />
                                            </figure>
                                            <div className="w-full">
                                                <div className="-mt-2 flex items-start gap-6 lg:justify-between">
                                                    <h2
                                                        title={dataComics.name}
                                                        className="-ml-1 text-3xl font-semibold text-black dark:text-white">
                                                        {dataComics.name}
                                                    </h2>
                                                    <RatingStar rating={dataComics.totalFollowers} />
                                                </div>
                                                <span className="mt-1 block text-base capitalize text-black dark:text-white">
                                                    {translate('author') + ': '}
                                                    <strong className="text-primary">{dataComics.author}</strong>
                                                </span>
                                                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-base capitalize text-black dark:text-white">
                                                    <span>
                                                        {translate('total-views') + ': '}
                                                        <strong className="text-[#4b8fd7]">{formatCurrency(dataComics.totalViews)}</strong>
                                                    </span>
                                                    <span>
                                                        {translate('total-followers') + ': '}
                                                        <strong className="text-[#64d363]">{formatCurrency(dataComics.totalFollowers)}</strong>
                                                    </span>
                                                </p>
                                                <div className="my-2 mb-3 flex flex-wrap items-center gap-[6px] dark:text-white">
                                                    {dataComics.genres.map((genre) => {
                                                        return genre._id !== undefined ? (
                                                            <Link
                                                                to={{
                                                                    pathname: APP_PATH.genres,
                                                                    search: createSearchParams({
                                                                        type: genre._id,
                                                                        page: '1',
                                                                    }).toString(),
                                                                }}
                                                                title={genre.name}
                                                                key={genre._id}>
                                                                <span className="truncate border border-dashed border-[#d9d9d9] px-2 py-1 text-[13px] hover:border-primary hover:text-primary">
                                                                    {genre.name}
                                                                </span>
                                                            </Link>
                                                        ) : null;
                                                    })}
                                                </div>
                                                <div className="relative">
                                                    <p
                                                        ref={refDescription}
                                                        className={`text-base text-black/70 dark:text-gray-300 ${
                                                            !isOpen && ' max-h-[72px] overflow-hidden'
                                                        }`}>
                                                        {dataComics.description}
                                                    </p>
                                                    {isShow && isOpen && (
                                                        <button
                                                            title={translate('show-less')}
                                                            onClick={() => setIsOpen((prev) => !prev)}>
                                                            <span className="text-black dark:text-white">{translate('show-less')}</span>
                                                        </button>
                                                    )}{' '}
                                                    {isShow && !isOpen && (
                                                        <button
                                                            title={translate('show-more')}
                                                            className="absolute bottom-0 right-0 z-10 w-[50px] overflow-hidden rounded-full bg-white/90 dark:bg-gray-900/90"
                                                            onClick={() => setIsOpen((prev) => !prev)}>
                                                            <span className="font-medium text-black dark:text-white">{translate('show-more')}</span>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="mt-2 flex items-center gap-3">
                                                    <Link
                                                        onClick={(event) => handleReadChapter(event, dataComics.chapters[0])}
                                                        title={translate('read-now-title')}
                                                        to={
                                                            dataComics.chapters.length > 0
                                                                ? `${APP_PATH.comics_chapters}/${dataComics.chapters[0]._id}`
                                                                : '#'
                                                        }
                                                        className="flex h-[38px] w-[150px] flex-shrink-0 items-center justify-center gap-2 rounded bg-gradient font-semibold capitalize text-white">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            aria-hidden="true"
                                                            className="h-6 w-6"
                                                            viewBox="0 0 32 32">
                                                            <path
                                                                fill="currentColor"
                                                                d="M19 10h7v2h-7zm0 5h7v2h-7zm0 5h7v2h-7zM6 10h7v2H6zm0 5h7v2H6zm0 5h7v2H6z"
                                                            />
                                                            <path
                                                                fill="currentColor"
                                                                d="M28 5H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2ZM4 7h11v18H4Zm13 18V7h11v18Z"
                                                            />
                                                        </svg>
                                                        {translate('read-now')}
                                                        {!isEnabledRead(dataComics.chapters[0], transactionList) && (
                                                            <svg
                                                                className="mx-1 inline-flex h-5 w-5"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <g strokeWidth="0"></g>
                                                                <g
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"></g>
                                                                <g>
                                                                    <path
                                                                        d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                                                                        stroke="#000000"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"></path>
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </Link>
                                                    <button
                                                        title={translate('follow')}
                                                        onClick={() => {
                                                            dontSupportAlert(false);
                                                        }}
                                                        className="flex h-[38px] w-[120px] flex-shrink-0 items-center justify-center gap-2 rounded border border-primary font-semibold capitalize text-primary active:scale-95">
                                                        <svg
                                                            className="mt-1 h-6 w-6 fill-primary"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                {' '}
                                                                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>{' '}
                                                            </g>
                                                        </svg>
                                                        {translate('follow')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between gap-4 lg:gap-[30px]">
                                    <div className="max-w-[852px] flex-1">
                                        <section className="min-h-[400px]">
                                            <h3 className="flex items-center gap-2 border-b border-slate-200 pb-1 text-lg capitalize text-primary dark:border-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    aria-hidden="true"
                                                    className="h-6 w-6 flex-shrink-0 text-primary"
                                                    viewBox="0 0 32 32">
                                                    <path
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7S9 1 2 6v22c7-5 14 0 14 0s7-5 14 0V6c-7-5-14 1-14 1Zm0 0v21"
                                                    />
                                                </svg>
                                                {translate('chapter-list')}
                                            </h3>
                                            {dataComics.chapters.length > 0 && <ListChapter data={dataComics.chapters} />}
                                        </section>
                                    </div>
                                    {/* <div className="hidden w-[238px] flex-shrink-0 flex-col gap-6 md:flex">
                                        <>
                                            <h4 className="flex items-center border px-5 py-3 pl-3 text-lg font-semibold text-black dark:border-gray-500 dark:text-white">
                                                Top weekly
                                            </h4>
                                            <div className="-mt-6 flex min-h-[600px] flex-col border border-t-0 dark:border-gray-500">
                                                {dataWeeklyComics &&
                                                    dataWeeklyComics.slice(0, 10).map((item, i) => (
                                                        <SuggestComics
                                                            key={item.id}
                                                            index={i}
                                                            title={item.title}
                                                            src={item.thumbnail}
                                                            idChapter={item.last_chapter.id}
                                                            chapter={item.last_chapter.name}
                                                            genres={item.genres.map((item) => item.name) as [string]}
                                                            idComic={item.id}
                                                        />
                                                    ))}
                                                {!dataWeeklyComics && (
                                                    <div className="flex h-[300px] items-center justify-center gap-2 text-black dark:text-white">
                                                        <img
                                                            src={imgLoading}
                                                            alt="loading icon"
                                                            loading="lazy"
                                                        />
                                                        Loading...
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ComicDetail;
