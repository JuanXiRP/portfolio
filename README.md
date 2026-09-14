# Juan Ruiz Platón · Portfolio

Personal portfolio of a junior software developer (Java · Kotlin · React/TypeScript), built to give a recruiter the essentials in under a minute: measurable impact, availability, a downloadable CV and a real project explained as a case study.

**Live site:** https://juanxirp.github.io/portfolio/ (English) · https://juanxirp.github.io/portfolio/es/ (Spanish)

## Stack

| Concern       | Choice                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router, static export) + React 19                                          |
| Language      | TypeScript in `strict` mode                                                                                      |
| Styling       | Tailwind CSS v4 with CSS-variable design tokens, light/dark theme via `next-themes`                              |
| i18n          | English and Spanish, typed JSON dictionaries, one static page per locale (`/en/`, `/es/`)                        |
| Testing       | Vitest + React Testing Library                                                                                   |
| Quality gates | ESLint (`next/core-web-vitals` + TypeScript), Prettier, Husky + lint-staged                                      |
| CI/CD         | GitHub Actions: lint → format check → typecheck → test → build on every push; deploy to GitHub Pages from `main` |
| SEO           | Per-locale metadata, `hreflang` alternates, Open Graph image, sitemap, robots, JSON-LD `Person`                  |

No CMS, no backend, no third-party form service: the whole site is static HTML served from GitHub Pages.

## Project structure

```
messages/            en.json, es.json           every user-facing string, same keys in both
public/              CV (PDF), photo, OG image, icons
src/
  app/
    [locale]/        root layout + page                 one static route per locale
    (root)/          "/" entry point that picks the browser language client-side
    global-not-found.tsx                           exported as 404.html for GitHub Pages
    sitemap.ts, robots.ts
  components/
    layout/          Header, Footer, LocaleSwitcher, ThemeToggle, SkipLink
    sections/        Hero, Metrics, About, Experience, Projects, Skills, Education, Contact
    projects/        ProjectCaseStudy, ArchitectureDiagram
    ui/              Container, Section, Card, Badge, Chip, ButtonLink, ExternalLink
  data/profile.ts    structured, non-translatable facts (links, dates, tech, metrics)
  i18n/              locale config and typed dictionary access
  lib/               base-path helpers, date formatting, JSON-LD
tests/               unit and component tests
```

### Design decisions

- **Content is data.** Prose lives in `messages/<locale>.json`; facts (URLs, dates, tech tags) live in `src/data/profile.ts`. Components only render. Adding a project means adding one entry to `profile.projects` and its copy to both dictionaries.
- **Translations are type-checked.** `Dictionary` is inferred from `en.json`; `es.json` must satisfy it, so a missing key fails `tsc`. A test also compares the full key set and placeholders of both files.
- **Static export, no middleware.** GitHub Pages cannot run a server, so locale routing is a `[locale]` segment with `generateStaticParams`. The `/` page redirects in the browser based on `navigator.languages` and falls back to plain links.
- **Base path from the environment.** `NEXT_PUBLIC_BASE_PATH` (for example `/portfolio`) is the only thing that changes between a root domain and a GitHub Pages sub-path.
- **Accessibility by default.** Semantic landmarks, skip link, visible focus, `aria-*` on icon buttons, reduced-motion support, and every outbound link goes through one component that enforces `rel="noopener noreferrer"` and announces the new tab.

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Then open http://localhost:3000/en/.

### Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server                                 |
| `npm run build`     | Static export into `out/`                          |
| `npm run lint`      | ESLint                                             |
| `npm run format`    | Prettier (write) · `format:check` only verifies    |
| `npm run typecheck` | Generates Next route types and runs `tsc --noEmit` |
| `npm test`          | Vitest, single run · `test:watch`, `test:coverage` |
| `npm run preview`   | Serves `out/` like GitHub Pages (see below)        |

To preview the production build exactly as GitHub Pages serves it:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio npm run preview
```

and open http://localhost:3210/portfolio/en/. The preview script mounts `out/` under the base path and serves `404.html` for unknown URLs, exactly like GitHub Pages.

## Deployment

`.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `out/` with `actions/deploy-pages`. One-time setup in the repository: **Settings → Pages → Source: GitHub Actions**. The base path is derived from the repository name, so renaming the repo is enough to move the site.

## Updating content

- **New job or project:** add the structured entry in `src/data/profile.ts`, then add its text under the same id in `messages/en.json` and `messages/es.json`. TypeScript will point at anything missing.
- **New language:** add the code to `locales` in `src/i18n/config.ts`, create `messages/<code>.json` and register it in `src/i18n/dictionaries.ts`.
- **CV:** replace `public/cv-juan-ruiz-platon.pdf` (keep the name, or update `profile.assets.cv`).

## License

[MIT](LICENSE). The CV, photo and text describe a real person and are not covered by the license.
