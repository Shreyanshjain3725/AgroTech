import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useMemo } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || '';

const api = axios.create({
    baseURL: API_BASE,
});

export const useApi = () => {
    const { user, isAuthenticated } = useAuth();

    const apiInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: API_BASE,
        });

        instance.interceptors.request.use(config => {
            console.log('Request URL:', config.url);
            console.log('Request method:', config.method);
            console.log('Request headers before sending:', config.headers);

            if (isAuthenticated && user) {
                const token = btoa(`${user.username}:${user.password}`);
                config.headers.Authorization = `Basic ${token}`;
            }
            return config;
        });

        return instance;
    }, [user, isAuthenticated]);

    return apiInstance;
};

export default api;
