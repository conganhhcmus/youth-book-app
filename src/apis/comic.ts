import { TopComicType } from './../types/request';
import apiClients from '@/configs/apiClients';
import { COMICS_PATH } from '@/constants/path';
import { ComicBaseData, ComicData } from '@/types/comic';
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
};

export default comicApis;
