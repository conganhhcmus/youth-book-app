export const COMICS_PATH = {
    comics: '/comics',
    top: '/comics/top',
    recent: '/comics/recent',
    recommend: '/comics/recommend',
    search: '/comics/search',
    add: '/comics/add',
} as const;

export const GENRES_PATH = {
    genres: '/genres',
    add: '/genres/add',
};

export const CHAPTER_PATH = {
    chapters: '/chapters',
    add: '/chapters/add',
};

export const AUTH_PATH = {
    register: '/register',
    login: '/login',
    reset_password: '/reset-password',
    reset_token: '/reset-token',
    fetch_info: '/fetch-info',
} as const;

export const USERS_PATH = {
    users: '/users',
} as const;

export const PAYMENT_PATH = {
    deposit: '/payment/deposit',
    transaction: '/transaction',
};

export const APP_PATH = {
    // comics
    comics: '/comics',
    comics_genres: '/comics/genres',
    comics_history: '/comics/history',
    comics_chapters: '/comics/chapters',
    comics_search: '/comics/search',
    comics_new: '/comics/new',
    comics_top: '/comics/top',
    comics_recommend: '/comics/recommend',
    comics_recent: '/comics/recent',

    // account
    account: '/account',
    account_info: '/account/info',
    account_history: '/account/history',
    account_billing: '/account/billing',
    account_password: '/account/password',
    account_wishlist: '/account/wishlist',

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
    management_chapters: '/management/chapters',
    management_genres: '/management/genres',

    // payment
    payment_deposit: '/payment/deposit',
} as const;

export const TOP_COMICS = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
};
