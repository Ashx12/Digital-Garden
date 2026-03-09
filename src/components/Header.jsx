import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Garden' },
    { to: '/about', label: 'About' },
    { to: '/write', label: '+ New Post' },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="site-title-block">
          <Link to="/" className="site-title">
            <span className="title-deco">✦</span>
            Digital Garden
            <span className="title-deco">✦</span>
          </Link>
          <p className="site-tagline">a place for growing ideas</p>
        </div>
        <nav className="site-nav">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header-rule">
        <span>· · ·</span>
      </div>
    </header>
  )
}
