export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelative(isoString) {
  const now = Date.now();
  const diff = now - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(isoString);
}

export function renderMarkdown(text) {
  // Simple markdown: bold, italic, links, line breaks
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^## (.*)/gm, "<h2>$1</h2>")
    .replace(/^# (.*)/gm, "<h1>$1</h1>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

export const MOODS = [
  { value: "excited", emoji: "✨", label: "Excited" },
  { value: "reflective", emoji: "🌙", label: "Reflective" },
  { value: "curious", emoji: "🔍", label: "Curious" },
  { value: "happy", emoji: "☀️", label: "Happy" },
  { value: "melancholy", emoji: "🌧️", label: "Melancholy" },
  { value: "grateful", emoji: "🌿", label: "Grateful" },
  { value: "creative", emoji: "🎨", label: "Creative" },
  { value: "tired", emoji: "😴", label: "Tired" },
];

export function getMoodEmoji(mood) {
  return MOODS.find((m) => m.value === mood)?.emoji ?? "✏️";
}
