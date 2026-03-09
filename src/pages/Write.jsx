import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPosts, savePost, slugify } from '../data/posts'

export default function Write() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (id) {
      const post = getPosts().find(p => p.id === id)
      if (post) {
        setTitle(post.title)
        setExcerpt(post.excerpt || '')
        setContent(post.content)
        setTags((post.tags || []).join(', '))
      }
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const post = {
      id: id || String(Date.now()),
      title: title.trim(),
      slug: id
        ? getPosts().find(p => p.id === id)?.slug || slugify(title.trim())
        : slugify(title.trim()),
      date: id
        ? getPosts().find(p => p.id === id)?.date || todayStr()
        : todayStr(),
      excerpt: excerpt.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      content: content.trim(),
    }

    savePost(post)
    setSaved(true)
    setTimeout(() => navigate(`/post/${post.slug}`), 600)
  }

  return (
    <div className="page-write">
      <div className="write-header">
        <h1 className="write-title">{id ? 'Edit Post' : 'New Post'}</h1>
        <p className="write-subtitle">Write in Markdown. Plain text is also fine.</p>
      </div>

      <form onSubmit={handleSubmit} className="write-form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give it a name..."
            required
          />
        </div>

        <div className="field">
          <label htmlFor="excerpt">Excerpt <span className="optional">(optional)</span></label>
          <input
            id="excerpt"
            type="text"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="A short teaser..."
          />
        </div>

        <div className="field">
          <label htmlFor="tags">Tags <span className="optional">(comma separated)</span></label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. reading, ideas, tech"
          />
        </div>

        <div className="field field-content">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`Start writing...\n\n## You can use Markdown\n\nParagraphs, **bold**, *italic*, [links](url), lists...`}
            required
            rows={20}
          />
        </div>

        <div className="write-actions">
          <button type="submit" className={`publish-btn ${saved ? 'saved' : ''}`} disabled={saved}>
            {saved ? '✓ Saved!' : id ? 'Update Post' : 'Publish Post'}
          </button>
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}
