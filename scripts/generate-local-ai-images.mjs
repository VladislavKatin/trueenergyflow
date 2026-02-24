import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const outputDir = path.join(root, "public", "images", "posts");
fs.mkdirSync(outputDir, { recursive: true });

const apiBase = process.env.SD_API_URL ?? "http://127.0.0.1:7860";
const modelName = process.env.SD_MODEL ?? "";
const dryRun = process.argv.includes("--dry-run");
const onlySlugArg = process.argv.find((arg) => arg.startsWith("--slug="));
const onlySlug = onlySlugArg ? onlySlugArg.replace("--slug=", "").trim() : "";

const negativePrompt =
  "blurry, low quality, deformed face, extra fingers, text, watermark, logo, frame, cartoon, anime";

const presetA = {
  suffix:
    "cinematic editorial photo, realistic person portrait, soft daylight, natural skin texture, 35mm, shallow depth of field",
  width: 1536,
  height: 864,
  steps: 32,
  cfg_scale: 6.5,
  sampler_name: "DPM++ 2M Karras"
};

const presetB = {
  suffix:
    "fine art abstract background with human silhouette, atmospheric light, premium magazine aesthetic, high detail",
  width: 1536,
  height: 864,
  steps: 36,
  cfg_scale: 7,
  sampler_name: "DPM++ 2M Karras"
};

function slugFromFileName(fileName) {
  return fileName.replace(/\.mdx$/i, "").trim();
}

function ensurePrompt(title, variant) {
  return `${title}, ${variant}`;
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  return res.json();
}

async function maybeSetModel() {
  if (!modelName) return;
  await postJson(`${apiBase}/sdapi/v1/options`, { sd_model_checkpoint: modelName });
}

async function generatePng(prompt, preset, targetAbsPath) {
  if (dryRun) {
    console.log(`[dry-run] ${path.basename(targetAbsPath)} <= ${prompt}`);
    return;
  }

  const payload = {
    prompt,
    negative_prompt: negativePrompt,
    width: preset.width,
    height: preset.height,
    steps: preset.steps,
    cfg_scale: preset.cfg_scale,
    sampler_name: preset.sampler_name,
    batch_size: 1,
    n_iter: 1,
    restore_faces: true
  };

  const data = await postJson(`${apiBase}/sdapi/v1/txt2img`, payload);
  const b64 = data?.images?.[0];
  if (!b64) {
    throw new Error("No image returned by local SD API.");
  }

  const raw = b64.includes(",") ? b64.split(",")[1] : b64;
  fs.writeFileSync(targetAbsPath, Buffer.from(raw, "base64"));
}

function replaceFirstTwoImages(markdown, title, image1, image2) {
  let count = 0;
  let out = markdown.replace(/!\[[^\]]*\]\([^)]+\)/g, (match) => {
    count += 1;
    if (count === 1) return `![${title} image 1](${image1})`;
    if (count === 2) return `![${title} image 2](${image2})`;
    return match;
  });

  if (count === 0) {
    out = `![${title} image 1](${image1})\n\n${out}\n\n![${title} image 2](${image2})\n`;
  } else if (count === 1) {
    out = `${out}\n\n![${title} image 2](${image2})\n`;
  }

  return out;
}

function listPostFiles() {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

async function run() {
  if (!fs.existsSync(postsDir)) {
    throw new Error(`Posts directory not found: ${postsDir}`);
  }

  await maybeSetModel();

  const files = listPostFiles();
  let processed = 0;

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const slug = String(parsed.data.slug || slugFromFileName(file));
    if (onlySlug && slug !== onlySlug) {
      continue;
    }

    const title = String(parsed.data.title || slug);
    const public1 = `/images/posts/${slug}-1.png`;
    const public2 = `/images/posts/${slug}-2.png`;
    const abs1 = path.join(outputDir, `${slug}-1.png`);
    const abs2 = path.join(outputDir, `${slug}-2.png`);

    await generatePng(ensurePrompt(title, presetA.suffix), presetA, abs1);
    await generatePng(ensurePrompt(title, presetB.suffix), presetB, abs2);

    const nextContent = replaceFirstTwoImages(parsed.content, title, public1, public2);
    const nextDoc = matter.stringify(nextContent, {
      ...parsed.data,
      ogImage: public1
    });

    if (!dryRun) {
      fs.writeFileSync(fullPath, nextDoc);
    } else {
      console.log(`[dry-run] frontmatter updated for ${file}`);
    }

    processed += 1;
    console.log(`Processed ${slug}`);
  }

  console.log(`Done. Processed posts: ${processed}`);
}

run().catch((err) => {
  console.error("Image generation failed:", err.message);
  process.exit(1);
});
