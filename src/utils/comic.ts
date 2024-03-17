import { Chapter, Comic, ComicModel } from '@/types/comic';
import { Transaction } from '@/types/payment';

export const getComicResponse = (data: Comic): ComicModel => {
    return { name: data.name, description: data.description } as ComicModel;
};

export const isEnabledRead = (chapter: Chapter, transaction: Transaction[] = []) => {
    if (!chapter || chapter.price <= 0 || transaction.map((trans) => trans.sourceId).includes(chapter._id)) {
        return true;
    }

    return false;
};
