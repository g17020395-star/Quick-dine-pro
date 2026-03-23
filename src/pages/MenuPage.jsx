import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Minus, ShoppingCart, Clock, Star, ArrowLeft, Leaf, Sparkles } from 'lucide-react'
import { DEMO_RESTAURANTS, DEMO_MENU_ITEMS, DEMO_ORDERS } from '../data/demoData'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getRecommendations } from '../utils/recommendations'
import { estimateWaitTime, getWaitTimeColor } from '../utils/waitTime'

export default function MenuPage() {
  const { restaurantId } = useParams()
  const { addItem, getItemQuantity, updateQuantity } = useCart()
  const { isAuthenticated } = useAuth()
  const { addToast } = useToast()
  const [activeCategory, setActiveCategory] = useState('All')
  const [lastAdded, setLastAdded] = useState(null)

  const restaurant = DEMO_RESTAURANTS.find(r => r.id === restaurantId)
  const menuItems = DEMO_MENU_ITEMS[restaurantId] || []

  const categories = ['All', ...new Set(menuItems.map(item => item.category))]

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  // Recommendations based on last added item
  const recommendations = useMemo(() => {
    if (!lastAdded) return []
    return getRecommendations(lastAdded, menuItems, 4)
  }, [lastAdded, menuItems])

  // Wait time estimation
  const pendingOrders = DEMO_ORDERS.filter(o => o.restaurant_id === restaurantId && (o.status === 'pending' || o.status === 'accepted')).length
  const waitTime = estimateWaitTime(pendingOrders, restaurant?.avg_prep_time)

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      addToast('Please login to add items to cart', 'error')
      return
    }
    addItem(item, restaurantId, restaurant.name)
    setLastAdded(item)
    addToast(`${item.name} added to cart`)
  }

  if (!restaurant) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>Restaurant not found</h3>
            <Link to="/restaurants" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Restaurants</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        {/* Back Button */}
        <Link to="/restaurants" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', marginBottom: 20, fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Restaurants
        </Link>

        {/* Restaurant Header */}
        <div className="menu-header">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              style={{ width: 120, height: 120, borderRadius: 16, objectFit: 'cover' }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.cuisine_type} • {restaurant.address}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  {restaurant.rating} rating
                </span>
                <span className={`veg-badge ${restaurant.is_veg ? 'veg' : 'non-veg'}`} style={{ fontSize: '0.85rem' }}>
                  {restaurant.is_veg ? <><Leaf size={12} /> Pure Veg</> : '● Non-Veg'}
                </span>
                <span className="wait-time-badge" style={{ color: getWaitTimeColor(waitTime.level) }}>
                  <Clock size={14} />
                  Est. wait: {waitTime.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="menu-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map(item => {
            const qty = getItemQuantity(item.id)
            return (
              <div key={item.id} className="food-card">
                <img src={item.image_url} alt={item.name} className="food-card-image" />
                <div className="food-card-body">
                  <div className="food-card-header">
                    <div>
                      <span className={`veg-badge ${item.is_veg ? 'veg' : 'non-veg'}`} style={{ marginBottom: 4 }}>
                        {item.is_veg ? '● Veg' : '● Non-Veg'}
                      </span>
                      <h4 className="food-card-name">{item.name}</h4>
                    </div>
                    <span className="food-card-price">₹{item.price}</span>
                  </div>
                  <p className="food-card-desc">{item.description}</p>
                  <div className="food-card-actions">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</span>
                    {qty > 0 ? (
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, qty - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => updateQuantity(item.id, qty + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-accent btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendation-section">
            <h3>
              <Sparkles size={18} style={{ marginRight: 8, color: 'var(--accent)' }} />
              You Might Also Like
            </h3>
            <div className="recommendation-grid">
              {recommendations.map(item => {
                const qty = getItemQuantity(item.id)
                return (
                  <div key={item.id} className="food-card">
                    <img src={item.image_url} alt={item.name} className="food-card-image" style={{ height: 140 }} />
                    <div className="food-card-body">
                      <h4 className="food-card-name">{item.name}</h4>
                      <div className="food-card-actions" style={{ marginTop: 8 }}>
                        <span className="food-card-price">₹{item.price}</span>
                        {qty > 0 ? (
                          <div className="quantity-control">
                            <button onClick={() => updateQuantity(item.id, qty - 1)}><Minus size={14} /></button>
                            <span>{qty}</span>
                            <button onClick={() => updateQuantity(item.id, qty + 1)}><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button className="btn btn-accent btn-sm" onClick={() => handleAddToCart(item)}>
                            <Plus size={14} /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Floating Cart Button */}
        {isAuthenticated && (
          <Link
            to="/cart"
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--primary)',
              color: 'white',
              padding: '16px 28px',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-xl)',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'var(--transition)'
            }}
          >
            <ShoppingCart size={18} />
            View Cart
          </Link>
        )}
      </div>
    </div>
  )
}
