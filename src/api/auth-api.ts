import { LoginPayload, RegisterPayload, TokenResponse, User } from 'src/models';

import axiosClient from './axios-client';

const authApi = {
    register(data: RegisterPayload): Promise<User> {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },

    login(data: LoginPayload): Promise<TokenResponse> {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },

    profile(): Promise<User> {
        const url = '/auth/profile';
        return axiosClient.get(url);
    },

    logout() {
        const url = '/auth/logout';
        return axiosClient.post(url);
    },

    refresh(refresh_token: string): Promise<TokenResponse> {
        const url = '/auth/refresh';
        return axiosClient.post(url, {
            refresh_token,
        });
    },
};

export default authApi;
