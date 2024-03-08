import { configureStore, combineReducers } from '@reduxjs/toolkit';
import middleware from './middleware';
import settingsReducer from './slices/settings';
import todoReducer from './slices/todo';

const rootReducer = combineReducers({
    settings: settingsReducer,
    todo: todoReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
