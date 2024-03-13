import { APP_PATH } from '@/constants/path';
import { Comic } from '@/types/comic';
import { Link } from 'react-router-dom';

import errorIcon from '@/assets/icons/error.webp';
import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';

interface ComicVerticalProps {
    data: Comic;
}

const ComicVertical = ({ data }: ComicVerticalProps) => {
    const { _id: id, title: title, thumbnail, description: short_description } = data;
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    return (
        <div className="relative">
            <div className="group h-[240px] w-full overflow-hidden xl:h-[220px]">
                <Link
                    to={`${APP_PATH.comics}/${id}`}
                    title={title}>
                    <img
                        src={thumbnail}
                        title={title}
                        alt={title}
                        className="h-full w-full object-cover transition-all duration-300 hover:scale-[1.15] xl:pointer-events-none"
                        loading="lazy"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = errorIcon;
                        }}
                    />
                </Link>
                <div className="absolute left-[-30px] top-[-15px] z-[2] hidden h-[299px] scale-[0.73] opacity-0 shadow-2xl transition-all duration-300 group-hover:h-[330px] group-hover:scale-100 group-hover:opacity-100 xl:block">
                    <div className="min-h-[330px] w-[226px] bg-white dark:overflow-hidden dark:border dark:border-gray-800 dark:bg-gray-900">
                        <Link
                            to={`${APP_PATH.comics}/${id}`}
                            title={title}>
                            <p
                                className="h-[160px] w-[226px] bg-cover bg-[center_30%] bg-no-repeat"
                                style={{
                                    backgroundImage: `url('${thumbnail}'), url('${errorIcon}')`,
                                }}
                            />
                        </Link>
                        <div className="p-[10px]">
                            <Link
                                to={`${APP_PATH.comics}/${id}`}
                                title={title}
                                className="text-base font-semibold leading-5 text-black hover:text-primary dark:text-white dark:hover:text-primary">
                                {title}
                            </Link>
                            {data &&
                                data.chapters &&
                                data.chapters.slice(0, 3).map((chapter) => (
                                    <div
                                        key={chapter.id}
                                        className="mt-2">
                                        <Link
                                            to={`${APP_PATH.comics_chapters}/${id}/${chapter.id}`}
                                            title={chapter.name}
                                            className={`mt-[2px] inline-block text-sm text-primary`}>
                                            {chapter.name}
                                        </Link>
                                        <span className="float-right inline-block text-sm text-gray-400">
                                            {new Date(chapter.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}

                            <p className="mt-2 line-clamp-2 text-sm text-gray-400">{short_description}</p>
                            <Link
                                title={translate('read-now-title')}
                                to={`${APP_PATH.comics}/${id}`}
                                className="mt-[10px] flex h-[30px] w-full items-center justify-center rounded bg-primary text-center text-sm font-semibold uppercase text-white">
                                {translate('read-now')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex flex-col text-black dark:text-white">
                <Link
                    to={`${APP_PATH.comics}/${id}`}
                    title={title}
                    className="mb-2 line-clamp-1 text-base font-semibold leading-4 hover:text-primary">
                    {title}
                </Link>
                {data &&
                    data.chapters &&
                    data.chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="mt-1">
                            <Link
                                to={`${APP_PATH.comics_chapters}/${id}/${chapter.id}`}
                                title={chapter.name}
                                className="float-left inline-block truncate whitespace-nowrap text-sm text-primary">
                                {chapter.name}
                            </Link>
                            <span className="float-right inline-block text-center text-sm text-gray-400">
                                {new Date(chapter.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ComicVertical;
