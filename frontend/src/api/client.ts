import {
    getAccessToken,
    notifyAuthenticationExpired,
} from '../auth/auth';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

export interface ApiError {
    timestamp?: string;
    status: number;
    code: string;
    message: string;
}

export class ApiException extends Error {
    readonly status: number;
    readonly code: string;

    constructor(error: ApiError) {
        super(error.message);
        this.name = 'ApiException';
        this.status = error.status;
        this.code = error.code;
    }
}

async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const token = getAccessToken();

    const headers = new Headers(options.headers);

    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...options,
            headers,
        },
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        const apiError: ApiError = {
            timestamp:
                error &&
                    typeof error.timestamp === 'string'
                    ? error.timestamp
                    : undefined,

            status: response.status,

            code:
                error &&
                    typeof error.code === 'string'
                    ? error.code
                    : 'REQUEST_FAILED',

            message:
                error &&
                    typeof error.message === 'string'
                    ? error.message
                    : 'Something went wrong',
        };

        const apiException = new ApiException(apiError);

        if (response.status === 401) {
            notifyAuthenticationExpired();
        }

        throw apiException;
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export default apiRequest;