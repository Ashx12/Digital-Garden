import { usePosts } from "../hooks/usePosts";
import { formatDate } from "../utils/format";

export default function Sidebar({ activeTag, onTagClick }) {
  const { posts } = usePosts();

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))].sort();
  const firstPost = posts.length ? posts[posts.length - 1] : null;

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-about">
          <p>
            A slow corner of the web. Thoughts, links, and notes — written for
            myself, shared in case it helps someone else.
          </p>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="sidebar-section">
          <div className="sidebar-label">Topics</div>
          <div className="tag-cloud">
            {activeTag && (
              <span
                className="tag active"
                onClick={() => onTagClick && onTagClick(null)}
              >
                ✕ {activeTag}
              </span>
            )}
            {allTags
              .filter((t) => t !== activeTag)
              .map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <div className="sidebar-label">Stats</div>
        <div className="sidebar-stats">
          <div className="stat-row">
            <span className="stat-label">Posts</span>
            <span className="stat-value">{posts.length}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Topics</span>
            <span className="stat-value">{allTags.length}</span>
          </div>
          {firstPost && (
            <div className="stat-row">
              <span className="stat-label">Since</span>
              <span className="stat-value">
                {new Date(firstPost.date).getFullYear()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="webring-banner">
          🔗 Part of the indie web.<br />
          <a href="https://indieweb.org" target="_blank" rel="noopener noreferrer">
            What's IndieWeb?
          </a>
        </div>
      </div>
    </aside>
  );
}
