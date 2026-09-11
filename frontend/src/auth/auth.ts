const ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_EXPIRED_EVENT = 'auth:expired';

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
    return getAccessToken() !== null;
}

export function notifyAuthenticationExpired(): void {
    removeAccessToken();
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
}

export function onAuthenticationExpired(
    callback: () => void,
): () => void {
    window.addEventListener(AUTH_EXPIRED_EVENT, callback);

    return () => {
        window.removeEventListener(AUTH_EXPIRED_EVENT, callback);
    };
}