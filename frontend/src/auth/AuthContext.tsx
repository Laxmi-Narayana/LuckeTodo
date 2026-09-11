import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import type { ReactNode } from 'react';
import {
    getAccessToken,
    onAuthenticationExpired,
    removeAccessToken,
    setAccessToken,
} from './auth';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => getAccessToken() !== null,
    );

    function login(token: string) {
        setAccessToken(token);
        setIsAuthenticated(true);
    }

    function logout() {
        removeAccessToken();
        setIsAuthenticated(false);
    }

    useEffect(() => {
        return onAuthenticationExpired(() => {
            setIsAuthenticated(false);
        });
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            login,
            logout,
        }),
        [isAuthenticated],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used within AuthProvider',
        );
    }

    return context;
}