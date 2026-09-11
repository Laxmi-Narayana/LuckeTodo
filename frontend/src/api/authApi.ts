import apiRequest from './client';
import type {
    SignupRequest,
    SignupResponse,
    SigninRequest,
    SigninResponse,
} from '../types/auth';

export async function signup(
    request: SignupRequest,
): Promise<SignupResponse> {
    const response = await apiRequest<{
        status: string;
        message: string;
        data: SignupResponse;
    }>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(request),
    });

    return response.data;
}

export async function signin(
    request: SigninRequest,
): Promise<SigninResponse> {
    const response = await apiRequest<{
        status: string;
        message: string;
        data: SigninResponse;
    }>('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(request),
    });

    return response.data;
}