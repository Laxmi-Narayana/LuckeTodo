import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function GuestRoute() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/tasks" replace />;
    }

    return <Outlet />;
}

export default GuestRoute;