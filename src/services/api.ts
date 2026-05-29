import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import config from '../config'

const api = axios.create({
  baseURL: config.api.url,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequestUrl = error.config?.url || '';
    if (error.response?.status === 401 && !originalRequestUrl.includes('/login')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error)
  }
);

export default api;
