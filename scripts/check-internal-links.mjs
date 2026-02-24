import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const servicesDir = path.join(root, "content", "services");
const pagesDir = path.join(root, "content", "pages");

const staticRoutes = new Set([
  "/",
  "/blog",
  "/services",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/sitemap.xml",
  "/robots.txt",
  "/rss.xml"
]);

function mdxFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

const postSlugs = mdxFiles(postsDir).map((file) => {
  const parsed = readFrontmatter(path.join(postsDir, file));
  return parsed.data.slug || file.replace(/\.mdx$/i, "");
});

const serviceSlugs = mdxFiles(servicesDir).map((file) => {
  const parsed = readFrontmatter(path.join(servicesDir, file));
  return parsed.data.slug || file.replace(/\.mdx$/i, "");
});

const pageSlugs = mdxFiles(pagesDir).map((file) => {
  const parsed = readFrontmatter(path.join(pagesDir, file));
  return parsed.data.slug || file.replace(/\.mdx$/i, "");
});

const valid = new Set(staticRoutes);
for (const slug of postSlugs) valid.add(`/blog/${slug}`);
for (const slug of serviceSlugs) valid.add(`/services/${slug}`);
for (const slug of pageSlugs) valid.add(`/${slug}`);

const allDocs = [
  ...mdxFiles(postsDir).map((f) => path.join(postsDir, f)),
  ...mdxFiles(servicesDir).map((f) => path.join(servicesDir, f)),
  ...mdxFiles(pagesDir).map((f) => path.join(pagesDir, f))
];

const broken = [];
const counts = [];

for (const filePath of allDocs) {
  const source = fs.readFileSync(filePath, "utf8");
  const { content } = matter(source);
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m) => m[1]);
  const internal = links.filter((href) => href.startsWith("/"));
  counts.push({ filePath, internalLinks: internal.length });

  for (const href of internal) {
    const clean = href.split("#")[0].split("?")[0];
    if (clean.startsWith("/category/") || clean.startsWith("/tag/")) continue;
    if (clean.startsWith("/images/")) continue;
    if (!valid.has(clean)) {
      broken.push({ filePath, href: clean });
    }
  }
}

const lowInterlinked = counts.filter((x) => x.internalLinks < 3);

console.log(`Checked documents: ${allDocs.length}`);
console.log(`Broken internal links: ${broken.length}`);
if (broken.length > 0) {
  for (const item of broken.slice(0, 50)) {
    console.log(`BROKEN ${item.filePath} -> ${item.href}`);
  }
}
console.log(`Low interlinked docs (<3 internal links): ${lowInterlinked.length}`);
if (lowInterlinked.length > 0) {
  for (const item of lowInterlinked.slice(0, 50)) {
    console.log(`LOW ${item.filePath} -> ${item.internalLinks}`);
  }
}
