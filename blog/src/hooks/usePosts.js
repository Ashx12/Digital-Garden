import { useState, useEffect } from "react";
import { seedPosts } from "../data/posts";

const STORAGE_KEY = "digital-garden-posts";

export function usePosts() {
  const [posts, setPosts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
      return seedPosts;
    } catch {
      return seedPosts;
    }
  });

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
  };

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    savePosts([newPost, ...posts]);
    return newPost;
  };

  const deletePost = (id) => {
    savePosts(posts.filter((p) => p.id !== id));
  };

  const updatePost = (id, updates) => {
    savePosts(posts.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return { posts: sortedPosts, addPost, deletePost, updatePost };
}
