import { Chapter, ChapterModel } from './../types/comic';
import apiClients from '@/configs/apiClients';
import { CHAPTER_PATH } from '@/constants/path';
import { ChapterData } from '@/types/comic';
import { paramOption } from '@/types/request';

const chapterApi = {
    getAllChapters(comicId: string | undefined, params?: paramOption) {
        if (!comicId) return;

        const url = CHAPTER_PATH.chapters;
        return apiClients.get<ChapterData>(url, { params: { ...params, comicId } });
    },

    getFullChapters(comicId: string | undefined) {
        if (!comicId) return;

        const url = CHAPTER_PATH.get_full;
        return apiClients.get<Chapter[]>(url, { params: { comicId } });
    },

    addChapter(data: ChapterModel) {
        const url = CHAPTER_PATH.add;
        return apiClients.post<Chapter>(url, { ...data });
    },

    deleteChapter(id: string) {
        const url = CHAPTER_PATH.chapters + `/${id}`;
        return apiClients.delete<Chapter>(url);
    },

    getChapterById(id: string | undefined, skipCount: boolean = false) {
        const url = CHAPTER_PATH.chapters + `/${id ?? '-1'}`;
        return apiClients.get<Chapter>(url, { params: { skipCount: skipCount } });
    },

    updateChapter(id: string | undefined, data: ChapterModel) {
        const url = CHAPTER_PATH.chapters + `/${id ?? '-1'}`;
        return apiClients.put<Chapter>(url, { ...data });
    },
};

export default chapterApi;
