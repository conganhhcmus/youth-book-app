import apiClients from '@/configs/apiClients';
import { DASHBOARD_PATH } from '@/constants/path';
import { Dashboard } from '@/types/dashboard';

const dashboardApis = {
    getDashboard() {
        const url = DASHBOARD_PATH.dashboard;
        return apiClients.get<Dashboard>(url);
    },
};

export default dashboardApis;
