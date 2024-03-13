import { APP_PATH } from '@/constants/path';
import { Comic } from '@/types/comic';
import { Link } from 'react-router-dom';

import imgError from '@/assets/icons/error.webp';
import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';

interface TopPreviewProps {
    data: Comic[];
    top?: number;
}

const TopPreview = ({ data, top = 7 }: TopPreviewProps) => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    return (
        <ul className="mt-5 flex flex-col gap-[5px]">
            {data.slice(0, top).map((item, index) => (
                <li
                    key={item._id}
                    className="flex items-center gap-3 border-b border-dashed border-[#ededed] dark:border-gray-600">
                    <Link
                        to={`${APP_PATH.comics}/${item._id}`}
                        title={item.title}
                        className="flex-shrink-0 overflow-hidden">
                        <img
                            loading="lazy"
                            src={item.thumbnail}
                            alt={item.title}
                            title={item.title}
                            className="h-[50px] w-20 object-cover object-center"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = imgError;
                            }}
                        />
                    </Link>
                    <div className="flex items-start gap-3">
                        <span
                            className={`-mt-[2px] h-[22px] w-[22px] flex-shrink-0 rounded-full text-center 
                                        ${index === 0 && ' bg-[#feda00] text-white'} 
                                        ${index === 1 && ' bg-[#feaf00] text-white'} 
                                        ${index === 2 && ' bg-[#fe8f00] text-white'} 
                                        ${index > 2 && ' bg-[#eeecec] text-black/70 dark:bg-gray-600 dark:text-white/70'}`}>
                            {index + 1}
                        </span>
                        <div className="-mt-[2px]">
                            <Link
                                title={item.title}
                                to={`${APP_PATH.comics}/${item._id}`}
                                className="line-clamp-1 text-base font-semibold leading-4 text-black hover:text-primary dark:text-white dark:hover:text-primary">
                                {item.title}
                            </Link>
                            <p className="ml-[1px] line-clamp-1 text-sm leading-5 text-gray-400">
                                {item.total_views} {translate('views')}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TopPreview;
