import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, updateQuantity, removeItem, totalAmount, totalItems } = useCart()
  const navigate = useNavigate()

  if (cart.items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Browse restaurants and add some delicious food to your cart</p>
            <Link to="/restaurants" className="btn btn-primary" style={{ marginTop: 8 }}>
              <ShoppingBag size={16} /> Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container cart-page">
        <h1 style={{ marginBottom: 8 }}>Your Cart</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          Ordering from <strong>{cart.restaurantName}</strong> • {totalItems} item{totalItems !== 1 ? 's' : ''}
        </p>

        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price} each</div>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              <div style={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>
                ₹{item.price * item.quantity}
              </div>
              <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="cart-summary-row">
            <span>Taxes (5%)</span>
            <span>₹{Math.round(totalAmount * 0.05)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Platform Fee</span>
            <span>₹10</span>
          </div>
          <div className="cart-summary-row total">
            <span>Total</span>
            <span>₹{totalAmount + Math.round(totalAmount * 0.05) + 10}</span>
          </div>
          <button
            className="btn btn-accent btn-lg"
            style={{ width: '100%', marginTop: 20 }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
