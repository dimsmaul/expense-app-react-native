import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

auth.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // config.headers["Content-Type"] = "application/json";
  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
  return config;
});
auth.interceptors.response.use(
  (response) => response, // Jika sukses, lanjutkan responsenya
  (error) => {
    if (error.response?.status === 401) {
    } else {
      const errorMessage = JSON.stringify(error);
      console.error('API Error:', errorMessage);
      // const errorMessage = error.response?.data?.error || "An error occurred";
      //   callAlert({
      //     type: 'error',
      //     title: 'Error',
      //     message: errorMessage,
      //   });
    }

    return Promise.reject(error);
  }
);

export default auth;
