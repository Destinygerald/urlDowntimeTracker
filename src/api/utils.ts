export function setCookie (token: string, cookie_name: string) {
    if (!token) return;

    const date = new Date();
    date.setTime(date.getTime() + (24*60*60*1000));
    
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${cookie_name}` + "=" + token  + expires + "; path=/";
}

export function getCookie(cookie: string): string {
    if (!document.cookie) return "";

    const allCookies = document.cookie.split(' ')

    if (allCookies.length == 0) return "";

    const authCookie = allCookies.find(item => item.includes(cookie))
    
    if (!authCookie) return "";
    return authCookie.split('=')[1]
}