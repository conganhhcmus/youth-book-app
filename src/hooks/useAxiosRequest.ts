import { AxiosError, AxiosResponse } from 'axios';

type CallbackFunction = (res: AxiosResponse) => void;
type ErrorCallbackFunction = (err: AxiosError) => void;

const useAxiosRequest = () => {
    const callRequest = (axios: Promise<AxiosResponse>, callback: CallbackFunction, errorCallback?: ErrorCallbackFunction) => {
        axios
            .then((response) => {
                callback && callback(response);
                return response.data;
            })
            .catch((err) => {
                errorCallback && errorCallback(err);
            });
    };

    return { callRequest };
};

export default useAxiosRequest;
