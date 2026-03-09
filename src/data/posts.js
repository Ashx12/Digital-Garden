export const seedPosts = [
  {
    id: '1',
    title: 'Welcome to My Digital Garden',
    slug: 'welcome-to-my-digital-garden',
    date: '2026-03-01',
    tags: ['meta', 'hello'],
    excerpt: 'A little introduction to what this place is and why I made it.',
    content: `This is my little corner of the internet. A digital garden — not a blog exactly, more like a living notebook where I plant ideas and let them grow.

Unlike a traditional blog, nothing here is finished. Posts get updated, thoughts evolve, links get added. Think of it less like a newspaper and more like wandering through someone's garden: things are at different stages, some beds are tidy and some are a bit wild.

## What you'll find here

- Notes on things I'm learning
- Half-formed thoughts I want to remember
- Links and references I keep coming back to
- Occasionally something that feels finished enough to call a "post"

## Why indie web?

I believe in owning your own words. Social media is fine for quick thoughts but I want a place that's mine — that looks like me, sounds like me, and doesn't disappear when a company decides to pivot or shut down.

So here we are. Pull up a chair. Stay a while.`,
  },
  {
    id: '2',
    title: 'On Reading Slowly',
    slug: 'on-reading-slowly',
    date: '2026-03-05',
    tags: ['reading', 'slow living'],
    excerpt: 'Speed-reading felt like a cheat code. It turns out it was cheating me.',
    content: `I used to pride myself on reading fast. Fifty pages an hour, easy. I'd finish a novel in a weekend, check it off the list, move on.

Then I noticed I couldn't remember anything I'd read.

Not the characters' names, not the plot, not the ideas. Just a vague sense of having *done* the thing. The literary equivalent of scrolling.

## The experiment

I started reading one chapter at a time. Then stopping. Sitting with it. Sometimes writing a few sentences about what struck me. Sometimes just staring out the window.

It felt unbearably slow at first. But something strange happened: the books started to *stick*. I'd find myself thinking about a passage days later. Making connections to other things I'd read.

## What I learned

Reading fast is a skill. Reading slowly is a different skill, and in most cases a more valuable one.

The goal isn't to consume books. It's to be changed by them.

I'm still working on this. Old habits are stubborn. But I read fewer books now and remember more of them, and that feels like the right trade.`,
  },
];

const STORAGE_KEY = 'digital-garden-posts';

export function getPosts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    }
  } catch (e) {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
  return seedPosts;
}

export function getPost(slug) {
  return getPosts().find(p => p.slug === slug);
}

export function savePost(post) {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return post;
}

export function deletePost(id) {
  const posts = getPosts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
