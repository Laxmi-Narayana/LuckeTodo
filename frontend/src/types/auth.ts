export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    firstName: string;
    lastName: string;
    email: string;
}

export interface SigninRequest {
    email: string;
    password: string;
}

export interface SigninResponse {
    accessToken: string;
    tokenType: string;
}

