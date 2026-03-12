import { type ReactNode, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/main');
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return null;

    return <>{!isAuthenticated ? children : null}</>
}