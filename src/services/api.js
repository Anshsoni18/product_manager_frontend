import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userEmail')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => 
    api.post('/api/users/login', { email, password }),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/api/categories/'),
}

// Products API
export const productsAPI = {
  getAll: () => api.get('/api/products/'),
  create: (productData) => api.post('/api/products/', productData),
}

export default api