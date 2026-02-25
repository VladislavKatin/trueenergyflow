import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const postsDir = path.join(root, "public", "images", "posts");

async function convertPostImages() {
  const files = fs.readdirSync(postsDir).filter((name) => name.endsWith(".png"));
  let converted = 0;

  for (const file of files) {
    const input = path.join(postsDir, file);
    const base = file.replace(/\.png$/i, "");
    const webpOutput = path.join(postsDir, `${base}.webp`);
    const avifOutput = path.join(postsDir, `${base}.avif`);

    await sharp(input).webp({ quality: 82, effort: 4 }).toFile(webpOutput);
    await sharp(input).avif({ quality: 50, effort: 4 }).toFile(avifOutput);
    converted += 1;
  }

  return converted;
}

function updateImageReferences() {
  const targets = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(mdx|tsx|ts)$/.test(entry.name)) {
        targets.push(fullPath);
      }
    }
  }

  walk(path.join(root, "content"));
  walk(path.join(root, "src"));

  let updated = 0;
  const pattern = /\/images\/posts\/([a-z0-9-]+-[12])\.png/g;

  for (const filePath of targets) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source.split("\n");
    let changed = false;

    const nextLines = lines.map((line) => {
      if (line.includes("ogImage:")) return line;
      const replaced = line.replace(pattern, "/images/posts/$1.webp");
      if (replaced !== line) changed = true;
      return replaced;
    });

    if (changed) {
      fs.writeFileSync(filePath, nextLines.join("\n"), "utf8");
      updated += 1;
    }
  }

  return updated;
}

async function generateFavicons() {
  const iconSvg = path.join(root, "src", "app", "icon.svg");
  const publicDir = path.join(root, "public");
  const icoPath = path.join(publicDir, "favicon.ico");
  const favicon32 = path.join(publicDir, "favicon-32x32.png");
  const favicon16 = path.join(publicDir, "favicon-16x16.png");
  const appleTouch = path.join(publicDir, "apple-touch-icon.png");

  const buf16 = await sharp(iconSvg).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(iconSvg).resize(32, 32).png().toBuffer();
  const buf48 = await sharp(iconSvg).resize(48, 48).png().toBuffer();

  fs.writeFileSync(favicon16, buf16);
  fs.writeFileSync(favicon32, buf32);
  fs.writeFileSync(appleTouch, await sharp(iconSvg).resize(180, 180).png().toBuffer());
  fs.writeFileSync(icoPath, await pngToIco([buf16, buf32, buf48]));
}

async function main() {
  const converted = await convertPostImages();
  const updatedFiles = updateImageReferences();
  await generateFavicons();

  console.log(`Converted PNGs: ${converted}`);
  console.log(`Updated files with WebP refs: ${updatedFiles}`);
  console.log("Favicons generated: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
