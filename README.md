# True Energy Flow

Production-ready content website for `trueenergyflow.com` built with Next.js App Router, TypeScript, Tailwind, and local MDX content.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MDX content from local files (`/content`)
- Static generation where possible (blog posts, service pages, categories/tags)

## Local Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Free Local AI Image Pipeline (No Paid API)

This project supports fully local image generation for blog posts using a local Stable Diffusion API (AUTOMATIC1111 or Forge).

### 1) Start local SD API once

Install one of:
- AUTOMATIC1111 WebUI
- Stable Diffusion Forge

Run it with API enabled:

```bash
webui-user.bat --api
```

Default API URL used by the script:
- `http://127.0.0.1:7860`

### 2) Generate all blog images automatically

```bash
npm run images:generate
```

What happens automatically:
- reads all `content/posts/*.mdx`
- uses each post `title` as the prompt base
- generates 2 unique `.png` images per post
- saves to `public/images/posts/<slug>-1.png` and `-2.png`
- updates first two markdown images in each post
- updates frontmatter `ogImage` to `<slug>-1.png`

### 3) Useful options

Dry run (no file writes):

```bash
npm run images:dry-run
```

Generate one post only:

```bash
node scripts/generate-local-ai-images.mjs --slug=what-to-expect-in-an-energy-healing-session
```

Use custom API URL / model:

```bash
set SD_API_URL=http://127.0.0.1:7860
set SD_MODEL=your_model.safetensors
npm run images:generate
```

## Leonardo API Pipeline

If you prefer Leonardo generation, set env var:

```bash
set LEONARDO_API_KEY=your_key_here
```

Then run:

```bash
npm run images:generate:leonardo
```

Dry run (shows prompts only):

```bash
npm run images:dry-run:leonardo
```

Optional env vars:
- `LEONARDO_MODEL_ID` (default: `05ce0082-2d80-4a2d-8653-4d1c85e2418e`)
- `LEONARDO_WIDTH` (default: `1344`)
- `LEONARDO_HEIGHT` (default: `768`)

## Production Build

```bash
npm run lint
npm run build
npm run start
```

## Automated Release (GitHub -> Vercel)

Run one command locally:

```bash
npm run release --msg "content update"
```

What it does:
- runs `lint` + `build`
- commits all changes
- pushes to `main`
- triggers Vercel production deploy automatically

### Zero-Command Mode (Windows Startup)

This repo includes auto-sync on file changes:

1. Install startup automation once:
   - `powershell -ExecutionPolicy Bypass -File scripts/install-autosync-startup.ps1`
2. Reboot or log out/log in.
3. From then on, file changes are auto-committed and pushed to `main`, which triggers Vercel deploy.
4. If a file in `content/posts/*.mdx` changes, blog images are generated automatically first (`images:generate`), then commit/push runs.

## Deploy to Vercel

1. Push this project to a Git repository.
2. In Vercel, click **Add New Project** and import the repository.
3. Keep default build settings (`npm run build`), then deploy.
4. In Vercel Project Settings -> Domains, add:
   - `trueenergyflow.com` (primary)
   - `www.trueenergyflow.com` (alias)
5. At your DNS provider, create:
   - `A` record: host `@` -> `76.76.21.21`
   - `CNAME` record: host `www` -> `cname.vercel-dns.com`
6. Wait for DNS propagation, then verify both domains in Vercel.

## Your Exact Flow (GitHub -> Vercel)

Repository: `https://github.com/VladislavKatin/trueenergyflow`  
Vercel project: `https://vercel.com/vladkatintam-4966s-projects/trueenergyflow`

1. Local pre-check:
   - `npm run lint`
   - `npm run build`
2. Commit and push:
   - `git add .`
   - `git commit -m "Production update"`
   - `git push origin main`
3. Vercel auto-deploys from `main`.
4. In Vercel Project Settings:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next` (default)
   - Node.js Version: `20.x`
5. In Vercel -> Git:
   - Production Branch: `main`
   - Enable Preview Deployments for pull requests.
6. In Vercel -> Domains:
   - Set `trueenergyflow.com` as Primary
   - Add `www.trueenergyflow.com` and redirect to primary
7. Verify after each deploy:
   - `/`
   - `/blog`
   - `/sitemap.xml`
   - `/robots.txt`
   - `/rss.xml`

## Site Configuration

Edit [siteConfig.ts](/C:/www/trueenergyflow/src/config/siteConfig.ts):

- `siteName`
- `siteUrl`
- `bookingUrl`
- `defaultOgImage`

## Content Structure

- Posts: `content/posts/*.mdx`
- Pages: `content/pages/*.mdx`
- Services: `content/services/*.mdx`

### Add a New Blog Post

1. Create a new `.mdx` file in `content/posts`.
2. Include frontmatter:
   - `title`
   - `description`
   - `date`
   - `category`
   - `tags`
   - `slug`
   - `canonical`
   - `ogImage`
3. Write markdown sections with `##`/`###` headings to auto-populate TOC.

## SEO Features Included

- Metadata API (title, description, canonical, Open Graph, Twitter)
- `sitemap.xml`
- `robots.txt`
- `rss.xml`
- JSON-LD:
  - Article (blog posts)
  - BreadcrumbList (posts/services)
  - Service and LocalBusiness (service pages)
