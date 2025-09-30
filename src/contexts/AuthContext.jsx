import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const userRole = localStorage.getItem('userRole')
    const userEmail = localStorage.getItem('userEmail')
    
    if (token && refreshToken && userRole && userEmail) {
      try {
        // Verify token is still valid
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        
        if (decodedToken.exp > currentTime) {
          setUser({
            email: userEmail,
            role: userRole,
            token: token,
            refreshToken: refreshToken
          })
        } else {
          // Token expired, clear storage
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userRole')
          localStorage.removeItem('userEmail')
        }
      } catch (error) {
        // Invalid token, clear storage
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userEmail')
      }
    }
    setLoading(false)
  }, [])

  const login = (token, refreshToken, userRole, userEmail) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userEmail', userEmail)
    setUser({
      email: userEmail,
      role: userRole,
      token: token,
      refreshToken: refreshToken
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}