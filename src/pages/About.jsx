import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="page-about">
      <div className="about-card">
        <div className="about-avatar">
          <div className="avatar-placeholder">✿</div>
        </div>
        <div className="about-content">
          <h1>Hello, I'm the gardener.</h1>
          <p>
            This is my digital garden — a personal space on the web where I tend to ideas,
            write things down, and figure out what I think by writing about it.
          </p>
          <p>
            Unlike a polished blog, a garden is always in progress. Some posts are seeds
            (early, rough thoughts). Some are saplings (growing, being revised). A few
            might be fully grown (as finished as ideas get).
          </p>
          <p>
            You are welcome here. Wander wherever you like.
          </p>

          <div className="about-links">
            <Link to="/" className="about-link">Browse the garden →</Link>
            <Link to="/write" className="about-link">Start a new post →</Link>
          </div>
        </div>
      </div>

      <div className="about-meta">
        <div className="meta-box">
          <h3>About this site</h3>
          <ul>
            <li>Built with React &amp; Vite</li>
            <li>Posts saved in your browser (localStorage)</li>
            <li>No accounts, no tracking, no ads</li>
            <li>Indie web — yours to own</li>
          </ul>
        </div>
        <div className="meta-box">
          <h3>How to post</h3>
          <ul>
            <li>Click <Link to="/write">+ New Post</Link> in the nav</li>
            <li>Write in plain text or Markdown</li>
            <li>Hit <em>Publish Post</em></li>
            <li>Edit or delete any time</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
