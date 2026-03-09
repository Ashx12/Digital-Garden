import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { MOODS, renderMarkdown } from "../utils/format";

export default function WritePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, addPost, updatePost } = usePosts();

  const editing = id ? posts.find((p) => p.id === id) : null;

  const [title, setTitle] = useState(editing?.title ?? "");
  const [content, setContent] = useState(editing?.content ?? "");
  const [tags, setTags] = useState(editing?.tags?.join(", ") ?? "");
  const [mood, setMood] = useState(editing?.mood ?? "");
  const [preview, setPreview] = useState(false);

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const tagList = tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    if (editing) {
      updatePost(editing.id, { title, content, tags: tagList, mood });
      navigate(`/post/${editing.id}`);
    } else {
      const newPost = addPost({ title, content, tags: tagList, mood });
      navigate(`/post/${newPost.id}`);
    }
  };

  return (
    <div style={{ padding: "40px 48px", maxWidth: "780px", margin: "0 auto" }} className="fade-in">
      <Link to="/" className="back-link">← Back</Link>

      <div className="write-form-page">
        <h1 className="write-form-title">
          {editing ? "✏️ Edit post" : "✏️ Write a new post"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Mood</label>
            <div className="mood-picker">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className={`mood-option ${mood === m.value ? "selected" : ""}`}
                  onClick={() => setMood(mood === m.value ? "" : m.value)}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="form-label" style={{ margin: 0 }}>Content</label>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setPreview(!preview)}
              >
                {preview ? "✏️ Edit" : "👁 Preview"}
              </button>
            </div>

            {preview ? (
              <div
                className="preview-box post-body"
                dangerouslySetInnerHTML={{
                  __html: `<p>${renderMarkdown(content || "_Nothing written yet..._")}</p>`,
                }}
              />
            ) : (
              <textarea
                className="form-textarea"
                placeholder={`Write your post here...\n\nTips:\n**bold** for bold\n*italic* for italic\n[link text](url) for links`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Tags</label>
            <input
              className="form-input"
              type="text"
              placeholder="indieweb, writing, links"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <div className="tags-input-hint">Separate tags with commas</div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid}
              style={{ opacity: isValid ? 1 : 0.5 }}
            >
              {editing ? "Save changes" : "Publish post"} →
            </button>
            <Link to="/" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
