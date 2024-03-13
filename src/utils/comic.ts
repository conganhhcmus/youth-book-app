import { Comic, ComicModel } from '@/types/comic';

export const getComicResponse = (data: Comic): ComicModel => {
    return { name: data.title, description: data.description } as ComicModel;
};
