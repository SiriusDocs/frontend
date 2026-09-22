import { createContext } from 'react';
import type { LoginDto, RegisterDto } from '../types/auth';

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginDto) => Promise<void>;
    regist: (data: RegisterDto) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
