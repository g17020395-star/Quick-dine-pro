import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, LogOut, Plus, Edit2, Trash2, X, Save, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { DEMO_MENU_ITEMS, DEMO_RESTAURANTS } from '../data/demoData'

export default function AdminMenu() {
  const { profile, logout } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const restaurant = DEMO_RESTAURANTS.find(r => r.id === profile?.restaurant_id)
  const initialItems = DEMO_MENU_ITEMS[profile?.restaurant_id] || []
  const [menuItems, setMenuItems] = useState(initialItems)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', is_veg: true, image_url: '', is_available: true
  })

  const handleOpenAdd = () => {
    setEditingItem(null)
    setForm({ name: '', description: '', price: '', category: '', is_veg: true, image_url: '', is_available: true })
    setShowModal(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      is_veg: item.is_veg,
      image_url: item.image_url,
      is_available: item.is_available
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price || !form.category) {
      addToast('Please fill in required fields', 'error')
      return
    }

    if (editingItem) {
      setMenuItems(prev => prev.map(i =>
        i.id === editingItem.id
          ? { ...i, ...form, price: Number(form.price) }
          : i
      ))
      addToast('Menu item updated')
    } else {
      const newItem = {
        id: 'm_' + Date.now(),
        restaurant_id: profile?.restaurant_id,
        ...form,
        price: Number(form.price)
      }
      setMenuItems(prev => [...prev, newItem])
      addToast('Menu item added')
    }
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setMenuItems(prev => prev.filter(i => i.id !== id))
    addToast('Menu item removed')
  }

  const toggleAvailability = (id) => {
    setMenuItems(prev => prev.map(i =>
      i.id === id ? { ...i, is_available: !i.is_available } : i
    ))
  }

  return (
    <div className="page" style={{ paddingTop: 80 }}>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h3>{restaurant?.name || 'Restaurant'}</h3>
            <p>Menu Management</p>
          </div>
          <nav className="admin-nav">
            <button className="admin-nav-item" onClick={() => navigate('/admin/dashboard')}>
              <LayoutDashboard size={18} /> Orders
            </button>
            <button className="admin-nav-item active">
              <UtensilsCrossed size={18} /> Menu Management
            </button>
            <button className="admin-nav-item" onClick={() => { logout(); navigate('/') }}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1>Menu Management</h1>
              <p>Add, edit, or remove menu items • {menuItems.length} items</p>
            </div>
            <button className="btn btn-accent" onClick={handleOpenAdd}>
              <Plus size={16} /> Add Item
            </button>
          </div>

          {/* Menu Items List */}
          <div className="menu-management">
            {menuItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3>No menu items yet</h3>
                <p>Add your first menu item to get started</p>
                <button className="btn btn-accent" style={{ marginTop: 8 }} onClick={handleOpenAdd}>
                  <Plus size={16} /> Add Item
                </button>
              </div>
            ) : (
              menuItems.map(item => (
                <div key={item.id} className="menu-item-row" style={{ opacity: item.is_available ? 1 : 0.5 }}>
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-info">
                    <h4>
                      {item.name}
                      <span className={`veg-badge ${item.is_veg ? 'veg' : 'non-veg'}`} style={{ marginLeft: 8, fontSize: '0.7rem' }}>
                        {item.is_veg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </h4>
                    <p>{item.category} • ₹{item.price}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="btn btn-icon btn-ghost"
                      title={item.is_available ? 'Mark unavailable' : 'Mark available'}
                      onClick={() => toggleAvailability(item.id)}
                    >
                      {item.is_available ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button className="btn btn-icon btn-ghost" onClick={() => handleOpenEdit(item)}>
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn btn-icon btn-ghost"
                      style={{ color: '#ef4444' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0 }}>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
              <button className="btn btn-icon btn-ghost" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-group">
              <label>Item Name *</label>
              <input
                className="form-input"
                placeholder="e.g., Chicken Biriyani"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Describe the dish"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="280"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <input
                  className="form-input"
                  placeholder="e.g., Biriyani, Starters"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                className="form-input"
                placeholder="https://..."
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.is_veg}
                  onChange={e => setForm({ ...form, is_veg: e.target.checked })}
                  style={{ width: 18, height: 18 }}
                />
                Vegetarian
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button className="btn btn-accent" style={{ flex: 1 }} onClick={handleSave}>
                <Save size={16} /> {editingItem ? 'Update' : 'Add Item'}
              </button>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
