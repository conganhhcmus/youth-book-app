export const COMICS_PATH = {
    comics: '/comics',
    top: '/comics/top',
    recent: '/comics/recent',
    recommend: '/comics/recommend',
    search: '/comics/search',
    genres: '/comics/genres',
    add: '/comics/add',
} as const;

export const AUTH_PATH = {
    register: '/register',
    login: '/login',
    reset_password: '/reset-password',
    reset_token: '/reset-token',
} as const;

export const USERS_PATH = {
    users: '/users',
} as const;

export const APP_PATH = {
    // comics
    comics: '/comics',
    comics_genres: 'comics/genres',
    comics_wishlist: 'comics/wishlist',
    comics_history: 'comics/history',
    comics_chapters: 'comics/chapters',
    comics_search: 'comics/search',
    comics_new: 'comics/new',
    comics_top: 'comics/top',
    comics_recommend: 'comics/recommend',
    comics_recent: 'comics/recent',

    // account
    account: '/account',
    account_info: '/account/info',
    account_history: '/account/history',
    account_billing: '/account/billing',
    account_password: '/account/password',

    // app
    language: '/language',
    home: '/',
    register: '/register',
    login: '/login',
    logout: '/logout',

    // management
    management: '/management',
    management_comics: '/management/comics',
    management_users: '/management/users',
    management_billing: '/management/billing',
} as const;

export const TOP_COMICS = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
};
