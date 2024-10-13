import axios from 'axios';
import { createContext, useContext, useEffect, useState } from "react";

// Create context for auth
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
    });

    // Axios Interceptor to include token in headers dynamically
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const storedAuth = localStorage.getItem("Social-auth"); // Ensure using consistent key
                if (storedAuth) {
                    const parseData = JSON.parse(storedAuth);
                    config.headers.Authorization = `Bearer ${parseData.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor when the component is unmounted
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    // Load auth from localStorage on mount and set axios default header
    useEffect(() => {
        const data = localStorage.getItem("Social-auth"); // Ensure consistent key
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });

            // Set Authorization header on mount
            axios.defaults.headers.common['Authorization'] = `Bearer ${parseData.token}`;
        }
        // eslint-disable-next-line
    }, []);  // Removed auth from dependency to avoid unnecessary calls

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

