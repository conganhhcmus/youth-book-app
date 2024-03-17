import { configureStore, combineReducers } from '@reduxjs/toolkit';
import middleware from './middleware';
import settingsReducer from './slices/settings';
import tokenReducer from './slices/token';

const rootReducer = combineReducers({
    settings: settingsReducer,
    token: tokenReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
