import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { getPosts, deletePost } from '../data/posts'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  const handleDelete = (id) => {
    deletePost(id)
    setPosts(getPosts())
  }

  return (
    <div className="page-home">
      <div className="garden-intro">
        <div className="intro-ornament">❧</div>
        <p className="intro-text">
          Welcome, wanderer. This is a garden of thoughts — some freshly planted,
          some well-tended, some a little overgrown. Have a look around.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="empty-garden">
          <p>The garden is empty. <Link to="/write">Plant the first seed →</Link></p>
        </div>
      ) : (
        <div className="post-feed">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
