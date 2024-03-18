import userApis from '@/apis/user';
import { useAppSelector } from '@/hooks/reduxHook';
import useAlertMsg from '@/hooks/useAlertMsg';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { selectAccessToken } from '@/redux/slices/token';
import { User } from '@/types/user';
import { decodeJWTToken } from '@/utils/token';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import imgLoading from '@/assets/icons/loading.gif';

const AccountInfo: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const refUserName = useRef<HTMLInputElement>(null);
    const refFullName = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { callRequest } = useAxiosRequest();
    const { updateSuccessAlert, confirmUpdateAlert } = useAlertMsg();

    const token = useAppSelector((state) => selectAccessToken(state.token));
    const userInfoPayload = decodeJWTToken(token);

    const { data: userInfoResult, isLoading } = useQuery({
        queryKey: ['getUserInfo', userInfoPayload?._id],
        queryFn: () => userApis.getUserInfo(userInfoPayload?._id),
        staleTime: 3 * 60 * 1000,
        enabled: !!userInfoPayload,
    });

    const userInfo = userInfoResult?.data;

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
            updateSuccessAlert(true);
        });
    };

    const handleReset = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        refUserName.current && (refUserName.current.value = '');
        refFullName.current && (refFullName.current.value = '');
        refEmail.current && (refEmail.current.value = '');
    };

    const handleUpdateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const uploadData = new FormData();
        uploadData.append('file', e.target.files[0], 'file');

        confirmUpdateAlert(() =>
            callRequest(userApis.updateAvatar(userInfoPayload?._id, uploadData), (res) => {
                console.log(res.data);
                updateSuccessAlert(true);
            }),
        );
    };

    if (isLoading)
        return (
            <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                <img
                    src={imgLoading}
                    alt="loading icon"
                    loading="lazy"
                />
                {translate('loading')}
            </div>
        );

    return (
        <div className="flex w-full justify-center rounded-lg border bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
            <div className="mx-4 mt-24 flex flex-col items-center gap-4">
                {userInfo?.avatarImg ? (
                    <img
                        className="h-[200px] w-[200px] rounded"
                        src={userInfo.avatarImg}
                    />
                ) : (
                    <svg
                        className="h-[200px] w-[200px] rounded"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M508.3136 498.2784A221.4912 221.4912 0 1 0 286.72 276.48a221.7984 221.7984 0 0 0 221.5936 221.7984z m0-393.8304A172.3392 172.3392 0 1 1 336.0768 276.48a172.4416 172.4416 0 0 1 172.2368-172.032zM680.5504 536.7808a44.7488 44.7488 0 0 0-37.5808 3.2768 276.48 276.48 0 0 1-266.752 1.4336 44.6464 44.6464 0 0 0-37.6832-2.8672A481.28 481.28 0 0 0 30.0032 942.08a24.576 24.576 0 0 0 22.016 26.9312h2.4576a24.576 24.576 0 0 0 24.4736-22.1184 432.5376 432.5376 0 0 1 275.0464-361.472A326.5536 326.5536 0 0 0 665.6 583.68a437.4528 437.4528 0 0 1 279.4496 362.9056 24.576 24.576 0 1 0 48.9472-4.5056 487.0144 487.0144 0 0 0-313.4464-405.2992z"
                            fill=""
                        />
                    </svg>
                )}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <label
                        htmlFor="files"
                        className="mr-4 rounded-full border-0 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100">
                        Update Avatar
                    </label>
                    <input
                        id="files"
                        onChange={(e) => handleUpdateAvatar(e)}
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
