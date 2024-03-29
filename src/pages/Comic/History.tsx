import { INDEXED_DB } from '@/constants/settings';
import { deleteAllLocalDb, deleteLocalDbByKey, getDataByKey } from '@/utils/indexedDB';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgError from '@/assets/icons/error.webp';
import { Helmet } from 'react-helmet-async';
import { APP_PATH } from '@/constants/path';
import { HistoryComic } from '@/types/comic';
import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';

const History: React.FC = () => {
    const [dataComics, setDataComics] = useState<unknown[]>([]);
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    useEffect(() => {
        getDataByKey('reading_at', INDEXED_DB.collection.history, (e) => setDataComics(e));
    }, []);

    return (
        <>
            <Helmet>
                <title>{`${translate('history-reading')} - YouthBook`}</title>
                <meta
                    name="description"
                    content={translate('history-reading')}
                />
            </Helmet>
            <div className="container px-2 lg:px-0">
                <div className="flex items-center justify-between text-black dark:text-white">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold capitalize text-black dark:text-white">
                            <strong className="text-primary">{translate('history-reading')}</strong>
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => deleteAllLocalDb(INDEXED_DB.collection.history.name)}
                            className="rounded-md border border-gray-500 px-2 py-1 hover:border-primary hover:text-primary active:scale-90 dark:border-gray-400 dark:hover:border-primary">
                            {translate('delete-all')}
                        </button>
                    </div>
                </div>
                <div className="mt-8 min-h-[600px]">
                    {dataComics && dataComics.length > 0 && (
                        <div className={`grid grid-cols-12 gap-4 lg:gap-6`}>
                            {(dataComics as HistoryComic[]).map((item) => (
                                <div
                                    key={item.id}
                                    className="col-span-12 rounded-lg hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)] sm:col-span-6">
                                    <div className="flex text-black dark:text-white">
                                        <Link
                                            to={`${APP_PATH.comics}/${item.id}`}
                                            title={item.name}
                                            className="flex-shrink-0">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.name}
                                                title={item.name}
                                                loading="lazy"
                                                className="h-[220px] w-[165px] object-cover"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = imgError;
                                                }}
                                            />
                                        </Link>
                                        <div className="flex flex-1 flex-col pl-[15px] pr-2 leading-5">
                                            <Link
                                                to={`${APP_PATH.comics}/${item.id}`}
                                                className="mt-3 line-clamp-1 text-lg font-bold leading-5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                                                title={item.name}>
                                                {item.name}
                                            </Link>
                                            <span className="mt-1 text-sm">{item.time}</span>
                                            <p className="mt-4 inline-block">
                                                <span className="mr-1 hidden lg:inline-block">{`${translate('reading')}:`}</span>
                                                <Link
                                                    to={`${APP_PATH.comics_chapters}/${item.chapter_id}`}
                                                    title={item.last_reading}
                                                    className="text-primary">
                                                    {item.last_reading}
                                                </Link>
                                            </p>
                                            <p className="mt-3 hidden md:line-clamp-3">{item.description}</p>
                                            <div className="mb-4 mt-auto flex flex-col items-center gap-1 md:mb-0 md:flex-row md:gap-3">
                                                <Link
                                                    title={item.last_reading}
                                                    to={`${APP_PATH.comics_chapters}/${item.chapter_id}`}
                                                    className="flex h-9 w-full items-center justify-center rounded-md border border-[#4b8fd7] text-[#4b8fd7] active:scale-90">
                                                    {translate('continue-reading')}
                                                </Link>
                                                <button
                                                    onClick={() => deleteLocalDbByKey(item.id, INDEXED_DB.collection.history)}
                                                    className="flex h-9 w-full items-center justify-center rounded-md border border-primary text-primary active:scale-90">
                                                    {translate('delete')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {Array.isArray(dataComics) && !dataComics.length && (
                        <h3 className="flex h-[550px] items-center justify-center text-2xl text-black dark:text-white">
                            {translate('not-found-history')}
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
};

export default History;
