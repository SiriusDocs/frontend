import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../api/authApi';
import type { LoginDto, RegisterDto } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginDto) => Promise<void>;
    regist: (data: RegisterDto) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if(token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

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

export const useAuth = () => {
    const context = useContext(AuthContext); 
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}