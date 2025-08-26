import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data: { name: string; email: string; phone: string; password: string; channel?: string }) =>
    api.post('/auth/register', data),
  
  verifyOtp: (data: { email: string; otp: string }) =>
    api.post('/auth/verify-otp', data),
  
  login: (data: { email: string; password: string; channel?: string }) =>
    api.post('/auth/login', data),
  
  verifyLoginOtp: (data: { otp: string }) =>
    api.post('/auth/login-verify', data),
  
  update2fa: (data: { enabled: boolean; method?: string }) =>
    api.post('/auth/2fa', data),
};

// Water usage API calls
export const waterAPI = {
  addUsage: (data: { amountLiters: number; notes?: string; date?: string }) =>
    api.post('/water', data),
  
  getUsages: () =>
    api.get('/water'),
  
  deleteUsage: (id: string) =>
    api.delete(`/water/${id}`),
  
  getStats: (params?: { from?: string; to?: string }) =>
    api.get('/water/stats', { params }),
};

export default api;
