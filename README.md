# markmenezes.com — portfolio

Personal portfolio for Mark Menezes, product / UX designer. Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + next-themes, exported as a fully static site.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & static export

```bash
npm run build
```

`next.config.mjs` sets `output: "export"`, so the build writes the complete static site to `out/`. No server required.

## Deploy

**GoDaddy (or any static host):** upload the *contents* of `out/` into `public_html/` (keep the folder structure — `_next/`, `work/`, `img/`, etc.). Trailing-slash URLs are enabled, so `/about/`-style paths resolve to folders with `index.html`.

**Vercel:** push the repo and import it — Vercel detects Next.js automatically. No config needed.

## Photos

Place the two portraits in `public/img/`:

- `mark-primary.jpg` — three-quarter profile (ASU graduation), shown in About
- `mark-secondary.jpg` — smiling, shown on hover

If a photo is missing the About section falls back to a styled monogram panel, so the site never shows a broken image.

## Project images

`public/work/*.jpg` are covers fetched from the corresponding Behance case studies. If an image ever fails to load in the browser, the card falls back to a typographic gradient panel.

## Structure

```
app/            layout (fonts, metadata, theme), page, global styles, favicon
components/     Nav, Hero, Work, ProjectCard, Marquee, About, Timeline,
                Contact, Footer, ThemeToggle, Cursor, Loader, Reveal, Magnetic
lib/projects.ts project data + marquee keywords (single source of truth)
public/         work covers, portraits, OG image
```
