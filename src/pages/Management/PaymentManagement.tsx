import paymentApis from '@/apis/payment';
import { Pagination } from '@/components/Pagination';
import { FILTER_OPTIONS, STATUS_OPTIONS } from '@/constants/settings';
import { useAppSelector } from '@/hooks/reduxHook';
import useAlertMsg from '@/hooks/useAlertMsg';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { formatCurrency } from '@/utils/format';
import { getTransactionStatusName, getTransactionTypeName } from '@/utils/transaction';
import classNames from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import imgLoading from '@/assets/icons/loading.gif';

const PaymentManagement: React.FC = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();
    const { updateSuccessAlert } = useAlertMsg();

    const [filterOptions, setFilterOptions] = useState<number>(0);
    const [statusOptions, setStatusOptions] = useState<number[]>(STATUS_OPTIONS.map((x) => x.value));
    const [searchText, setSearchText] = useState<string>('');

    const { data: transactionDataResult, isLoading } = useQuery({
        queryKey: ['getAllTransaction', { ...queryParams, q: searchText }, filterOptions, statusOptions],
        queryFn: () => paymentApis.getAllTransaction(filterOptions, statusOptions, { ...queryParams, q: searchText }),
        staleTime: 60 * 1000,
        // enabled:
    });

    const resultData = transactionDataResult?.data;
    const transactionList = resultData?.data;

    const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
        let temp = [...statusOptions, value];

        if (!event.currentTarget.checked) {
            temp = temp.filter((v) => v !== value);
        }

        const uniqueValue = temp.filter(function (item, pos) {
            return temp.indexOf(item) == pos;
        });

        setStatusOptions(uniqueValue);
    };

    const onActionHandle = (id: string, status: number) => {
        callRequest(paymentApis.updateTransaction(id, status), (res) => {
            console.log(res.data);
            updateSuccessAlert(true);
        });
    };

    return (
        <div className="relative h-full w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
                <div className="flex flex-col">
                    <div
                        key="options"
                        className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700">
                        {FILTER_OPTIONS.map((option) => (
                            <div
                                key={`option - ${option.value}`}
                                className="mb-[0.125rem] mr-8 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={option.name}
                                    value={option.value}
                                    checked={option.value == filterOptions}
                                    onChange={() => setFilterOptions(option.value)}
                                />
                                <label
                                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                    htmlFor={option.name}>
                                    {translate(option.name)}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700">
                        {STATUS_OPTIONS.map((option) => (
                            <div
                                className="inline-flex items-center"
                                key={option.name}>
                                <input
                                    onChange={(e) => onStatusChange(e, option.value)}
                                    id={option.name}
                                    type="checkbox"
                                    checked={statusOptions.includes(option.value)}
                                    className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary"
                                />
                                <label
                                    htmlFor={option.name}
                                    className="w-30 mb-2 ml-2 mr-6 mt-2 text-sm font-medium capitalize text-gray-900 dark:text-white">
                                    {translate(option.name)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                        id="table-search-users"
                        className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder={translate('search-for-users')}
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="flex h-[300px] w-full items-center justify-center gap-2 text-black dark:text-white">
                    <img
                        src={imgLoading}
                        alt="loading icon"
                        loading="lazy"
                    />
                    {translate('loading')}
                </div>
            ) : (
                <>
                    <div className="relative h-96 w-full overflow-y-auto sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                            <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('username')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('type')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('amount')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('status')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('update-at')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('update-by')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3">
                                        {translate('action')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionList &&
                                    transactionList.map((transaction) => (
                                        <tr
                                            key={transaction._id}
                                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{transaction.users[0].username}</td>
                                            <td className="px-6 py-4">{translate(getTransactionTypeName(transaction.type))}</td>
                                            <td
                                                className={classNames('px-6 py-4 font-bold ', {
                                                    'text-primary': transaction.amount >= 0,
                                                    'text-red-500': transaction.amount < 0,
                                                })}>
                                                {formatCurrency(transaction.amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p
                                                    className={classNames('capitalize', {
                                                        'text-gray-700': transaction.status == 0,
                                                        'text-red-700': transaction.status == -1,
                                                        'text-primary': transaction.status == 1,
                                                    })}>
                                                    {translate(getTransactionStatusName(transaction.status))}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">{moment(transaction.updateTime).format('hh:mm:ss DD/MM/YYYY')}</td>
                                            <td className="px-6 py-4">
                                                {transaction.updateUsers.length == 0 ? '-' : transaction.updateUsers[0].username}
                                            </td>
                                            <td className={`px-6 py-4 ${transaction.status !== 0 ? 'hidden' : ''}`}>
                                                <button
                                                    onClick={() => onActionHandle(transaction._id, 1)}
                                                    className="ml-2 font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                                    {translate('accept')}
                                                </button>
                                                <button
                                                    onClick={() => onActionHandle(transaction._id, -1)}
                                                    className="ml-2 font-medium capitalize text-red-600 hover:underline dark:text-red-500">
                                                    {translate('cancel')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {Array.isArray(transactionList) && !transactionList.length && (
                            <div className="flex h-[100px] items-center justify-center">{translate('NotFound')}</div>
                        )}
                    </div>
                    {resultData?.totalPage && resultData.totalPage > 0 ? (
                        <Pagination
                            queryConfig={queryParams}
                            page={resultData?.currentPage}
                            totalPage={resultData?.totalPage}
                        />
                    ) : (
                        <div className="h-20"></div>
                    )}
                </>
            )}
        </div>
    );
};

export default PaymentManagement;
