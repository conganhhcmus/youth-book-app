// counterSlice.ts
import { COOKIE_KEYS } from '@/constants/settings';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
    accessToken: string;
    refreshToken: string;
}

const initialState: TokenState = {
    accessToken: getCookie(COOKIE_KEYS.token),
    refreshToken: getCookie(COOKIE_KEYS.refreshToken),
};

const settingsSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        changeAccessToken: (state, action: PayloadAction<string>) => {
            if (action.payload !== '') {
                setCookie(COOKIE_KEYS.token, action.payload);
            } else removeCookie(COOKIE_KEYS.token);

            state.accessToken = action.payload;
        },
        changeRefreshToken: (state, action: PayloadAction<string>) => {
            if (action.payload !== '') {
                setCookie(COOKIE_KEYS.refreshToken, action.payload);
            } else removeCookie(COOKIE_KEYS.refreshToken);
            state.refreshToken = action.payload;
        },
    },
});

export const selectAccessToken = (state: TokenState) => state.accessToken;
export const selectRefreshToken = (state: TokenState) => state.refreshToken;

export const { changeAccessToken, changeRefreshToken } = settingsSlice.actions;
export default settingsSlice.reducer;
