import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, LogOut, CheckCircle, XCircle, Clock, ShoppingBag, TrendingUp, Menu as MenuIcon, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { DEMO_ORDERS, DEMO_RESTAURANTS } from '../data/demoData'

export default function AdminDashboard() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending')
  const [orders, setOrders] = useState(DEMO_ORDERS)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const restaurant = DEMO_RESTAURANTS.find(r => r.id === profile?.restaurant_id)
  const myOrders = orders.filter(o => o.restaurant_id === profile?.restaurant_id)

  const filteredOrders = myOrders.filter(o => o.status === activeTab)

  const stats = {
    total: myOrders.length,
    pending: myOrders.filter(o => o.status === 'pending').length,
    accepted: myOrders.filter(o => o.status === 'accepted').length,
    revenue: myOrders.filter(o => o.status !== 'rejected').reduce((s, o) => s + o.total_amount, 0)
  }

  const handleOrderAction = (orderId, newStatus) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="page" style={{ paddingTop: 80 }}>
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <h3>{restaurant?.name || 'Dashboard'}</h3>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', color: 'white' }}>
          {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? '' : ''}`}>
          <div className="admin-sidebar-header">
            <h3>{restaurant?.name || 'Restaurant'}</h3>
            <p>Admin Dashboard</p>
          </div>
          <nav className="admin-nav">
            <button className="admin-nav-item active" onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard size={18} /> Orders
            </button>
            <button className="admin-nav-item" onClick={() => { navigate('/admin/menu'); setSidebarOpen(false) }}>
              <UtensilsCrossed size={18} /> Menu Management
            </button>
            <button className="admin-nav-item" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          <div className="admin-header">
            <h1>Order Management</h1>
            <p>Manage incoming orders for {restaurant?.name}</p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green"><ShoppingBag size={24} /></div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange"><Clock size={24} /></div>
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue"><CheckCircle size={24} /></div>
              <div className="stat-value">{stats.accepted}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><TrendingUp size={24} /></div>
              <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
              <div className="stat-label">Revenue</div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="orders-table-container">
            <div className="orders-tabs">
              {['pending', 'accepted', 'rejected', 'completed'].map(tab => (
                <button
                  key={tab}
                  className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'pending' && stats.pending > 0 && (
                    <span style={{ marginLeft: 6, background: '#f59e0b', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                      {stats.pending}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="empty-state" style={{ padding: '40px 20px' }}>
                <h3>No {activeTab} orders</h3>
                <p>Orders will appear here when customers place them</p>
              </div>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Time Slot</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{order.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.customer_name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customer_phone}</div>
                      </td>
                      <td>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ fontSize: '0.85rem' }}>
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td>{order.time_slot}</td>
                      <td style={{ fontWeight: 700 }}>₹{order.total_amount}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {order.status === 'pending' && (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              className="btn btn-accent btn-sm"
                              onClick={() => handleOrderAction(order.id, 'accepted')}
                              style={{ padding: '6px 14px' }}
                            >
                              <CheckCircle size={14} /> Accept
                            </button>
                            <button
                              className="btn btn-sm"
                              style={{ padding: '6px 14px', background: '#fef2f2', color: '#dc2626' }}
                              onClick={() => handleOrderAction(order.id, 'rejected')}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            className="btn btn-sm btn-primary"
                            style={{ padding: '6px 14px' }}
                            onClick={() => handleOrderAction(order.id, 'completed')}
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
