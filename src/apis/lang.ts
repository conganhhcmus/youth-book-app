import localClients from '@/configs/localClients';
import { APP_PATH } from '@/constants/path';

export const getLanguageResource = (locale: string) => {
    const url = `${APP_PATH.language}/${locale}.json`;
    return localClients.get(url);
};
