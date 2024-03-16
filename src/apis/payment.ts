import apiClients from '@/configs/apiClients';
import { PAYMENT_PATH } from '@/constants/path';
import { Transaction, TransactionData } from '@/types/payment';
import { paramOption } from '@/types/request';

const paymentApis = {
    deposit(amount: number) {
        const url = PAYMENT_PATH.deposit;
        return apiClients.post(url, { amount });
    },

    buy(chapterId: string, amount: number) {
        const url = PAYMENT_PATH.buy;
        return apiClients.post(url, { amount, chapterId });
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

    getAllBuyTransactionByUser(userId: string | undefined) {
        if (!userId) return;
        const url = PAYMENT_PATH.transaction_buy + `/${userId}`;
        return apiClients.get<Transaction[]>(url);
    },
};

export default paymentApis;
