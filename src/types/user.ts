export interface User {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: number;
    refreshToken: string;
    isActive: boolean;
    avatar: string;
    wallet: number;
}
