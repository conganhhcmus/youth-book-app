import { AUTH_PATH } from '@/constants/path';
import { COOKIE_KEYS } from '@/constants/settings';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const apiConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    responseType: 'json',
};

const apiClients = axios.create(apiConfig);

apiClients.interceptors.request.use(
    function (config) {
        config.headers['refresh_token'] = getCookie(COOKIE_KEYS.refreshToken);
        config.headers['token'] = getCookie(COOKIE_KEYS.token);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

const refreshTokenAndResend = async (config: InternalAxiosRequestConfig) => {
    const url = AUTH_PATH.reset_token;
    const newToken = await apiClients.get<string>(url);
    setCookie(COOKIE_KEYS.token, newToken.data);
    config.headers['token'] = newToken.data;

    return apiClients.request(config);
};

apiClients.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error: AxiosError) {
        const status = error.response ? error.response.status : null;
        const originalRequest = error.config;
        if (status === 401 && originalRequest && originalRequest?.url !== AUTH_PATH.reset_token) {
            return refreshTokenAndResend(originalRequest);
        } else if (status === 401 && originalRequest && originalRequest?.url === AUTH_PATH.reset_token) {
            removeCookie(COOKIE_KEYS.token);
            removeCookie(COOKIE_KEYS.refreshToken);
        }
        return Promise.reject(error);
    },
);

export default apiClients;