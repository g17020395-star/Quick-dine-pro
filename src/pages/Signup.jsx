import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !password) {
      addToast('Please fill in all fields', 'error')
      return
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters', 'error')
      return
    }
    setLoading(true)
    const result = await signup(name, email, phone, password)
    setLoading(false)

    if (result.success) {
      addToast('Account created successfully!')
      navigate('/')
    } else {
      addToast(result.error || 'Signup failed', 'error')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <span className="auth-illustration">🎉</span>
          <h2>Join Hot meals</h2>
          <p>Create an account and start pre-ordering food at your favorite restaurants</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-container">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Sign up to start your seamless dining journey</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
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
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Min 6 characters"
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
