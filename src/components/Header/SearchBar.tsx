import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { APP_PATH } from '@/constants/path';
import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { useQuery } from 'react-query';
import imgLoading from '@/assets/icons/loading.gif';
import comicApis from '@/apis/comic';
import { ComicHorizontal } from '../Comics';

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const navigate = useNavigate();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const { data: comicList, isLoading } = useQuery({
        queryKey: ['search-suggest', { q: searchText }],
        queryFn: () => comicApis.suggestSearch({ q: searchText }),
        enabled: searchText !== '',
        staleTime: 3 * 60 * 1000,
    });

    const maxLength = 10;
    const data = comicList?.data?.data.slice(-Math.min(maxLength, comicList?.data?.data.length));

    const viewDetailComic = (id: string) => {
        navigate(`${APP_PATH.comics}/${id}`);
        setSearchText('');
    };

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchText !== '') {
            navigate({
                pathname: APP_PATH.search,
                search: createSearchParams({
                    q: searchText.trim(),
                    page: '1',
                }).toString(),
            });
        }
        setSearchText('');
    };

    return (
        <div className="container h-full w-full">
            <div className="flex h-full items-center justify-center">
                <form
                    className="relative z-10 flex w-full items-center sm:w-auto"
                    onSubmit={searchHandler}>
                    <div className="hidden flex-shrink-0 bg-white py-4 pl-[18px] pr-[14px] sm:block">
                        <p className="h-[18px] w-[18px] bg-search-icon bg-cover bg-no-repeat" />
                    </div>
                    <input
                        onFocus={() => setIsOpenSearch(true)}
                        onBlur={() => setIsOpenSearch(false)}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        type="text"
                        placeholder={translate('SearchTextPlaceholder')}
                        className="h-[36px] w-full pl-4 pr-4 leading-[50px] outline-none sm:h-[50px] sm:w-[320px] sm:pl-0 lg:w-[420px]"
                    />
                    <button
                        title={translate('search')}
                        className="flex h-[36px] w-[50px] items-center justify-center bg-gray-300 capitalize text-white sm:h-[50px] sm:w-[100px] sm:bg-gradient lg:w-[140px]">
                        <span className="hidden capitalize sm:inline-block">{translate('search')}</span>
                        <p className="inline-block h-[18px] w-[18px] bg-search-icon bg-cover bg-no-repeat sm:hidden" />
                    </button>
                    {isOpenSearch && (
                        <div
                            className="absolute left-0 top-[37px] z-40 max-h-[280px] w-full overflow-y-auto border border-[#EDEDED] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.10)] md:top-[50px] md:w-[470px]"
                            style={{
                                filter: 'blur(0)',
                            }}>
                            {data &&
                                data.map((item, i) => (
                                    <div
                                        key={item._id}
                                        onMouseDown={() => viewDetailComic(item._id)}
                                        className="cursor-pointer">
                                        <ComicHorizontal
                                            index={i}
                                            item={item}
                                        />
                                    </div>
                                ))}
                            {isLoading && (
                                <div className="flex h-[100px] w-full items-center justify-center gap-2">
                                    <img
                                        src={imgLoading}
                                        alt="loading icon"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            {Array.isArray(data) && !data.length && (
                                <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                            )}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
