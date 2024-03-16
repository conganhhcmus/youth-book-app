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

    return {
        dontSupportAlert,
        updateSuccessAlert,
        deleteSuccessAlert,
        addSuccessAlert,
    };
};

export default useAlertMsg;
