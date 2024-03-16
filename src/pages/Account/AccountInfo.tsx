import userApis from '@/apis/user';
import { COOKIE_KEYS } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { User } from '@/types/user';
import { getCookie } from '@/utils/cookies';
import { decodeJWTToken } from '@/utils/token';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const AccountInfo: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const refUserName = useRef<HTMLInputElement>(null);
    const refFullName = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { callRequest } = useAxiosRequest();

    const token = getCookie(COOKIE_KEYS.token);
    const userInfoPayload = decodeJWTToken(token);

    const { data: userInfoRes } = useQuery({
        queryKey: ['getUserInfo', userInfoPayload?._id],
        queryFn: () => userApis.getUserInfo(userInfoPayload?._id),
        staleTime: 3 * 60 * 1000,
        enabled: !!userInfoPayload,
    });

    const userInfo = userInfoRes?.data;

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        if (!refFullName.current?.value && !refEmail.current?.value) {
            alert(translate('NoChange'));
            setIsSubmitted(false);
            return;
        }

        const data = {
            ...userInfo,
            email: refEmail.current?.value ? refEmail.current?.value : userInfo?.email,
            fullName: refFullName.current?.value ? refFullName.current?.value : userInfo?.fullName,
        } as User;

        callRequest(userApis.updateUserInfo(userInfoPayload?._id, data), (res) => {
            console.log(res.data);
            Swal.fire({
                title: 'Updated!',
                text: 'Your data has been updated.',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
        });
    };

    const handleReset = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        refUserName.current && (refUserName.current.value = '');
        refFullName.current && (refFullName.current.value = '');
        refEmail.current && (refEmail.current.value = '');
    };

    return (
        <div className="flex w-full justify-center rounded-lg border bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
            <div className="mx-4 mt-24 flex flex-col items-center gap-4">
                <img
                    className="h-[200px] w-[200px] rounded"
                    src="https://randomuser.me/api/portraits/women/91.jpg"
                    alt="Default avatar"
                />
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <label
                        htmlFor="files"
                        className="mr-4 rounded-full border-0 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100">
                        Update Avatar
                    </label>
                    <input
                        id="files"
                        hidden={true}
                        accept=".jpg,.jpeg,.png"
                        type="file"
                    />
                </div>
            </div>
            <div className="w-full space-y-4 p-6 sm:max-w-xl sm:p-8 md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    {translate('account-info')}
                </h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="space-y-4 md:space-y-6"
                    action="#">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('your-username')}
                        </label>
                        <input
                            ref={refUserName}
                            type="username"
                            name="username"
                            id="username"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            placeholder={userInfo?.username}
                            required={true}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('fullName')}
                        </label>
                        <input
                            ref={refFullName}
                            type="fullName"
                            name="fullName"
                            id="fullName"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            placeholder={userInfo?.fullName}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {translate('your-email')}
                        </label>
                        <input
                            ref={refEmail}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            placeholder={userInfo?.email}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitted}
                        className="float-right ml-4 rounded-lg bg-gradient px-5 py-2.5 text-center text-sm font-medium capitalize text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:bg-gradient dark:hover:bg-gradient dark:focus:ring-primary">
                        {translate('save')}
                    </button>
                    <button
                        onClick={(e) => handleReset(e)}
                        disabled={isSubmitted}
                        className="float-right rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium capitalize text-white hover:bg-gray-400">
                        {translate('reset')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountInfo;
