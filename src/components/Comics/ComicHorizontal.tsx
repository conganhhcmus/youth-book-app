import { Link } from 'react-router-dom';
import { ComicBase } from '@/types/comic';
import { APP_PATH } from '@/constants/path';
import errorIcon from '@/assets/icons/error.webp';

interface SearchItemProps {
    index: number;
    item: ComicBase;
    isSearchItem?: boolean;
}

const ComicHorizontal = ({ index, item, isSearchItem = true }: SearchItemProps) => {
    return (
        <div className={`hover:bg-[#f7f7f7] ${!isSearchItem && 'dark:hover:bg-gray-500'}`}>
            <div className="px-3">
                <div className={`flex gap-2 py-3 ${index !== 0 && ' border-t border-dashed border-[#D9D9D9] dark:border-gray-500'}`}>
                    <Link
                        title={item.name}
                        to={`${APP_PATH.comics}/${item._id}`}
                        className="flex-shrink-0">
                        <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="h-[90px] w-[70px] object-cover"
                            loading="lazy"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = errorIcon;
                            }}
                        />
                    </Link>
                    <div className={`flex flex-col text-sm ${!isSearchItem && 'justify-between'}`}>
                        <Link
                            title={item.name}
                            to={`${APP_PATH.comics}/${item._id}`}
                            className={`line-clamp-1 text-base font-semibold text-black ${!isSearchItem && 'dark:text-white'}`}>
                            {item.name}
                        </Link>
                        {item.chapters.length > 0 && (
                            <Link
                                to={`${APP_PATH.comics_chapters}/${item.chapters[0]._id}`}
                                title={item.chapters[0].name}
                                className={`text-grey-800 text-sx mt-1 line-clamp-1 font-light capitalize italic ${!isSearchItem && 'dark:text-white'}`}>
                                {item.chapters[0].name}
                            </Link>
                        )}
                        <p className={`mt-1 line-clamp-2 font-semibold text-blue-700`}>{item.author}</p>
                        <p className={`mt-1 line-clamp-2 italic text-black dark:text-white ${!isSearchItem && ' text-xs'}`}>
                            {Array.isArray(item.genres) && item.genres.map((genre) => genre.name).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComicHorizontal;
