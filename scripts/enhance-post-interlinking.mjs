import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");

const files = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".mdx"))
  .sort((a, b) => a.localeCompare(b));

const posts = files.map((file) => {
  const fullPath = path.join(postsDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(source);
  return {
    file,
    fullPath,
    data: parsed.data,
    content: parsed.content
  };
});

const serviceByCategory = {
  "Energy Healing": "/services/energy-healing",
  "Remote Healing": "/services/remote-healing",
  "Intuitive Guidance": "/services/intuitive-readings",
  Craniosacral: "/services/craniosacral-therapy",
  "Spiritual Coaching": "/services/spiritual-coaching"
};

function relatedLinks(current) {
  const sameCategory = posts
    .filter((p) => p.data.slug !== current.data.slug && p.data.category === current.data.category)
    .slice(0, 3);

  const fallback = posts.filter((p) => p.data.slug !== current.data.slug).slice(0, 3);
  const selected = (sameCategory.length > 0 ? sameCategory : fallback).slice(0, 2);

  return selected.map((p) => `- [${p.data.title}](/blog/${p.data.slug})`);
}

let updated = 0;

for (const post of posts) {
  if (post.content.includes("## Also read")) {
    continue;
  }

  const serviceUrl = serviceByCategory[post.data.category] || "/services";
  const links = relatedLinks(post);

  const section = `

## Also read

- [Service match](${serviceUrl})
${links.join("\n")}
- [Book a session](/contact)
`;

  const next = matter.stringify(`${post.content.trimEnd()}\n${section}\n`, post.data);
  fs.writeFileSync(post.fullPath, next);
  updated += 1;
}

console.log(`Interlinking updated in ${updated} posts.`);
