import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Chapter } from '@/types/comic';
import { APP_PATH } from '@/constants/path';
import useReadChapter from '@/hooks/useReadChapter';
import { isEnabledRead } from '@/utils/comic';

interface Props {
    data: Chapter[];
}

const ListChapter = ({ data }: Props) => {
    const maxRange = 50;
    const minRange = 1;
    const newestChapter = useMemo(() => data.length, [data]);
    const numberButton = useMemo(() => Math.ceil(newestChapter / maxRange), [newestChapter]);
    const [dataChapter, setDataChapter] = useState<Chapter[]>([]);
    const [range, setRange] = useState([minRange, maxRange]);
    const [active, setActive] = useState<number>(0);
    const [openList, setOpenList] = useState<boolean>(false);
    const { handleReadChapter, transactionList } = useReadChapter();

    useEffect(() => {
        setDataChapter(
            data.filter(
                (_, index) =>
                    index + 1 <= (!isNaN(range[1]) && range[1] < newestChapter ? range[1] : newestChapter) &&
                    index + 1 >= (!isNaN(range[0]) ? range[0] : minRange),
            ),
        );
    }, [data, newestChapter, range]);

    const handleRenderGroupChapter = (i: number) => {
        return `${i * maxRange + 1} - ${(i + 1) * maxRange >= newestChapter ? newestChapter : (i + 1) * maxRange}`;
    };

    const handleChangeGroupChapter = (i: number) => {
        setActive(i);
        setRange([i * maxRange + 1, (i + 1) * maxRange >= newestChapter ? newestChapter : (i + 1) * maxRange]);
    };

    return (
        <div onClick={() => setOpenList(false)}>
            <ul className={`my-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-800 ${numberButton === 1 ? 'hidden' : ''}`}>
                <li>
                    <button
                        className="relative flex items-center gap-2 rounded-md border px-3 py-1 text-base font-normal leading-5 text-black dark:border dark:border-gray-500 dark:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenList((prev) => !prev);
                        }}>
                        <div className="flex items-center gap-2">
                            <span className="line-clamp-1 max-w-[140px]">{`${range[0]} - ${data.length > maxRange ? range[1] : newestChapter}`}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                        <div
                            className={`absolute left-0 top-8 z-10 w-32 origin-top rounded border bg-white text-left shadow-lg duration-200 dark:border dark:border-gray-500 dark:bg-gray-900 ${
                                openList ? 'pointer-events-auto scale-100' : 'pointer-events-none scale-[0.001]'
                            }`}>
                            <ul className={`h-max max-h-72 overflow-auto px-1 pl-3 text-sm font-normal`}>
                                {Array(numberButton)
                                    .fill(0)
                                    .map((_, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleChangeGroupChapter(i)}
                                            className={classNames('flex w-full justify-start truncate py-2 text-base font-normal leading-5', {
                                                'hover:text-primary': i !== active,
                                                'text-primary': i === active,
                                                'border-t border-dashed dark:border-gray-600': i !== 0,
                                            })}>
                                            {handleRenderGroupChapter(i)}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </button>
                </li>
            </ul>
            <div className="my-5 grid grid-cols-2 flex-wrap gap-5 text-sm font-semibold text-gray-800 dark:text-gray-200 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {dataChapter.map((item) => (
                    // <div className="inline-flex items-center">
                    <Link
                        onClick={(event) => handleReadChapter(event, item)}
                        to={`${APP_PATH.comics_chapters}/${item._id}`}
                        title={item.name}
                        key={item._id}
                        className="h-[38px] truncate rounded-sm bg-[#f6f6f6] px-4 pt-2 text-base font-normal hover:bg-primary/10 hover:text-primary dark:bg-gray-800 dark:hover:bg-primary/20">
                        {!isEnabledRead(item, transactionList) && (
                            <svg
                                className="mx-1 mt-[-3px] inline-block h-5 w-5 items-center"
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
                        {item.name}
                    </Link>
                    // </div>
                ))}
            </div>
        </div>
    );
};

export default ListChapter;
