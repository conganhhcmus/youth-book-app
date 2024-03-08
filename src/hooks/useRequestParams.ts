import { paramOption } from '@/types/request';
import { useSearchParams } from 'react-router-dom';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';

const _getQueryParams = () => {
    const [searchParams] = useSearchParams();
    const temp = Object.fromEntries([...searchParams]);
    const queryParams: paramOption = omitBy(
        {
            type: temp.type,
            status: temp.status,
            q: temp.q,
            page: temp.page || 1,
        },
        isUndefined,
    );
    return queryParams;
};

const _getDefaultQueryParams = () => {
    return {
        page: 1,
    } as paramOption;
};

const useRequestParams = () => {
    const queryParams: paramOption = _getQueryParams();
    const defaultQueryParams: paramOption = _getDefaultQueryParams();
    return { defaultQueryParams, queryParams };
};

export default useRequestParams;
