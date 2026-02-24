import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const imagesDir = path.join(root, "public", "images", "posts");
fs.mkdirSync(imagesDir, { recursive: true });

function hash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function palette(seed) {
  const list = [
    ["#f8fafc", "#dbeafe", "#1d4ed8"],
    ["#f0fdf4", "#bbf7d0", "#166534"],
    ["#fff7ed", "#fed7aa", "#c2410c"],
    ["#fdf2f8", "#fbcfe8", "#be185d"],
    ["#f5f3ff", "#ddd6fe", "#6d28d9"],
    ["#ecfeff", "#a5f3fc", "#0e7490"]
  ];
  return list[seed % list.length];
}

function escapeXml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function splitTitle(title) {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function svgAbstract(title, slug) {
  const seed = hash(`${title}-${slug}-a`);
  const [bg, mid, accent] = palette(seed);
  const [line1, line2] = splitTitle(title);
  const c1x = 140 + (seed % 500);
  const c1y = 180 + (seed % 180);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g1)"/>
  <circle cx="${c1x}" cy="${c1y}" r="220" fill="${accent}" opacity="0.12"/>
  <circle cx="${c1x + 420}" cy="${c1y + 120}" r="140" fill="${accent}" opacity="0.2"/>
  <circle cx="${c1x + 760}" cy="${c1y + 10}" r="190" fill="${accent}" opacity="0.1"/>
  <path d="M0 730 C340 650 560 800 860 700 C1120 620 1380 770 1600 680 L1600 900 L0 900 Z" fill="${accent}" opacity="0.22"/>
  <text x="95" y="120" font-size="34" font-family="Georgia, serif" fill="${accent}" opacity="0.92">${escapeXml(line1)}</text>
  <text x="95" y="165" font-size="34" font-family="Georgia, serif" fill="${accent}" opacity="0.92">${escapeXml(line2)}</text>
</svg>`;
}

function svgHuman(title, slug) {
  const seed = hash(`${title}-${slug}-h`);
  const [bg, mid, accent] = palette(seed + 3);
  const [line1, line2] = splitTitle(title);
  const shift = seed % 140;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="${bg}"/>
  <rect x="0" y="600" width="1600" height="300" fill="${mid}" opacity="0.58"/>
  <circle cx="${420 + shift}" cy="340" r="78" fill="none" stroke="${accent}" stroke-width="14"/>
  <path d="M${345 + shift} 555 C${360 + shift} 470 ${505 + shift} 470 ${520 + shift} 555" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
  <path d="M${388 + shift} 515 L${305 + shift} 620 M${478 + shift} 515 L${562 + shift} 620" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="${1030 - shift}" cy="325" r="68" fill="none" stroke="${accent}" stroke-width="12" opacity="0.8"/>
  <path d="M${980 - shift} 520 C${995 - shift} 448 ${1102 - shift} 448 ${1115 - shift} 520" fill="none" stroke="${accent}" stroke-width="12" opacity="0.8"/>
  <text x="95" y="110" font-size="30" font-family="Georgia, serif" fill="${accent}" opacity="0.93">${escapeXml(line1)}</text>
  <text x="95" y="148" font-size="30" font-family="Georgia, serif" fill="${accent}" opacity="0.93">${escapeXml(line2)}</text>
</svg>`;
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const full = path.join(postsDir, file);
  const source = fs.readFileSync(full, "utf8");
  const { data, content } = matter(source);
  const slug = data.slug;
  const title = data.title;

  const local1 = `/images/posts/${slug}-1.svg`;
  const local2 = `/images/posts/${slug}-2.svg`;

  let count = 0;
  let nextContent = content.replace(/!\[[^\]]*\]\([^)]+\)/g, (match) => {
    count += 1;
    if (count === 1) return `![${title} image 1](${local1})`;
    if (count === 2) return `![${title} image 2](${local2})`;
    return match;
  });

  if (count === 0) {
    nextContent = `![${title} image 1](${local1})\n\n${nextContent}\n\n![${title} image 2](${local2})\n`;
  }
  if (count === 1) {
    nextContent = `${nextContent}\n\n![${title} image 2](${local2})\n`;
  }

  const next = matter.stringify(nextContent, { ...data, ogImage: local1 });
  fs.writeFileSync(full, next);
  fs.writeFileSync(path.join(imagesDir, `${slug}-1.svg`), svgAbstract(title, slug));
  fs.writeFileSync(path.join(imagesDir, `${slug}-2.svg`), svgHuman(title, slug));
}

console.log(`Generated local title-based images for ${files.length} posts.`);
