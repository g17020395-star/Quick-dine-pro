import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Page Not Found</h3>
          <p>The page you&apos;re looking for doesn&apos;t exist or has been moved</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>
            <Home size={16} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
