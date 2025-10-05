import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updatePassword: (passwords) => api.put('/auth/updatepassword', passwords),
};

export const portfolioAPI = {
  getAll: (params) => api.get('/portfolio', { params }),
  getOne: (id) => api.get(`/portfolio/${id}`),
  create: (formData) => api.post('/portfolio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/portfolio/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/portfolio/${id}`),
  getCategories: () => api.get('/portfolio/categories/list'),
};

export const testimonialAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (formData) => api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/testimonials/${id}`),
  toggleApproval: (id) => api.patch(`/testimonials/${id}/approve`),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getOne: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, data) => api.patch(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const statsAPI = {
  getDashboard: () => api.get('/stats'),
  getPortfolioAnalytics: () => api.get('/stats/portfolio'),
};

export default api;
