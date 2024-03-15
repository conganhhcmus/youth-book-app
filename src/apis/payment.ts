import apiClients from '@/configs/apiClients';
import { PAYMENT_PATH } from '@/constants/path';
import { TransactionData } from '@/types/payment';
import { paramOption } from '@/types/request';

const paymentApis = {
    deposit(amount: number) {
        const url = PAYMENT_PATH.deposit;
        return apiClients.post(url, { amount });
    },
    getAllTransactionByUser(userId: string | undefined, option: number, status: number[], params?: paramOption) {
        if (!userId) return;
        const url = PAYMENT_PATH.transaction + `/${userId}`;
        return apiClients.get<TransactionData>(url, { params: { ...params, option, status } });
    },

    getAllTransaction(option: number, status: number[], params?: paramOption) {
        const url = PAYMENT_PATH.transaction;
        return apiClients.get<TransactionData>(url, { params: { ...params, option, status } });
    },

    updateTransaction(id: string, status: number) {
        const url = PAYMENT_PATH.transaction + `/${id}`;
        return apiClients.post(url, { status });
    },
};

export default paymentApis;
