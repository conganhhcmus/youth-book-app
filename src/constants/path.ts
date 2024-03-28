export const COMICS_PATH = {
    comics: '/comics',
    top: '/comics/top',
    recent: '/comics/recent',
    recommend: '/comics/recommend',
    search: '/comics/search',
    add: '/comics/add',
    update_thumbnail: '/update-thumbnail',
    genres: '/comics/genres',
} as const;

export const GENRES_PATH = {
    genres: '/genres',
    add: '/genres/add',
    get_full: '/genres/get-full',
};

export const CHAPTER_PATH = {
    chapters: '/chapters',
    add: '/chapters/add',
    get_full: '/chapters/get-full',
};

export const AUTH_PATH = {
    register: '/register',
    login: '/login',
    reset_password: '/reset-password',
    reset_token: '/reset-token',
    fetch_info: '/fetch-info',
} as const;

export const DASHBOARD_PATH = {
    dashboard: 'dashboard',
} as const;

export const ANALYTICS_PATH = {
    analytics: 'analytics',
} as const;

export const USERS_PATH = {
    users: '/users',
    update_avatar: '/update-avatar',
    update_status: '/update-status',
} as const;

export const PAYMENT_PATH = {
    deposit: '/payment/deposit',
    buy: '/payment/buy',
    transaction: '/transaction',
    transaction_buy: '/transaction/buy',
};

export const APP_PATH = {
    // comics
    comics: '/comics',
    comics_chapters: '/comics/chapters',

    // account
    account: '/account',
    account_info: '/account/info',
    account_history: '/account/history',
    account_billing: '/account/billing',
    account_password: '/account/password',
    account_wishlist: '/account/wishlist',

    // app
    language: '/language',
    register: '/register',
    login: '/login',
    logout: '/logout',
    // pages
    home: '/',
    genres: '/genres',
    history: '/history',
    new: '/new',
    top: '/top',
    recommend: '/recommend',
    recent: '/recent',
    search: '/search',

    // management
    management: '/management',
    management_dashboard: '/management/dashboard',
    management_analytics: '/management/analytics',
    management_comics: '/management/comics',
    management_users: '/management/users',
    management_billing: '/management/billing',
    management_chapters: '/management/chapters',
    management_genres: '/management/genres',

    // payment
    payment_deposit: '/payment/deposit',
} as const;

export const TOP_COMICS = {
    all: 'all',
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
};
