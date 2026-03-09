import { Link, useNavigate } from "react-router-dom";
import { formatRelative, getMoodEmoji } from "../utils/format";

function excerpt(text, len = 200) {
  const plain = text.replace(/\*\*/g, "").replace(/\*/g, "");
  return plain.length > len ? plain.slice(0, len).trim() + "…" : plain;
}

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate();

  return (
    <article className="post-card fade-in">
      <div className="post-meta">
        {post.mood && (
          <span className="post-mood" title={post.mood}>
            {getMoodEmoji(post.mood)}
          </span>
        )}
        <span className="post-date">{formatRelative(post.date)}</span>
        {post.tags?.length > 0 && (
          <>
            <span className="post-meta-sep">·</span>
            <div className="post-tags-inline">
              {post.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </>
        )}
      </div>

      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>

      <p className="post-excerpt">{excerpt(post.content)}</p>

      <div className="post-footer">
        <Link to={`/post/${post.id}`} className="read-more">
          Read more →
        </Link>
        <div className="post-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm("Delete this post?")) onDelete(post.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
