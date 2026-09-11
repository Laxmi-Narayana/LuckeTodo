import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <>
            <header className="app-header">
                <h1>LuckeTodo</h1>

                <button type="button" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <main className="app-main">
                {children}
            </main>
        </>
    );
}

export default AppLayout;