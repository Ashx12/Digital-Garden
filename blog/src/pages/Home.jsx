import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const { posts, deletePost } = usePosts();
  const [activeTag, setActiveTag] = useState(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts;

  return (
    <div className="app-layout">
      <Sidebar activeTag={activeTag} onTagClick={setActiveTag} />
      <main className="main-content">
        <div className="page-header">
          <h1>
            {activeTag ? `#${activeTag}` : "Latest Notes"}
          </h1>
          <p>
            {activeTag
              ? `${filtered.length} post${filtered.length !== 1 ? "s" : ""} tagged "${activeTag}"`
              : "Thoughts, links, and updates from the garden."}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌱</div>
            <h3>Nothing here yet</h3>
            <p>
              {activeTag
                ? `No posts tagged "${activeTag}".`
                : "Write your first post to get started."}
            </p>
          </div>
        ) : (
          <div className="posts-list">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onDelete={deletePost} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
