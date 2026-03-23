import { Link } from 'react-router-dom'
import { UtensilsCrossed, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <UtensilsCrossed size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              QuickDine Pro
            </h3>
            <p>
              Book before you reach. Pre-order food, book tables, and enjoy a seamless dining experience at your favorite restaurants.
            </p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="footer-column">
            <h4>For Restaurants</h4>
            <Link to="/login">Restaurant Login</Link>
            <a href="#">Partner With Us</a>
            <a href="#">Restaurant Dashboard</a>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="#"><Mail size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />hello@quickdine.pro</a>
            <a href="#"><Phone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />+91 98765 43210</a>
            <a href="#"><MapPin size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Bangalore, India</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} QuickDine Pro. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
