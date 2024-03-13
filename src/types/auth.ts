export interface AuthToken {
    token: string;
    refreshToken: string;
}

export interface UserJwtPayload {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: number;
    avatarImg: string;
    wallet: number;
}
