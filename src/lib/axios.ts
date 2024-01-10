import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const { session } = useAuthStore.getState();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
},
  error => {
    console.error('Axios instance error:', error)
    return Promise.reject(error);
  },
)