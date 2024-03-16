import { APP_PATH } from '@/constants/path';
import { Comic } from '@/types/comic';
import { Link } from 'react-router-dom';
import errorIcon from '@/assets/icons/error.webp';
import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import moment from 'moment';
import { isEnabledRead } from '@/utils/comic';
import useReadChapter from '@/hooks/useReadChapter';

interface ComicVerticalProps {
    data: Comic;
}

const ComicVertical = ({ data }: ComicVerticalProps) => {
    const { _id: id, name: title, thumbnail, description: short_description } = data;
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { handleReadChapter, transactionList } = useReadChapter();

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
                <div className="absolute left-[-30px] top-[-15px] z-[2] hidden h-[330px] scale-[0.73] opacity-0 shadow-2xl transition-all duration-300 group-hover:h-[330px] group-hover:scale-100 group-hover:opacity-100 xl:block">
                    <div className="min-h-[330px] w-[250px] bg-white dark:overflow-hidden dark:border dark:border-gray-800 dark:bg-gray-900">
                        <Link
                            to={`${APP_PATH.comics}/${id}`}
                            title={title}>
                            <p
                                className="h-[160px] w-[250px] bg-cover bg-[center_30%] bg-no-repeat"
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
                                        key={chapter._id}
                                        className="mt-2">
                                        <Link
                                            onClick={(event) => handleReadChapter(event, chapter)}
                                            to={`${APP_PATH.comics_chapters}/${chapter._id}`}
                                            title={chapter.shortName || chapter.name}
                                            className={`mt-[2px] inline-flex items-center text-sm text-primary`}>
                                            {chapter.shortName || chapter.name}
                                            {!isEnabledRead(chapter, transactionList) && (
                                                <svg
                                                    className="ml-1 inline-flex h-4 w-4"
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
                                        <span className="float-right inline-block text-sm text-gray-400">
                                            {moment(chapter.updateTime).format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                ))}

                            <p className="mt-2 line-clamp-2 text-sm text-gray-400">{short_description}</p>
                            <Link
                                onClick={(event) => handleReadChapter(event, data.chapters.slice(-1)[0])}
                                title={translate('read-now-title')}
                                to={data.chapters.length > 0 ? `${APP_PATH.comics_chapters}/${data.chapters.slice(-1)[0]._id}` : '#'}
                                className="mt-[10px] flex h-[30px] w-full items-center justify-center rounded bg-primary text-center text-sm font-semibold uppercase text-white">
                                {translate('read-now')}
                                {!isEnabledRead(data.chapters.slice(-1)[0], transactionList) && (
                                    <svg
                                        className="ml-2 h-5 w-5"
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
                    data.chapters.slice(0, 3).map((chapter) => (
                        <div
                            key={chapter._id}
                            className="mt-1">
                            <Link
                                onClick={(event) => handleReadChapter(event, chapter)}
                                to={`${APP_PATH.comics_chapters}/${chapter._id}`}
                                title={chapter.shortName || chapter.name}
                                className="float-left inline-flex items-center truncate whitespace-nowrap text-sm text-primary">
                                {chapter.shortName || chapter.name}
                                {!isEnabledRead(chapter, transactionList) && (
                                    <svg
                                        className="ml-1 inline-flex h-4 w-4"
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
                            <span className="float-right inline-block text-center text-sm text-gray-400">
                                {moment(chapter.updateTime).format('DD/MM/YYYY')}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ComicVertical;
