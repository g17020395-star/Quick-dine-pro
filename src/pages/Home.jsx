import { Link } from 'react-router-dom'
import { Search, ChefHat, Clock, CreditCard, Star, ArrowRight, UtensilsCrossed, CalendarCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { DEMO_RESTAURANTS } from '../data/demoData'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = DEMO_RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={16} />
              India&apos;s Smartest Dining Platform
            </div>
            <h1 className="hero-title">
              Book Before<br />
              You <span className="highlight">Reach</span>
            </h1>
            <p className="hero-subtitle">
              Pre-order your favorite food, book tables in advance, and skip the wait.
              A seamless dining experience at your fingertips.
            </p>
            <div className="hero-actions">
              <Link to="/restaurants" className="btn btn-accent btn-lg">
                Explore Restaurants
                <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                Join Free
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Restaurants</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">50K+</div>
                <div className="hero-stat-label">Happy Diners</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">4.8</div>
                <div className="hero-stat-label">App Rating</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=600&fit=crop"
                alt="Delicious food spread"
                style={{ borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
              />
              <div className="hero-float-card card-1">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} color="#059669" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Avg Wait Time</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>~15 minutes</div>
                  </div>
                </div>
              </div>
              <div className="hero-float-card card-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={18} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Top Rated</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>4.8 ★ rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 8, fontSize: '1.5rem' }}>Find Your Next Meal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Search restaurants by name or cuisine</p>
          <div className="search-bar">
            <Search size={20} color="#8e99a4" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Link to="/restaurants" className="btn btn-accent">Search</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <div className="overline">
              <CalendarCheck size={16} />
              Simple Process
            </div>
            <h2>How It Works</h2>
            <p>Book your dining experience in 4 easy steps</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Restaurant</h3>
              <p>Browse through curated restaurants near you</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Pre-Order Food</h3>
              <p>Select items from the menu and add to cart</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Book Table</h3>
              <p>Pick a time slot and reserve your table</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Pay & Arrive</h3>
              <p>Pay via UPI and your food will be ready when you arrive</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="overline">
              <Sparkles size={16} />
              Why Hot meals
            </div>
            <h2>A Better Way to Dine</h2>
            <p>Modern features designed for the perfect dining experience</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <ChefHat size={28} />
              </div>
              <h3>Pre-Order Food</h3>
              <p>Order before you arrive so your food is ready when you reach the restaurant</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={28} />
              </div>
              <h3>Smart Wait Times</h3>
              <p>Real-time estimation of wait times based on current order volume</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CreditCard size={28} />
              </div>
              <h3>Easy UPI Payment</h3>
              <p>Scan and pay via UPI — no cash needed, no payment hassle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="overline">
              <UtensilsCrossed size={16} />
              Featured
            </div>
            <h2>Popular Restaurants</h2>
            <p>Handpicked restaurants loved by our community</p>
          </div>
          <div className="restaurant-grid">
            {filteredRestaurants.map(restaurant => (
              <Link to={`/menu/${restaurant.id}`} key={restaurant.id} className="card" style={{ textDecoration: 'none' }}>
                <img src={restaurant.image_url} alt={restaurant.name} className="card-image" />
                <div className="card-body">
                  <h3 className="card-title">{restaurant.name}</h3>
                  <p className="card-subtitle">{restaurant.cuisine_type} • {restaurant.address}</p>
                  <div className="card-meta">
                    <span className="rating">
                      <Star size={14} fill="#f59e0b" />
                      {restaurant.rating}
                    </span>
                    <span className={`veg-badge ${restaurant.is_veg ? 'veg' : 'non-veg'}`}>
                      {restaurant.is_veg ? '● Veg' : '● Non-Veg'}
                    </span>
                    <span>
                      <Clock size={12} style={{ marginRight: 4 }} />
                      {restaurant.avg_prep_time} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/restaurants" className="btn btn-outline">
              View All Restaurants
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
