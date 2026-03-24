import { createContext, useContext, useState, useEffect } from 'react'
import { DEMO_USERS } from '../data/demoData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const saved = localStorage.getItem('Hot meals_session')
    if (saved) {
      try {
        const session = JSON.parse(saved)
        setUser(session.user)
        setProfile(session.profile)
      } catch (e) {
        localStorage.removeItem('Hot meals_session')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Demo login — check against demo users
    for (const [, userData] of Object.entries(DEMO_USERS)) {
      if (userData.email === email && userData.password === password) {
        const session = {
          user: { email: userData.email, id: userData.profile.id },
          profile: userData.profile
        }
        setUser(session.user)
        setProfile(session.profile)
        localStorage.setItem('Hot meals_session', JSON.stringify(session))
        return { success: true, role: userData.profile.role }
      }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = async (name, email, phone, password) => {
    // Demo signup — create a customer account
    const newProfile = {
      id: 'c_' + Date.now(),
      full_name: name,
      phone,
      role: 'customer',
      restaurant_id: null
    }
    const session = {
      user: { email, id: newProfile.id },
      profile: newProfile
    }
    setUser(session.user)
    setProfile(session.profile)
    localStorage.setItem('Hot meals_session', JSON.stringify(session))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('quickdine_session')
  }

  const value = {
    user,
    profile,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    role: profile?.role || null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
