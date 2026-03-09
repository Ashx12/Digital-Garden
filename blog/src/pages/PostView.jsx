import { useParams, Link, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { formatDate, getMoodEmoji, renderMarkdown, MOODS } from "../utils/format";

export default function PostView() {
  const { id } = useParams();
  const { posts, deletePost } = usePosts();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="app-layout">
        <div style={{ gridColumn: "1/-1" }} className="main-content">
          <div className="empty-state">
            <div className="empty-icon">🍂</div>
            <h3>Post not found</h3>
            <p>This note may have been deleted or moved.</p>
            <br />
            <Link to="/" className="btn btn-ghost">← Back home</Link>
          </div>
        </div>
      </div>
    );
  }

  const moodLabel = MOODS.find((m) => m.value === post.mood)?.label;

  const handleDelete = () => {
    if (window.confirm("Delete this post? This cannot be undone.")) {
      deletePost(post.id);
      navigate("/");
    }
  };

  const html = `<p>${renderMarkdown(post.content)}</p>`;

  return (
    <div style={{ padding: "40px 48px", maxWidth: "780px", margin: "0 auto" }} className="fade-in">
      <Link to="/" className="back-link">← All posts</Link>

      <article className="post-full">
        <h1 className="post-full-title">{post.title}</h1>

        <div className="post-full-meta">
          {post.mood && (
            <span>
              {getMoodEmoji(post.mood)} {moodLabel}
            </span>
          )}
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          {post.tags?.length > 0 && (
            <>
              <span>·</span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {post.tags.map((t) => (
                  <Link key={t} to="/" className="tag">{t}</Link>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <hr className="divider" />

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            Edit post
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}
