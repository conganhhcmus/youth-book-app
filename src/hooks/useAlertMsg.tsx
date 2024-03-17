import { selectLanguage } from '@/redux/slices/settings';
import Swal from 'sweetalert2';
import { useAppSelector } from './reduxHook';
import useTranslation from './useTranslation';

const useAlertMsg = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);

    const dontSupportAlert = (reload: boolean = false) => {
        Swal.fire({
            title: translate('dont-support'),
            text: translate('dont-support-text'),
            icon: 'info',
        }).then(() => {
            reload && window.location.reload();
        });
    };

    const updateSuccessAlert = (reload: boolean = false) => {
        Swal.fire({
            title: translate('updated'),
            text: translate('updated-text'),
            icon: 'success',
        }).then(() => {
            reload && window.location.reload();
        });
    };

    const deleteSuccessAlert = (reload: boolean = false) => {
        Swal.fire({
            title: translate('deleted'),
            text: translate('deleted-text'),
            icon: 'success',
        }).then(() => {
            reload && window.location.reload();
        });
    };

    const addSuccessAlert = (reload: boolean = false) => {
        Swal.fire({
            title: translate('added'),
            text: translate('added-text'),
            icon: 'success',
        }).then(() => {
            reload && window.location.reload();
        });
    };

    const confirmWarningAlert = (callback: () => void) => {
        Swal.fire({
            title: translate('are-you-sure'),
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: translate('cancel'),
            confirmButtonText: translate('yes-delete'),
        }).then((result) => {
            if (result.isConfirmed) {
                callback && callback();
            }
        });
    };

    const confirmUpdateAlert = (callback: () => void) => {
        Swal.fire({
            title: translate('are-you-sure'),
            text: translate('dont-revert-text'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: translate('cancel'),
            confirmButtonText: translate('yes-update'),
        }).then((result) => {
            if (result.isConfirmed) {
                callback && callback();
            }
        });
    };

    return {
        dontSupportAlert,
        updateSuccessAlert,
        deleteSuccessAlert,
        addSuccessAlert,
        confirmWarningAlert,
        confirmUpdateAlert,
    };
};

export default useAlertMsg;
