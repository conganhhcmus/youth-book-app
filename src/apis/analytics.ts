import { paramOption } from '@/types/request';
import apiClients from '@/configs/apiClients';
import { ANALYTICS_PATH } from '@/constants/path';
import { AnalyticsData } from '@/types/analytics';

const analyticsApis = {
    getAnalytics(params: paramOption) {
        const url = ANALYTICS_PATH.analytics;
        return apiClients.get<AnalyticsData>(url, { params });
    },
};

export default analyticsApis;
