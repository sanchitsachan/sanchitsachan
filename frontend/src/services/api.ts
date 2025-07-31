import axios from 'axios';
import toast from 'react-hot-toast';
import type { 
  ApiResponse, 
  Broker, 
  Review, 
  User, 
  Article, 
  Ranking, 
  BrokerFilters, 
  ReviewFilters,
  LoginForm,
  RegisterForm,
  ReviewForm,
  ContactForm
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || 'An error occurred';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};

// Brokers API
export const brokersAPI = {
  getBrokers: async (filters?: BrokerFilters): Promise<ApiResponse<Broker[]>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await api.get(`/brokers?${params.toString()}`);
    return response.data;
  },

  getBrokerById: async (id: string): Promise<ApiResponse<Broker>> => {
    const response = await api.get(`/brokers/${id}`);
    return response.data;
  },

  getBrokerBySlug: async (slug: string): Promise<ApiResponse<Broker>> => {
    const response = await api.get(`/brokers/slug/${slug}`);
    return response.data;
  },

  getFeaturedBrokers: async (): Promise<ApiResponse<Broker[]>> => {
    const response = await api.get('/brokers/featured');
    return response.data;
  },

  compareBrokers: async (ids: string[]): Promise<ApiResponse<Broker[]>> => {
    const params = new URLSearchParams();
    ids.forEach(id => params.append('ids', id));
    const response = await api.get(`/brokers/compare?${params.toString()}`);
    return response.data;
  },

  getBrokerRankings: async (category?: string, year?: number): Promise<ApiResponse<Ranking[]>> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (year) params.append('year', year.toString());
    const response = await api.get(`/brokers/rankings?${params.toString()}`);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getReviews: async (filters?: ReviewFilters): Promise<ApiResponse<Review[]>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await api.get(`/reviews?${params.toString()}`);
    return response.data;
  },

  createReview: async (data: ReviewForm): Promise<ApiResponse<Review>> => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  updateReview: async (id: string, data: Partial<ReviewForm>): Promise<ApiResponse<Review>> => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  deleteReview: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  voteOnReview: async (id: string, voteType: 'UPVOTE' | 'DOWNVOTE'): Promise<ApiResponse> => {
    const response = await api.post(`/reviews/${id}/vote`, { voteType });
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUsers: async (page = 1, limit = 20): Promise<ApiResponse<User[]>> => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

// Articles API
export const articlesAPI = {
  getArticles: async (filters?: { 
    page?: number; 
    limit?: number; 
    category?: string; 
    featured?: boolean; 
    search?: string; 
  }): Promise<ApiResponse<Article[]>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/articles?${params.toString()}`);
    return response.data;
  },

  getArticleBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
    const response = await api.get(`/articles/slug/${slug}`);
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  submitContactForm: async (data: ContactForm): Promise<ApiResponse> => {
    const response = await api.post('/contact', data);
    return response.data;
  },
};

export default api;