import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHook';
import { selectMode } from '@/redux/slices/settings';
import useMode from '@/hooks/useMode';
import { INDEXED_DB } from '@/constants/settings';
import { useEffect } from 'react';
import { initLocalDb } from './utils/indexedDB';
import router from './routes';

const App = () => {
    const mode = useAppSelector((state) => selectMode(state.settings));
    const changeMode = useMode();

    useEffect(() => {
        initLocalDb(INDEXED_DB.collection.history);
    }, []);

    useEffect(() => {
        changeMode(mode);
    }, [mode, changeMode]);

    return <RouterProvider router={createBrowserRouter(router)} />;
};

export default App;
