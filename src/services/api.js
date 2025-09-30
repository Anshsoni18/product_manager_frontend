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

// Response interceptor to handle auth errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const refreshToken = localStorage.getItem('refreshToken')
      
      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await authAPI.refresh(refreshToken)
          const { access_token, refresh_token } = response.data
          
          // Update stored tokens
          localStorage.setItem('token', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          
          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          
          // Retry the original request
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userRole')
          localStorage.removeItem('userEmail')
          window.location.href = '/login'
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userEmail')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => 
    api.post('/api/users/login', { email, password }),
  refresh: (refreshToken) => 
    api.post('/api/users/refresh', { refresh_token: refreshToken }),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/api/categories/'),
}

// Products API
export const productsAPI = {
  getAll: () => api.get('/api/products/'),
  create: (productData) => api.post('/api/products/', productData),
  delete: (productId) => api.delete(`/api/products/${productId}`),
}

export default api