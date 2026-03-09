export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-rule">
        <span>· · ·</span>
      </div>
      <div className="footer-inner">
        <div className="footer-badges">
          <span className="badge">Made with ♥</span>
          <span className="badge">Est. {year}</span>
          <span className="badge">No tracking</span>
          <span className="badge">Indie Web</span>
        </div>
        <p className="footer-copy">
          This is a personal site. Words are my own. Garden is always open.
        </p>
        <p className="footer-small">
          &copy; {year} &mdash; built with React &amp; good intentions
        </p>
      </div>
    </footer>
  )
}
