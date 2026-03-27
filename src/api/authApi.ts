import api from './axiosInstance';
import type { LoginResponse, RegisterResponse, LoginDto, RegisterDto } from '../types/auth';

export const authApi = {
    register: async (data: RegisterDto) => {
        const response = await api.post<RegisterResponse>('/auth/sign-up', data);
        return response.data;
    },
    
    login: async (data: LoginDto) => {
        const response = await api.post<LoginResponse>('/auth/sign-in', data);
        
        const { access_token, refresh_token } = response.data.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}