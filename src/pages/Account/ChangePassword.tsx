import authApis from '@/apis/auth';
import { useAppSelector } from '@/hooks/reduxHook';
import useAlertMsg from '@/hooks/useAlertMsg';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { changeAccessToken, changeRefreshToken, selectAccessToken } from '@/redux/slices/token';
import { User } from '@/types/user';
import { decodeJWTToken } from '@/utils/token';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const ChangePassword: React.FC = () => {
    const refPassword = useRef<HTMLInputElement>(null);
    const refNewPassword = useRef<HTMLInputElement>(null);
    const refConfirmPassword = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { callRequest } = useAxiosRequest();
    const { updateSuccessAlert, showInfoMsgAlert } = useAlertMsg();
    const dispatch = useDispatch();

    const token = useAppSelector((state) => selectAccessToken(state.token));
    const userInfoPayload = decodeJWTToken(token);

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        if (refConfirmPassword.current?.value !== refNewPassword.current?.value) {
            showInfoMsgAlert(translate('confirm-password-not-match'), '', false);
            setIsSubmitted(false);
            return;
        }

        if (refNewPassword.current?.value === refPassword.current?.value) {
            showInfoMsgAlert(translate('no-change'), '', false);

            setIsSubmitted(false);
            return;
        }

        const data = {
            ...userInfoPayload,
            password: refPassword?.current?.value,
        } as User;

        const newPassword = refConfirmPassword.current?.value ?? '';

        callRequest(authApis.changePassword(userInfoPayload?._id, data, newPassword), (res) => {
            dispatch(changeAccessToken(res.data.token));
            dispatch(changeRefreshToken(res.data.refreshToken));
            updateSuccessAlert(true);
        });
    };

    return (
        <div className="flex w-full justify-center rounded-lg border bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
            <div className="w-full space-y-4 p-6 sm:max-w-xl sm:p-8 md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    {translate('change-password')}
                </h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="mt-4 space-y-4 md:space-y-6"
                    action="#">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('current-password')}
                        </label>
                        <input
                            ref={refPassword}
                            type="password"
                            name="currentPassword"
                            minLength={4}
                            id="currentPassword"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            required={true}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('new-password')}
                        </label>
                        <input
                            ref={refNewPassword}
                            type="password"
                            name="newPassword"
                            minLength={4}
                            id="newPassword"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            required={true}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('confirm-password')}
                        </label>
                        <input
                            ref={refConfirmPassword}
                            type="password"
                            name="confirm-password"
                            minLength={4}
                            id="confirm-password"
                            placeholder="••••••••"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            required={true}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitted}
                        className="rounded-lg bg-gradient px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:bg-gradient dark:hover:bg-gradient dark:focus:ring-primary">
                        {translate('change-password')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
