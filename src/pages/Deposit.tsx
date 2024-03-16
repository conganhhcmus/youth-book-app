import paymentApis from '@/apis/payment';
import { APP_PATH } from '@/constants/path';
import { DEPOSIT_TYPE } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Deposit: React.FC = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const [depositType, setDepositType] = useState(DEPOSIT_TYPE[0]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();
    const { callRequest } = useAxiosRequest();

    const onCompleted = () => {
        setIsSubmitted(true);
        callRequest(
            paymentApis.deposit(depositType.value),
            (res) => {
                console.log(res.data);
                navigate(APP_PATH.account_billing);
            },
            (err) => {
                alert(err.response?.data);
                window.location.reload();
            },
        );
    };

    const onCancel = () => {
        navigate(APP_PATH.home);
    };

    return (
        <div className="container flex min-h-full items-center justify-center px-4 pt-4 xl:px-0">
            <Helmet>
                <title>{translate('deposit-account')}</title>
                <meta
                    name="description"
                    content={translate('description_0')}
                />
            </Helmet>
            <div className="w-full rounded-lg border bg-white shadow dark:border sm:max-w-xl md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">{translate('deposit-account')}</h1>
                    <div className="flex justify-center">
                        {DEPOSIT_TYPE.map((type) => (
                            <>
                                <div
                                    key={type.value}
                                    className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id={type.name}
                                        value={type.value}
                                        checked={type.value == depositType.value}
                                        onChange={() => setDepositType(type)}
                                    />
                                    <label
                                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor={type.name}>
                                        {type.name}
                                    </label>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="flex w-full justify-center">
                        <img
                            className="h-[500px]"
                            src={depositType?.img}
                        />
                    </div>
                    <div className="flex w-full justify-center">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 ">
                            {translate('cancel')}
                        </button>
                        <button
                            type="button"
                            disabled={isSubmitted}
                            onClick={onCompleted}
                            className="mb-2 me-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-2 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            {translate('completed')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
