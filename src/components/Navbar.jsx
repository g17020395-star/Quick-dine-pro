import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UtensilsCrossed, ShoppingCart, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { isAuthenticated, profile, logout, role } = useAuth()
  const { totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileOpen(false)
  }

  const getDashboardLink = () => {
    if (role === 'super_admin') return '/super-admin'
    if (role === 'restaurant_admin') return '/admin/dashboard'
    return null
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <UtensilsCrossed size={22} />
            </div>
           Hot meals
          </Link>

          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>

            {isAuthenticated ? (
              <>
                {role === 'customer' && (
                  <Link to="/cart" className="cart-badge">
                    <ShoppingCart size={20} />
                    {totalItems > 0 && <span className="badge">{totalItems}</span>}
                  </Link>
                )}
                {getDashboardLink() && (
                  <Link to={getDashboardLink()} className="btn-primary">
                    <LayoutDashboard size={16} style={{ marginRight: 4 }} />
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-ghost">
                  <LogOut size={16} style={{ marginRight: 4 }} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/restaurants" onClick={() => setMobileOpen(false)}>Restaurants</Link>
        {isAuthenticated ? (
          <>
            {role === 'customer' && (
              <Link to="/cart" onClick={() => setMobileOpen(false)}>
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            )}
            {getDashboardLink() && (
              <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)}>Dashboard</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </>
  )
}
