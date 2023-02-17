export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): any {
    return localStorage.getItem(key);
}

export function removeLocalStorage(key: string) {
    return localStorage.removeItem(key);
}