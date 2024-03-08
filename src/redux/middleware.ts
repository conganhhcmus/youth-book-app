import type { Middleware } from 'redux';
import type { RootState } from './store';

const loggerMiddleware: Middleware<unknown, RootState> = (store) => (next) => (action) => {
    console.group(action);
    console.log('Current state:', store.getState());
    const result = next(action);
    console.log('New state:', store.getState());
    console.groupEnd();
    return result;
};

export default import.meta.env.VITE_ENV !== 'development' ? [] : [loggerMiddleware];
