import axios, { AxiosRequestConfig } from 'axios';

const localConfig: AxiosRequestConfig = {
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    responseType: 'json',
};

const localClients = axios.create(localConfig);

localClients.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

localClients.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default localClients;
