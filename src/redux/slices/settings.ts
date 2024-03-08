// counterSlice.ts
import { LANGUAGE, MODE } from '@/constants/settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
    language: string;
    mode: string;
}

const initialState: SettingState = {
    language: localStorage.lang ?? LANGUAGE.vi,
    mode: localStorage.theme ?? MODE.light,
};

const settingsSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        changeMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
            localStorage.setItem('lang', action.payload);
            state.language = action.payload;
        },
    },
});

export const selectLanguage = (state: SettingState) => state.language;
export const selectMode = (state: SettingState) => state.mode;

export const { changeMode, changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
