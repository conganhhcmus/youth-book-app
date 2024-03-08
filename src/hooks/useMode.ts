import { changeMode } from '@/redux/slices/settings';
import { useDispatch } from 'react-redux';

const useMode = () => {
    const dispatch = useDispatch();

    const changeThemeMode = (mode: string) => {
        if (mode === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.body.classList.remove('dark:bg-gray-700');
            localStorage.setItem('theme', 'light');
            dispatch(changeMode(mode));
        }
        if (mode === 'dark') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark:bg-gray-700');
            localStorage.setItem('theme', 'dark');
            dispatch(changeMode(mode));
        }
    };
    return changeThemeMode;
};

export default useMode;
