import apiClients from '@/configs/apiClients';
import { AUTH_PATH } from '@/constants/path';
import { AuthToken } from '@/types/auth';
import { User } from '@/types/user';

const authApis = {
    login(params?: User) {
        const url = AUTH_PATH.login;
        return apiClients.post<AuthToken>(url, { ...params });
    },
    register(params?: User) {
        const url = AUTH_PATH.register;
        return apiClients.post<AuthToken>(url, { ...params });
    },
    changePassword(id: string | undefined, user: User, newPassword: string) {
        const url = AUTH_PATH.reset_password + `/${id ?? '-1'}`;
        return apiClients.post<AuthToken>(url, { ...user, newPassword });
    },

    fetchInfo() {
        const url = AUTH_PATH.fetch_info;
        return apiClients.get<string>(url);
    },
};

export default authApis;
