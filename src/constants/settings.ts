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
    collaborators: 2,
};

export const ROLE_LIST = [
    {
        value: 0,
        name: 'normal',
    },
    {
        value: 1,
        name: 'admin',
    },
    {
        value: 2,
        name: 'collaborators',
    },
];

export const COMIC_TYPES_LIST = [
    {
        value: 0,
        name: 'text',
    },
    {
        value: 1,
        name: 'picture',
    },
];

export const COMIC_STATUS_LIST = [
    {
        value: 0,
        name: 'updating',
    },
    {
        value: 1,
        name: 'completed',
    },
];

export const DEPOSIT_TYPE = [
    {
        value: 20 * 1000,
        name: '20.000',
        img: '/20k.jpg',
    },
    {
        value: 50 * 1000,
        name: '50.000',
        img: '/50k.jpg',
    },
    {
        value: 100 * 1000,
        name: '100.000',
        img: '/100k.jpg',
    },
];

export const FILTER_OPTIONS = [
    {
        name: 'all',
        value: 0,
    },
    {
        name: '3-months',
        value: 3 * 30,
    },
    {
        name: '1-month',
        value: 30,
    },
    {
        name: '1-week',
        value: 7,
    },
    {
        name: '1-day',
        value: 1,
    },
];

export const STATUS_OPTIONS = [
    { name: 'pending', value: 0 },
    { name: 'success', value: 1 },
    { name: 'cancel', value: -1 },
];
