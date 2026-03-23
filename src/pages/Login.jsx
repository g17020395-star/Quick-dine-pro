import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      addToast('Please fill in all fields', 'error')
      return
    }
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)

    if (result.success) {
      addToast('Welcome back!')
      if (result.role === 'super_admin') navigate('/super-admin')
      else if (result.role === 'restaurant_admin') navigate('/admin/dashboard')
      else navigate('/')
    } else {
      addToast(result.error, 'error')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <span className="auth-illustration">🍽️</span>
          <h2>Welcome Back</h2>
          <p>Login to manage your orders, reservations, and dining experience</p>
          <div style={{ marginTop: 40, padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: 12, textAlign: 'left', fontSize: '0.85rem' }}>
            <p style={{ fontWeight: 700, marginBottom: 12, opacity: 1 }}>Demo Accounts:</p>
            <p style={{ opacity: 0.8, marginBottom: 4 }}>👑 Super Admin: admin@quickdine.pro / admin123</p>
            <p style={{ opacity: 0.8, marginBottom: 4 }}>🏪 Restaurant: spicegarden@quickdine.pro / hotel123</p>
            <p style={{ opacity: 0.8 }}>👤 Customer: customer@example.com / customer123</p>
          </div>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-container">
          <h1>Sign In</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', padding: 4, color: '#8e99a4' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
