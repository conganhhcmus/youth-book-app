import { useEffect, useState } from 'react';

const useScrollTop = (val: number) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    const heightToHide = val;
    const listenToScroll = () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (windowScroll > heightToHide) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll);
    });

    return isShow;
};

export default useScrollTop;
