import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, QrCode, CheckCircle, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const TIME_SLOTS = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM'
]

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useCart()
  const { profile } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [timeSlot, setTimeSlot] = useState('')
  const [guests, setGuests] = useState(2)
  const [specialReq, setSpecialReq] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)

  const tax = Math.round(totalAmount * 0.05)
  const platformFee = 10
  const grandTotal = totalAmount + tax + platformFee

  const handlePlaceOrder = () => {
    if (!timeSlot) {
      addToast('Please select a time slot', 'error')
      return
    }
    if (!paymentConfirmed) {
      addToast('Please confirm your payment', 'error')
      return
    }

    setProcessing(true)

    // Simulate order placement
    const orderId = 'ORD_' + Date.now()

    // Store order for invoice
    const order = {
      id: orderId,
      customer_name: profile?.full_name || 'Guest',
      customer_phone: profile?.phone || '',
      restaurant_id: cart.restaurantId,
      restaurant_name: cart.restaurantName,
      items: cart.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total_amount: grandTotal,
      subtotal: totalAmount,
      tax,
      platform_fee: platformFee,
      time_slot: timeSlot,
      guests,
      special_requests: specialReq,
      status: 'pending',
      payment_status: 'paid',
      created_at: new Date().toISOString()
    }

    localStorage.setItem(`quickdine_order_${orderId}`, JSON.stringify(order))

    setTimeout(() => {
      clearCart()
      addToast('Order placed successfully!')

      // WhatsApp deep link
      const phone = "918608178951"; // 91 + un number

const itemsList = cart.items.map(item => 
  `🍽 ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`
).join('\n')

const whatsappMsg = encodeURIComponent(
  `🔥 Hot Meals Order Confirmed!\n\n` +
  `🆔 Order ID: ${orderId}\n` +
  `🏨 Restaurant: ${cart.restaurantName}\n\n` +
  `📋 Items:\n${itemsList}\n\n` +
  `👥 Guests: ${guests}\n` +
  `⏰ Time: ${timeSlot}\n` +
  `💰 Total: ₹${grandTotal}\n\n` +
  `✅ Your food will be ready when you arrive! 🍽`
)

window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, '_blank');
      navigate(`/invoice/${orderId}`)
    }, 1500)
  }

  if (cart.items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ marginBottom: 32 }}>Checkout</h1>

        <div className="checkout-layout">
          <div>
            {/* Time Slot Selection */}
            <div className="checkout-section">
              <h2><Clock size={20} /> Select Time Slot</h2>
              <div className="time-slots">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    className={`time-slot ${timeSlot === slot ? 'selected' : ''}`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Booking */}
            <div className="checkout-section">
              <h2><Users size={20} /> Table Booking</h2>
              <div className="form-group">
                <label>Number of Guests</label>
                <select
                  className="form-input"
                  value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Special Requests (Optional)</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Any special requirements? (e.g., window seat, high chair)"
                  value={specialReq}
                  onChange={e => setSpecialReq(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h2><QrCode size={20} /> Payment via UPI</h2>
              <div className="qr-payment">
                <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                  Scan the QR code below to pay <strong>₹{grandTotal}</strong>
                </p>
                <div className="qr-code">
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <QrCode size={120} color="var(--primary)" />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                      UPI QR Code
                    </p>
                  </div>
                </div>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=gopi@upi&pn=HotMeals&am=${grandTotal}&cu=INR`} />
                upi://pay?pa=g17020395-1@okicici&pn=HotMeals&am=AMOUNT&cu=INR
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '16px 0' }}>
                  Pay to: <strong>g17020395-1@okicici</strong>
                </p>
                <button
                  className={`btn ${paymentConfirmed ? 'btn-accent' : 'btn-outline'} btn-lg`}
                  onClick={() => setPaymentConfirmed(!paymentConfirmed)}
                  style={{ width: '100%' }}
                >
                  {paymentConfirmed ? (
                    <><CheckCircle size={18} /> Payment Confirmed</>
                  ) : (
                    'I Have Paid'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="checkout-section" style={{ position: 'sticky', top: 100 }}>
              <h2>Order Summary</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                {cart.restaurantName}
              </p>
              {cart.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)' }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="cart-summary-row" style={{ marginTop: 12 }}>
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="cart-summary-row">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="cart-summary-row">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {timeSlot && (
                <div style={{ background: 'var(--bg-soft)', borderRadius: 8, padding: 12, marginTop: 16, fontSize: '0.85rem' }}>
                  <p><strong>Time:</strong> {timeSlot}</p>
                  <p><strong>Guests:</strong> {guests}</p>
                </div>
              )}

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: 20 }}
                onClick={handlePlaceOrder}
                disabled={processing}
              >
                {processing ? 'Placing Order...' : 'Place Order'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <MessageCircle size={12} />
                  WhatsApp confirmation will be sent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
