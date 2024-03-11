import { Collection } from '@/types/indexedDB';

export const LANGUAGE = {
    vi: 'vi',
    en: 'en',
} as const;

export const MODE = {
    dark: 'dark',
    light: 'light',
} as const;

export const INDEXED_DB = {
    db: 'youth-book',
    collection: {
        history: {
            name: 'history',
            index: ['reading_at'],
        } as Collection,
    },
} as const;

export const COOKIE_KEYS = {
    token: 'token',
    refreshToken: 'refresh_token',
};

export const ROLES = {
    admin: 1,
};
