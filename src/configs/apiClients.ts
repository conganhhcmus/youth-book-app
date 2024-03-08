import axios, { AxiosRequestConfig } from 'axios';

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
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

apiClients.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default apiClients;
