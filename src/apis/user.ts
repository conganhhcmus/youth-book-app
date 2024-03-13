import apiClients from '@/configs/apiClients';
import { USERS_PATH } from '@/constants/path';
import { paramOption } from '@/types/request';
import { User, UserData } from '@/types/user';

const userApis = {
    getAllUsers(params?: paramOption) {
        const url = USERS_PATH.users;
        return apiClients.get<UserData>(url, { params });
    },
    getUserInfo(id?: string | undefined) {
        const url = USERS_PATH.users + `/${id ?? '-1'}`;
        return apiClients.get<User>(url);
    },
    updateUserInfo(id: string | undefined, user: User) {
        const url = USERS_PATH.users + `/${id ?? '-1'}`;
        return apiClients.put<User>(url, { ...user });
    },
};

export default userApis;
