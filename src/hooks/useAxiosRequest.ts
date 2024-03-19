import { AxiosError, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

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
                if (errorCallback) {
                    errorCallback(err);
                } else {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data || 'Something went wrong!',
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
    };

    return { callRequest };
};

export default useAxiosRequest;
