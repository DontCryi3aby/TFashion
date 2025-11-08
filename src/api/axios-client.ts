import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenResponse } from 'src/models/auth';


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                const tokensResponse: TokenResponse = await axiosClient.post('/auth/refresh', {
                    refresh_token: refreshToken,
                });

                const { access_token, refresh_token } = tokensResponse;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axiosClient(originalRequest);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                // Handle refresh token error or redirect to login
                console.log('Refresh Token Expired!');
            }
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
