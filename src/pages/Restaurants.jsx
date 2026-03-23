import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, SlidersHorizontal } from 'lucide-react'
import { DEMO_RESTAURANTS } from '../data/demoData'

export default function Restaurants() {
  const [search, setSearch] = useState('')
  const [vegFilter, setVegFilter] = useState('all') // all, veg, non-veg
  const [priceSort, setPriceSort] = useState('default')

  let filtered = DEMO_RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine_type.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase())
    const matchesVeg = vegFilter === 'all' || (vegFilter === 'veg' && r.is_veg) || (vegFilter === 'non-veg' && !r.is_veg)
    return matchesSearch && matchesVeg
  })

  if (priceSort === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left' }}>
          <h2>All Restaurants</h2>
          <p>Discover and pre-order from the best restaurants near you</p>
        </div>

        {/* Search & Filters */}
        <div style={{ marginBottom: 24 }}>
          <div className="search-bar" style={{ maxWidth: '100%', marginBottom: 16 }}>
            <Search size={20} color="#8e99a4" />
            <input
              type="text"
              placeholder="Search by name, cuisine, or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filters-bar">
            <SlidersHorizontal size={16} color="#8e99a4" />
            <button
              className={`filter-chip ${vegFilter === 'all' ? 'active' : ''}`}
              onClick={() => setVegFilter('all')}
            >All</button>
            <button
              className={`filter-chip ${vegFilter === 'veg' ? 'active' : ''}`}
              onClick={() => setVegFilter('veg')}
            >🟢 Veg Only</button>
            <button
              className={`filter-chip ${vegFilter === 'non-veg' ? 'active' : ''}`}
              onClick={() => setVegFilter('non-veg')}
            >🔴 Non-Veg</button>
            <select
              className="filter-select"
              value={priceSort}
              onChange={e => setPriceSort(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No restaurants found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filtered.map(restaurant => (
              <Link to={`/menu/${restaurant.id}`} key={restaurant.id} className="card" style={{ textDecoration: 'none' }}>
                <img src={restaurant.image_url} alt={restaurant.name} className="card-image" />
                <div className="card-body">
                  <h3 className="card-title">{restaurant.name}</h3>
                  <p className="card-subtitle">{restaurant.cuisine_type} • {restaurant.address}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                    {restaurant.description}
                  </p>
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
        )}
      </div>
    </div>
  )
}
