import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const imagesDir = path.join(root, "public", "images", "posts");
fs.mkdirSync(imagesDir, { recursive: true });

const apiKey = process.env.LEONARDO_API_KEY || "";
const apiBase = process.env.LEONARDO_API_BASE || "https://cloud.leonardo.ai/api/rest/v1";
const modelId = process.env.LEONARDO_MODEL_ID || "05ce0082-2d80-4a2d-8653-4d1c85e2418e";
const width = Number(process.env.LEONARDO_WIDTH || 1344);
const height = Number(process.env.LEONARDO_HEIGHT || 768);
const maxPoll = Number(process.env.LEONARDO_MAX_POLL || 40);
const pollDelayMs = Number(process.env.LEONARDO_POLL_DELAY_MS || 3000);
const dryRun = process.argv.includes("--dry-run");
const onlySlugArg = process.argv.find((arg) => arg.startsWith("--slug="));
const onlySlug = onlySlugArg ? onlySlugArg.replace("--slug=", "").trim() : "";

if (!dryRun && !apiKey) {
  console.error("Missing LEONARDO_API_KEY. Set it in environment or .env.local.");
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function listPostFiles() {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function buildHeaders() {
  return {
    accept: "application/json",
    authorization: `Bearer ${apiKey}`,
    "content-type": "application/json"
  };
}

async function leonardoRequest(method, endpoint, body) {
  const res = await fetch(`${apiBase}${endpoint}`, {
    method,
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`Leonardo ${method} ${endpoint} failed (${res.status}): ${JSON.stringify(json).slice(0, 500)}`);
  }

  return json;
}

function pickGenerationId(createResponse) {
  return (
    createResponse?.sdGenerationJob?.generationId ||
    createResponse?.generationId ||
    createResponse?.data?.generationId ||
    null
  );
}

function pickStatus(getResponse) {
  return (
    getResponse?.generations_by_pk?.status ||
    getResponse?.generation?.status ||
    getResponse?.status ||
    ""
  );
}

function pickImageUrls(getResponse) {
  const arr = getResponse?.generations_by_pk?.generated_images || getResponse?.generated_images || [];
  return arr.map((x) => x?.url).filter(Boolean);
}

async function createGeneration(prompt, negativePrompt) {
  const body = {
    prompt,
    negative_prompt: negativePrompt,
    modelId,
    width,
    height,
    num_images: 1
  };

  const json = await leonardoRequest("POST", "/generations", body);
  const generationId = pickGenerationId(json);
  if (!generationId) {
    throw new Error(`No generationId in response: ${JSON.stringify(json).slice(0, 500)}`);
  }
  return generationId;
}

async function waitForImageUrl(generationId) {
  for (let i = 1; i <= maxPoll; i += 1) {
    const json = await leonardoRequest("GET", `/generations/${generationId}`);
    const status = String(pickStatus(json)).toUpperCase();
    const urls = pickImageUrls(json);

    if (urls.length > 0 && (status === "COMPLETE" || status === "COMPLETED" || status === "")) {
      return urls[0];
    }
    if (status === "FAILED" || status === "ERROR") {
      throw new Error(`Generation ${generationId} failed with status=${status}`);
    }

    await sleep(pollDelayMs);
  }

  throw new Error(`Timeout waiting for generation ${generationId}`);
}

async function downloadImage(url, targetPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download image (${res.status}) from ${url}`);
  }
  const arr = await res.arrayBuffer();
  fs.writeFileSync(targetPath, Buffer.from(arr));
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

function buildPrompts(title) {
  // User requirement: prompt must be exactly the article title.
  const p1 = title;
  const p2 = title;
  const negative =
    "low quality, blurry, text, watermark, logo, distorted face, extra fingers, cartoon, anime, CGI, oversaturated";
  return { p1, p2, negative };
}

function replaceContentImageOnly(markdown, title, image2) {
  const stripped = markdown.replace(/!\[[^\]]*\]\([^)]+\)\s*/g, "").trim();
  const marker = "## Related resources";
  const block = `\n\n![${title} image 2](${image2})\n\n`;
  if (stripped.includes(marker)) {
    return stripped.replace(marker, `${block}${marker}`);
  }
  return `${stripped}${block}`;
}

async function run() {
  const files = listPostFiles();
  let processed = 0;

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const doc = matter(raw);
    const slug = String(doc.data.slug || file.replace(/\.mdx$/i, ""));

    if (onlySlug && slug !== onlySlug) continue;

    const title = String(doc.data.title || slug);
    const public1 = `/images/posts/${slug}-1.png`;
    const public2 = `/images/posts/${slug}-2.png`;
    const abs1 = path.join(imagesDir, `${slug}-1.png`);
    const abs2 = path.join(imagesDir, `${slug}-2.png`);
    const { p1, p2, negative } = buildPrompts(title);

    if (dryRun) {
      console.log(`[dry-run] ${slug}-1 prompt: ${p1}`);
      console.log(`[dry-run] ${slug}-2 prompt: ${p2}`);
    } else {
      const g1 = await createGeneration(p1, negative);
      const u1 = await waitForImageUrl(g1);
      await downloadImage(u1, abs1);

      const g2 = await createGeneration(p2, negative);
      const u2 = await waitForImageUrl(g2);
      await downloadImage(u2, abs2);
    }

    const nextBody = replaceContentImageOnly(doc.content, title, public2);
    const nextRaw = matter.stringify(nextBody, { ...doc.data, ogImage: public1 });
    if (!dryRun) fs.writeFileSync(fullPath, nextRaw);

    processed += 1;
    console.log(`Processed ${slug}`);
  }

  console.log(`Done. Processed posts: ${processed}`);
}

run().catch((err) => {
  console.error("Leonardo generation failed:", err.message);
  process.exit(1);
});
