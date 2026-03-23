import { useParams, Link } from 'react-router-dom'
import { Download, Share2, ArrowLeft, CheckCircle } from 'lucide-react'
import { useRef } from 'react'

export default function Invoice() {
  const { orderId } = useParams()
  const invoiceRef = useRef()

  // Load order from localStorage
  const orderData = localStorage.getItem(`quickdine_order_${orderId}`)
  const order = orderData ? JSON.parse(orderData) : null

  const handleDownloadPDF = async () => {
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = invoiceRef.current
      html2pdf()
        .set({
          margin: 0.5,
          filename: `QuickDine_Invoice_${orderId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
    } catch (err) {
      console.error('PDF generation error:', err)
    }
  }

  const handleShare = () => {
    const msg = encodeURIComponent(
      `🧾 QuickDine Pro Invoice\n\n` +
      `Order ID: ${order?.id}\n` +
      `Restaurant: ${order?.restaurant_name}\n` +
      `Total: ₹${order?.total_amount}\n` +
      `Date: ${new Date(order?.created_at).toLocaleDateString()}`
    )
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  if (!order) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🧾</div>
            <h3>Invoice not found</h3>
            <p>This invoice may have expired or doesn&apos;t exist</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>Go Home</Link>
          </div>
        </div>
      </div>
    )
  }

  const orderDate = new Date(order.created_at)

  return (
    <div className="page">
      <div className="container invoice-page">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', marginBottom: 20, fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Success Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
          borderRadius: 16,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32
        }}>
          <CheckCircle size={32} color="#059669" />
          <div>
            <h3 style={{ color: '#065f46', marginBottom: 4 }}>Order Placed Successfully!</h3>
            <p style={{ color: '#047857', fontSize: '0.9rem' }}>
              Your table is booked for {order.time_slot}. Food will be ready when you arrive.
            </p>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="invoice-container" ref={invoiceRef}>
          <div className="invoice-header">
            <div className="invoice-brand">
              <h1>🍽️ QuickDine Pro</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tax Invoice</p>
            </div>
            <div className="invoice-meta">
              <strong>Invoice #{order.id}</strong>
              <p>{orderDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p>{orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <div className="invoice-details">
            <div className="invoice-detail-group">
              <h4>Customer Details</h4>
              <p><strong>{order.customer_name}</strong></p>
              <p>{order.customer_phone}</p>
            </div>
            <div className="invoice-detail-group">
              <h4>Restaurant</h4>
              <p><strong>{order.restaurant_name}</strong></p>
              <p>Time Slot: {order.time_slot}</p>
              <p>Guests: {order.guests}</p>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-totals">
            <div className="row">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="row">
              <span>Tax (5%)</span>
              <span>₹{order.tax}</span>
            </div>
            <div className="row">
              <span>Platform Fee</span>
              <span>₹{order.platform_fee}</span>
            </div>
            <div className="row grand">
              <span>Grand Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>

          <div className="invoice-footer">
            <p>Thank you for dining with QuickDine Pro!</p>
            <p>Payment Status: <strong style={{ color: '#059669' }}>✓ Paid</strong></p>
          </div>
        </div>

        {/* Actions */}
        <div className="invoice-actions">
          <button className="btn btn-primary" onClick={handleDownloadPDF}>
            <Download size={16} /> Download PDF
          </button>
          <button className="btn btn-outline" onClick={handleShare}>
            <Share2 size={16} /> Share via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
