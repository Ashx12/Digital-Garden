import { Link } from 'react-router-dom'

export default function PostCard({ post, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Delete "${post.title}"?`)) {
      onDelete(post.id)
    }
  }

  return (
    <article className="post-card">
      <div className="post-card-meta">
        <time className="post-date">{formatDate(post.date)}</time>
        {post.tags?.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
      <h2 className="post-card-title">
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.excerpt && (
        <p className="post-card-excerpt">{post.excerpt}</p>
      )}
      <div className="post-card-footer">
        <Link to={`/post/${post.slug}`} className="read-more">
          Read on →
        </Link>
        <div className="post-actions">
          <Link to={`/write/${post.id}`} className="action-link edit-link">
            edit
          </Link>
          <button onClick={handleDelete} className="action-link delete-link">
            delete
          </button>
        </div>
      </div>
    </article>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
