import { useEffect } from 'react';

const useScrollTop = (dependencyList: unknown[] = []) => {
    useEffect(() => {
        const scrollToTop = () => {
            window.scroll({
                top: 0,
                behavior: 'smooth',
            });
        };

        window.addEventListener('scroll', scrollToTop);

        return () => {
            window.removeEventListener('scroll', scrollToTop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyList);
};

export default useScrollTop;
