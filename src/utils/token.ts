import { UserJwtPayload } from '@/types/auth';
import { Buffer } from 'buffer';

export const decodeJWTToken = (token: string): UserJwtPayload | null => {
    if (token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()) as UserJwtPayload;
    }

    return null;
};
