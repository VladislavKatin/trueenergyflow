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

## Production Build

```bash
npm run lint
npm run build
npm run start
```

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
   - Node.js Version: `22.x`
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
