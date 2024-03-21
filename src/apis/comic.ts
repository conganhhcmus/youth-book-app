import { ComicModel } from '@/types/comic';
import apiClients from '@/configs/apiClients';
import { COMICS_PATH } from '@/constants/path';
import { Comic, ComicBaseData, ComicData } from '@/types/comic';
import { paramOption } from '@/types/request';

const comicApis = {
    getAllComics(params?: paramOption) {
        const url = COMICS_PATH.comics;
        return apiClients.get<ComicData>(url, { params });
    },

    suggestSearch(params?: paramOption) {
        const url = COMICS_PATH.search;
        return apiClients.get<ComicData>(url, { params });
    },
    recommendComics(params?: paramOption) {
        const url = COMICS_PATH.recommend;
        return apiClients.get<ComicBaseData>(url, { params });
    },
    recentComics(params?: paramOption) {
        const url = COMICS_PATH.recent;
        return apiClients.get<ComicData>(url, { params });
    },

    topComics(params?: paramOption) {
        const url = COMICS_PATH.top;

        return apiClients.get<ComicData>(url, { params });
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

    updateThumbnail(id: string | undefined, data: FormData) {
        const url = COMICS_PATH.update_thumbnail + `/${id ?? '-1'}`;
        return apiClients.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
