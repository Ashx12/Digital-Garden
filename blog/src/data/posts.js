// Default seed posts for the blog
export const seedPosts = [
  {
    id: "1",
    title: "Hello, World! 🌱",
    content: `Welcome to my little corner of the internet. This is my digital garden — a place where ideas grow slowly, get revised, and sometimes wither away.

Unlike social media, this space is mine. No algorithms, no engagement metrics, no dopamine traps. Just writing, thinking, and sharing.

I've been inspired by the **IndieWeb movement** — the idea that we should own our content, our identity, and our online presence. This blog is my small contribution to that vision.

Feel free to explore. Leave a note in the guestbook if you'd like. And if you have your own site, I'd love to know about it.`,
    tags: ["meta", "indieweb", "hello"],
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    mood: "excited",
  },
  {
    id: "2",
    title: "Why I Quit Social Media (Mostly)",
    content: `It started with deleting Twitter. Then Instagram. Then trying to explain to everyone why.

The short answer: I was exhausted. Every scroll was a performance, every post a small audition for approval. I wanted to *write* again — not caption photos.

The long answer is harder to articulate. Something about presence. Something about slowness. Something about who gets to own the story of my life.

Here's what I've learned so far:

- **RSS feeds are still alive** and they're wonderful
- **Long-form writing is meditative** in a way that tweets never were
- **My attention span is slowly recovering**

The internet doesn't have to be loud. This is my proof.`,
    tags: ["indieweb", "social-media", "writing"],
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    mood: "reflective",
  },
  {
    id: "3",
    title: "Links I Loved This Week",
    content: `A quick roundup of things that made my brain light up:

**Reading:**
A beautiful essay on the philosophy of maintenance — how most of human effort goes into *keeping things going* rather than creating new things. Quietly profound.

**Listening:**
Found an old interview with Ursula Le Guin talking about why she wrote science fiction. She says something like: "Science fiction isn't about the future. It's about now, seen from a different angle."

**Making:**
I've been pressing flowers from my garden and scanning them. There's something delightful about bringing analog objects into digital space.

**Thinking:**
What if the internet had taken a different path? What if we'd all stayed on personal blogs instead of aggregating to a few mega-platforms? We'd have lost convenience but gained... something. I'm not sure what to call it yet.`,
    tags: ["links", "weeknotes", "culture"],
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    mood: "curious",
  },
];
