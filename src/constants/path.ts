export const COMICS_PATH = {
    // suggestSearch: '/suggest-search',
    comics: '/comics',
    // genres: '/genres',
    // new: '/new-comics',
    // top: '/top',
    // type: ':type',
    // name: ':id',
    // idChapter: ':idChapter',
    top: '/comics/top',
    // chapter: '/chapter',
    // follow: '/follow',
    // comment: '/comment',
    // comments: '/comments',
    recent: '/comics/recent-update',
    recommend: '/comics/recommend',
    // popular: '/trending-comics',
    // completed: '/completed-comics',
    // boy: '/boy-comics',
    // girl: '/girl-comics',
    // chapters: '/chapters',
    search: '/comics/search',
    // download: '/download',
    // history: '/history',
} as const;

export const USERS_PATH = {} as const;

export const APP_PATH = {
    language: '/language',
    home: '/',
    history: '/history',
    register: '/register',
    login: '/login',
    comics: '/comics',
    chapters: '/chapters',
    search: '/search',
    genres: '/genres',
    new_comics: '/new-comics',
    top_comics: '/top-comics',
    recommend: '/recommend',
    recent: '/recent',
} as const;

export const TOP_COMICS = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
};
