import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPost, deletePost } from '../data/posts'

export default function PostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="page-not-found">
        <p>This part of the garden doesn't exist (yet).</p>
        <Link to="/">← Back to the garden</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${post.title}"?`)) {
      deletePost(post.id)
      navigate('/')
    }
  }

  return (
    <article className="page-post">
      <header className="post-header">
        <div className="post-header-meta">
          <time className="post-date">{formatDate(post.date)}</time>
          {post.tags?.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        <h1 className="post-title">{post.title}</h1>
        {post.excerpt && (
          <p className="post-subtitle">{post.excerpt}</p>
        )}
      </header>

      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />

      <footer className="post-footer">
        <div className="post-footer-rule">· · ·</div>
        <div className="post-footer-links">
          <Link to="/" className="back-link">← Back to garden</Link>
          <div className="post-footer-actions">
            <Link to={`/write/${post.id}`} className="action-link edit-link">edit</Link>
            <button onClick={handleDelete} className="action-link delete-link">delete</button>
          </div>
        </div>
      </footer>
    </article>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Minimal markdown renderer (no deps)
function renderMarkdown(text) {
  if (!text) return ''
  return text
    // Escape HTML first
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Paragraphs (double newline)
    .split(/\n\n+/)
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol')) return block
      // Unordered list
      if (/^- /m.test(block)) {
        const items = block.split('\n').map(l => l.replace(/^- /, '')).filter(Boolean)
        return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>'
      }
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}
