import userApis from '@/apis/user';
import { useAppSelector } from '@/hooks/reduxHook';
import useRequestParams from '@/hooks/useRequestParams';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { getRoleName, getStatusName } from '@/utils/user';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Pagination } from '@/components/Pagination';
import Popup from '@/components/Popup';
import { User } from '@/types/user';
import useAxiosRequest from '@/hooks/useAxiosRequest';
import { ROLE_LIST } from '@/constants/settings';
import moment from 'moment';
import { formatCurrency } from '@/utils/format';
import Swal from 'sweetalert2';

const UserManagement: React.FC = () => {
    const [isShowAction, setIsShowAction] = useState<boolean>(false);
    const [isShowEditAction, setIsShowEditAction] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    // const [checkedList, setCheckedList] = useState<string[]>([]);
    const [userInfo, setUserInfo] = useState<User>();

    const refRole = useRef<HTMLSelectElement>(null);
    const refFullName = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);

    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const { queryParams } = useRequestParams();
    const { callRequest } = useAxiosRequest();

    const { data: resultData } = useQuery({
        queryKey: ['getAllUsers', { ...queryParams, q: searchText }],
        queryFn: () => userApis.getAllUsers({ ...queryParams, q: searchText }),
        staleTime: 3 * 60 * 1000,
    });

    const result = resultData?.data;
    const userList = result?.data;

    const handleEdit = (id: string) => {
        setIsShowEditAction(true);
        callRequest(userApis.getUserInfo(id), (res) => {
            setUserInfo(res.data);
        });
    };

    const handleSubmit = () => {
        if (!refFullName.current?.value && !refEmail.current?.value && refRole.current?.value == userInfo?.role) {
            alert(translate('NoChange'));
            return;
        }

        const data = {
            ...userInfo,
            email: refEmail.current?.value ? refEmail.current?.value : userInfo?.email,
            fullName: refFullName.current?.value ? refFullName.current?.value : userInfo?.fullName,
            role: refRole.current?.value ? refRole.current?.value : userInfo?.role,
        } as User;

        callRequest(userApis.updateUserInfo(userInfo?._id, data), (res) => {
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

    const _editUser = () => (
        <form
            className="space-y-4 md:space-y-6"
            action="#">
            <div>
                <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('your-username')}
                </label>
                <input
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
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate('role')}
                </label>
                <select
                    ref={refRole}
                    id="role"
                    defaultValue={userInfo?.role}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    {ROLE_LIST.map((role) => (
                        <option
                            key={role.value}
                            value={role.value}>
                            {translate(role.name)}
                        </option>
                    ))}
                </select>
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
                    {translate('email')}
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
        </form>
    );

    return (
        <div className="relative h-full w-full overflow-x-auto border-2 p-8 sm:rounded-lg">
            {isShowEditAction && (
                <Popup
                    closeHandle={() => setIsShowEditAction(false)}
                    title={translate('edit-user')}
                    content={_editUser()}
                    submitHandle={handleSubmit}
                    cancelHandle={() => setIsShowEditAction(false)}
                />
            )}
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white pb-4 dark:bg-gray-700 md:flex-row md:space-y-0">
                <div>
                    <button
                        onClick={() => setIsShowAction((prev) => !prev)}
                        id="dropdownActionButton"
                        data-dropdown-toggle="dropdownAction"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        type="button">
                        <span className="sr-only">Action button</span>
                        Action
                        <svg
                            className="ms-2.5 h-2.5 w-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {isShowAction && (
                        <div
                            id="dropdownAction"
                            className="fixed z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {translate('activate')}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {translate('deactivate')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
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
                        placeholder="Search for users"
                    />
                </div>
            </div>
            <div className="relative h-96 w-full overflow-y-auto sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                    />
                                    <label
                                        htmlFor="checkbox-all-search"
                                        className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('username')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('role')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('wallet')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('status')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('create-at')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3">
                                {translate('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList &&
                            userList.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-table-search-1"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                            />
                                            <label
                                                htmlFor="checkbox-table-search-1"
                                                className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <th
                                        scope="row"
                                        className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
                                        {user.avatarImg ? (
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user.avatarImg}
                                                alt={user.fullName}
                                            />
                                        ) : (
                                            <svg
                                                className="h-10 w-10 rounded-full"
                                                viewBox="0 0 1024 1024"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M508.3136 498.2784A221.4912 221.4912 0 1 0 286.72 276.48a221.7984 221.7984 0 0 0 221.5936 221.7984z m0-393.8304A172.3392 172.3392 0 1 1 336.0768 276.48a172.4416 172.4416 0 0 1 172.2368-172.032zM680.5504 536.7808a44.7488 44.7488 0 0 0-37.5808 3.2768 276.48 276.48 0 0 1-266.752 1.4336 44.6464 44.6464 0 0 0-37.6832-2.8672A481.28 481.28 0 0 0 30.0032 942.08a24.576 24.576 0 0 0 22.016 26.9312h2.4576a24.576 24.576 0 0 0 24.4736-22.1184 432.5376 432.5376 0 0 1 275.0464-361.472A326.5536 326.5536 0 0 0 665.6 583.68a437.4528 437.4528 0 0 1 279.4496 362.9056 24.576 24.576 0 1 0 48.9472-4.5056 487.0144 487.0144 0 0 0-313.4464-405.2992z"
                                                    fill=""
                                                />
                                            </svg>
                                        )}
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.username}</div>
                                            <div className="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 capitalize">{translate(getRoleName(user.role))}</td>
                                    <td className="px-6 py-4 ">
                                        <div className="font-bold text-primary">{formatCurrency(user.wallet)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center capitalize">
                                            <div className={`me-2 h-2.5 w-2.5 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'} `} />{' '}
                                            {translate(getStatusName(user.isActive))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.createTime ? moment(user.createTime).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(user._id)}
                                            className="font-medium capitalize text-blue-600 hover:underline dark:text-blue-500">
                                            {translate('edit')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {result?.totalPage && (
                <Pagination
                    queryConfig={queryParams}
                    page={result?.currentPage}
                    totalPage={result?.totalPage}
                />
            )}
        </div>
    );
};

export default UserManagement;
