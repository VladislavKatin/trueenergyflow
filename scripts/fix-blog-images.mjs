import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

for (const [index, file] of files.entries()) {
  const full = path.join(postsDir, file);
  const source = fs.readFileSync(full, "utf8");
  const { data, content } = matter(source);

  const id1 = 100 + index * 2;
  const id2 = 101 + index * 2;
  const img1 = `https://picsum.photos/id/${id1}/1600/900`;
  const img2 = `https://picsum.photos/id/${id2}/1600/900`;

  let nextContent = content;
  const imageLines = [...content.matchAll(/!\[[^\]]*\]\([^)]+\)/g)];
  if (imageLines.length >= 2) {
    nextContent = nextContent.replace(imageLines[0][0], `![Editorial image 1](${img1})`);
    nextContent = nextContent.replace(imageLines[1][0], `![Editorial image 2](${img2})`);
  } else if (imageLines.length === 1) {
    nextContent = nextContent.replace(imageLines[0][0], `![Editorial image 1](${img1})`);
    nextContent = `${nextContent}\n\n![Editorial image 2](${img2})\n`;
  } else {
    nextContent = `![Editorial image 1](${img1})\n\n${nextContent}\n\n![Editorial image 2](${img2})\n`;
  }

  const next = matter.stringify(nextContent, {
    ...data,
    ogImage: img1
  });
  fs.writeFileSync(full, next);
}

console.log(`Updated image URLs for ${files.length} posts.`);
