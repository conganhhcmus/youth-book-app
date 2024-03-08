import { useEffect, useState } from 'react';

const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    const isMobileMini = width < 639;
    const isMobile = width >= 640 && width < 768;
    const isTabletMini = width >= 768 && width < 1024;
    const isTablet = width >= 1024 && width < 1280;
    const isDesktop = width >= 1280;
    return { isMobileMini, isMobile, isTabletMini, isTablet, isDesktop };
};

export default useViewport;
