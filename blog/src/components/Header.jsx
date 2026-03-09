import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <Link to="/" className="site-title">
        <span className="logo-icon">🌱</span>
        Digital Garden
      </Link>
      <nav className="header-nav">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/write")}
        >
          ✏️ New Post
        </button>
      </nav>
    </header>
  );
}
