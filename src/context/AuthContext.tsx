import { useState, type ReactNode } from 'react';
import { authApi } from '../api/authApi';
import type { LoginDto, RegisterDto } from '../types/auth';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('access_token'));
    const isLoading = false;

    const login = async (data: LoginDto) => {
        await authApi.login(data);
        setIsAuthenticated(true);
    };

    const regist = async (data: RegisterDto) => {
        await authApi.register(data);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await authApi.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, regist, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
