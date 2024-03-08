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
        <div className="hover:bg-[#f6f6f6]">
            <div className="px-3">
                <div className={`flex gap-2 py-3 ${index !== 0 && ' border-t border-dashed border-[#D9D9D9] dark:border-gray-500'}`}>
                    <Link
                        title={item.title}
                        to={`${APP_PATH.comics}/${item.id}`}
                        className="flex-shrink-0">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
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
                            title={item.title}
                            to={`${APP_PATH.comics}/${item.id}`}
                            className="line-clamp-1 text-base font-semibold text-black">
                            {item.title}
                        </Link>
                        <Link
                            to={`${APP_PATH.chapters}/${item.id}/${item.latest_chapter[0].id}`}
                            title={item.latest_chapter[0].name}
                            className="text-grey-800 text-sx mt-1 line-clamp-1 font-light capitalize italic">
                            {item.latest_chapter[0].name}
                        </Link>
                        <p className={`mt-1 line-clamp-2 font-semibold text-blue-700`}>{item.authors}</p>
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
