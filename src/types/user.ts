export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: number;
    refreshToken: string;
    isActive: boolean;
    avatarImg: string;
    wallet: number;
    createTime: Date;
    updateTime: Date;
}

export interface UserData {
    data: User[];
    currentPage: number;
    totalPage: number;
}
