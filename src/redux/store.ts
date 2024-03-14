import { configureStore, combineReducers } from '@reduxjs/toolkit';
import middleware from './middleware';
import settingsReducer from './slices/settings';

const rootReducer = combineReducers({
    settings: settingsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
