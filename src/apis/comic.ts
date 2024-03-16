import { ComicModel } from '@/types/comic';
import { TopComicType } from '@/types/request';
import apiClients from '@/configs/apiClients';
import { COMICS_PATH } from '@/constants/path';
import { Comic, ComicBaseData, ComicData } from '@/types/comic';
import { paramOption } from '@/types/request';

const comicApis = {
    suggestSearch(params?: paramOption) {
        const url = COMICS_PATH.search;
        return apiClients.get<ComicBaseData>(url, { params });
    },
    recommendComics(params?: paramOption) {
        const url = COMICS_PATH.recommend;
        return apiClients.get<ComicBaseData>(url, { params });
    },
    recentComics(params?: paramOption) {
        const url = COMICS_PATH.recent;
        return apiClients.get<ComicData>(url, { params });
    },

    topComics(type: TopComicType, params?: paramOption) {
        const url = COMICS_PATH.top;
        const paramsRequest = {
            ...params,
            type: type,
        };

        return apiClients.get<ComicData>(url, { params: paramsRequest });
    },

    getComicInfo(id: string = '-1') {
        const url = COMICS_PATH.comics + `/${id}`;
        return apiClients.get<Comic>(url);
    },

    updateComic(id: string = '-1', comic: ComicModel) {
        const url = COMICS_PATH.comics + `/${id}`;
        return apiClients.put<Comic>(url, { ...comic });
    },

    addComic(comic: ComicModel) {
        const url = COMICS_PATH.add;
        return apiClients.post<Comic>(url, { ...comic });
    },

    deleteComic(id: string) {
        const url = COMICS_PATH.comics + `/${id ?? '-1'}`;
        return apiClients.delete<Comic>(url);
    },

    getComicByGenres(params?: paramOption) {
        const url = COMICS_PATH.genres;
        return apiClients.get<ComicData>(url, { params });
    },
};

export default comicApis;
