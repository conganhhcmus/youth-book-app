import { TOP_COMICS } from '@/constants/path';

export type paramOption = {
    // type?: string;
    // status?: 'all' | 'completed' | 'updating' | string;
    page?: number;
    q?: string;
};

export type TopComicType = typeof TOP_COMICS.daily | typeof TOP_COMICS.weekly | typeof TOP_COMICS.monthly | string;
