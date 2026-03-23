import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Users, ShoppingBag, TrendingUp, Plus, Trash2, X, Save, LogOut, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { DEMO_RESTAURANTS, DEMO_ORDERS } from '../data/demoData'

export default function SuperAdmin() {
  const { logout } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [restaurants, setRestaurants] = useState(DEMO_RESTAURANTS)
  const [activeSection, setActiveSection] = useState('restaurants')
  const [showAddRestaurant, setShowAddRestaurant] = useState(false)
  const [showAddAdmin, setShowAddAdmin] = useState(false)

  const [restaurantForm, setRestaurantForm] = useState({
    name: '', description: '', address: '', city: '', cuisine_type: '', is_veg: false,
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
  })

  const [adminForm, setAdminForm] = useState({
    full_name: '', email: '', password: '', restaurant_id: ''
  })

  const [admins, setAdmins] = useState([
    { id: 'ra1', full_name: 'Rajesh Kumar', email: 'spicegarden@quickdine.pro', restaurant_id: 'r1', restaurant_name: 'Spice Garden' }
  ])

  const totalOrders = DEMO_ORDERS.length
  const totalRevenue = DEMO_ORDERS.filter(o => o.status !== 'rejected').reduce((s, o) => s + o.total_amount, 0)

  const handleAddRestaurant = () => {
    if (!restaurantForm.name || !restaurantForm.address || !restaurantForm.city) {
      addToast('Please fill required fields', 'error')
      return
    }
    const newR = {
      id: 'r_' + Date.now(),
      ...restaurantForm,
      rating: 4.0,
      is_active: true,
      avg_prep_time: 25,
      latitude: 12.97,
      longitude: 77.60
    }
    setRestaurants(prev => [...prev, newR])
    setShowAddRestaurant(false)
    setRestaurantForm({ name: '', description: '', address: '', city: '', cuisine_type: '', is_veg: false, image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop' })
    addToast('Restaurant added successfully')
  }

  const handleRemoveRestaurant = (id) => {
    setRestaurants(prev => prev.filter(r => r.id !== id))
    addToast('Restaurant removed')
  }

  const handleAddAdmin = () => {
    if (!adminForm.full_name || !adminForm.email || !adminForm.password || !adminForm.restaurant_id) {
      addToast('Please fill all fields', 'error')
      return
    }
    const rest = restaurants.find(r => r.id === adminForm.restaurant_id)
    const newAdmin = {
      id: 'ra_' + Date.now(),
      ...adminForm,
      restaurant_name: rest?.name || 'Unknown'
    }
    setAdmins(prev => [...prev, newAdmin])
    setShowAddAdmin(false)
    setAdminForm({ full_name: '', email: '', password: '', restaurant_id: '' })
    addToast('Admin account created')
  }

  return (
    <div className="page">
      <div className="container super-admin-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1>Super Admin Panel</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Complete platform control</p>
          </div>
          <button className="btn btn-ghost" onClick={() => { logout(); navigate('/') }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><Building2 size={24} /></div>
            <div className="stat-value">{restaurants.length}</div>
            <div className="stat-label">Total Restaurants</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><Users size={24} /></div>
            <div className="stat-value">{admins.length}</div>
            <div className="stat-label">Restaurant Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><ShoppingBag size={24} /></div>
            <div className="stat-value">{totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><TrendingUp size={24} /></div>
            <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="orders-tabs" style={{ marginBottom: 24 }}>
          <button
            className={`orders-tab ${activeSection === 'restaurants' ? 'active' : ''}`}
            onClick={() => setActiveSection('restaurants')}
          >
            Restaurants
          </button>
          <button
            className={`orders-tab ${activeSection === 'admins' ? 'active' : ''}`}
            onClick={() => setActiveSection('admins')}
          >
            Admin Accounts
          </button>
        </div>

        {/* Restaurants Section */}
        {activeSection === 'restaurants' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2>Restaurants ({restaurants.length})</h2>
              <button className="btn btn-accent" onClick={() => setShowAddRestaurant(true)}>
                <Plus size={16} /> Add Restaurant
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Cuisine</th>
                  <th>City</th>
                  <th>Rating</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={r.image_url} alt={r.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{r.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.address}</div>
                        </div>
                      </div>
                    </td>
                    <td>{r.cuisine_type}</td>
                    <td>{r.city}</td>
                    <td>⭐ {r.rating}</td>
                    <td>
                      <span className={`veg-badge ${r.is_veg ? 'veg' : 'non-veg'}`}>
                        {r.is_veg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-icon btn-ghost" title="View" onClick={() => navigate(`/menu/${r.id}`)}>
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-icon btn-ghost" style={{ color: '#ef4444' }} title="Remove" onClick={() => handleRemoveRestaurant(r.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Admin Accounts Section */}
        {activeSection === 'admins' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2>Admin Accounts ({admins.length})</h2>
              <button className="btn btn-accent" onClick={() => setShowAddAdmin(true)}>
                <Plus size={16} /> Create Admin
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Restaurant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td style={{ fontWeight: 600 }}>{admin.full_name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.restaurant_name}</td>
                    <td>
                      <button className="btn btn-icon btn-ghost" style={{ color: '#ef4444' }}
                        onClick={() => {
                          setAdmins(prev => prev.filter(a => a.id !== admin.id))
                          addToast('Admin removed')
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Add Restaurant Modal */}
        {showAddRestaurant && (
          <div className="modal-overlay" onClick={() => setShowAddRestaurant(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Add Restaurant</h2>
                <button className="btn btn-icon btn-ghost" onClick={() => setShowAddRestaurant(false)}><X size={20} /></button>
              </div>
              <div className="form-group">
                <label>Restaurant Name *</label>
                <input className="form-input" placeholder="e.g., Taj Kitchen" value={restaurantForm.name}
                  onChange={e => setRestaurantForm({ ...restaurantForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-input" rows={2} placeholder="Brief description" value={restaurantForm.description}
                  onChange={e => setRestaurantForm({ ...restaurantForm, description: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Cuisine Type *</label>
                  <input className="form-input" placeholder="e.g., North Indian" value={restaurantForm.cuisine_type}
                    onChange={e => setRestaurantForm({ ...restaurantForm, cuisine_type: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input className="form-input" placeholder="Bangalore" value={restaurantForm.city}
                    onChange={e => setRestaurantForm({ ...restaurantForm, city: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input className="form-input" placeholder="Full address" value={restaurantForm.address}
                  onChange={e => setRestaurantForm({ ...restaurantForm, address: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="form-input" placeholder="https://..." value={restaurantForm.image_url}
                  onChange={e => setRestaurantForm({ ...restaurantForm, image_url: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={restaurantForm.is_veg} onChange={e => setRestaurantForm({ ...restaurantForm, is_veg: e.target.checked })} style={{ width: 18, height: 18 }} />
                  Pure Vegetarian
                </label>
              </div>
              <button className="btn btn-accent" style={{ width: '100%' }} onClick={handleAddRestaurant}>
                <Save size={16} /> Add Restaurant
              </button>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAddAdmin && (
          <div className="modal-overlay" onClick={() => setShowAddAdmin(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Create Admin Account</h2>
                <button className="btn btn-icon btn-ghost" onClick={() => setShowAddAdmin(false)}><X size={20} /></button>
              </div>
              <div className="form-group">
                <label>Full Name *</label>
                <input className="form-input" placeholder="Admin name" value={adminForm.full_name}
                  onChange={e => setAdminForm({ ...adminForm, full_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input className="form-input" type="email" placeholder="admin@restaurant.com" value={adminForm.email}
                  onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input className="form-input" type="password" placeholder="Min 6 characters" value={adminForm.password}
                  onChange={e => setAdminForm({ ...adminForm, password: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Assign Restaurant *</label>
                <select className="form-input" value={adminForm.restaurant_id}
                  onChange={e => setAdminForm({ ...adminForm, restaurant_id: e.target.value })}>
                  <option value="">Select restaurant</option>
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <button className="btn btn-accent" style={{ width: '100%' }} onClick={handleAddAdmin}>
                <Save size={16} /> Create Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
