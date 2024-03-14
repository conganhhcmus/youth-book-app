import { Genres, GenresModel } from './../types/comic';
import apiClients from '@/configs/apiClients';
import { GENRES_PATH } from '@/constants/path';
import { GenresData } from '@/types/comic';
import { paramOption } from '@/types/request';

const genresApi = {
    getAllGenres(params?: paramOption) {
        const url = GENRES_PATH.genres;
        return apiClients.get<GenresData>(url, { params });
    },

    addGenres(data: GenresModel) {
        const url = GENRES_PATH.add;
        return apiClients.post<GenresData>(url, { ...data });
    },

    deleteGenres(id: string) {
        const url = GENRES_PATH.genres + `/${id}`;
        return apiClients.delete<GenresData>(url);
    },

    getGenresById(id: string) {
        const url = GENRES_PATH.genres + `/${id}`;
        return apiClients.get<Genres>(url);
    },

    updateGenres(id: string | undefined, data: GenresModel) {
        const url = GENRES_PATH.genres + `/${id ?? '-1'}`;
        return apiClients.put<Genres>(url, { ...data });
    },
};

export default genresApi;
