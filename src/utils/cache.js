
export function setCache(key, value) {
    return localStorage.setItem(key, value);
}

export function getCache(key) {
    return localStorage.getItem(key);
}

export function removeCache(key) {
    return localStorage.removeItem(key);
}