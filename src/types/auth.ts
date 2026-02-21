export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface LoginResponse {
    data: TokenResponse;
    status: 'success';
}

export interface RegisterResponse {
    data: {user_id: number};
    status: 'success';
}

export interface RegisterDto {
    email: string;
    password: string;
    username: string;
}

export interface LoginDto {
    email: string;
    password: string;
}