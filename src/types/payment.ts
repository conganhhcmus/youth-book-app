import { User } from './user';

export interface Transaction {
    _id: string;
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    users: User[];
}

export interface TransactionData {
    data: Transaction[];
    currentPage: number;
    totalPage: number;
}

export interface TransactionModel {
    amount: number;
    sourceId: string;
    targetId: string;
    type: number;
    status: number;
    createTime: Date;
    updateTime: Date;
}
