export const setCookie = (cname: string, value: string, expDays: number = 30) => {
    removeCookie(cname);

    let expires = '';
    if (expDays) {
        const d = new Date();
        d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
        expires = 'expires=' + d.toUTCString();
    }
    document.cookie = cname + '=' + value + ';' + expires + ';path=/';
};

export const getCookie = (cname: string) => {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const removeCookie = (cname: string) => {
    document.cookie = `${cname}=;expires=Thu, 01 Jan 1970;path=/`;
};
