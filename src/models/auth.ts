import { UserAvatar } from './user';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    fullname: string;
    phone_number: string;
    password: string;
    repeat_password: string;
    address: string;
    avatar?: UserAvatar;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: string;
}
