import { ROLES } from '@/constants/settings';

export const getRoleName = (role: number): string => {
    if (role === ROLES.admin) return 'admin';
    return 'normal';
};

export const getStatusName = (status: boolean): string => {
    if (status) return 'active';
    return 'inactive';
};
