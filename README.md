# miketalbot.io

Personal site of Mike Talbot, built with [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com). Adapted from
[devportfolio](https://github.com/RyanFitzgerald/devportfolio) (MIT) with a
dark-by-default theme and light/dark toggle.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Editing content

| What | Where |
|---|---|
| Name, tagline, About text, research questions, skills, projects, social links | `src/config.ts` |
| Experience, education | `src/content/experience.yaml`, `education.yaml` |
| Publications, talks | `src/content/publications.yaml`, `talks.yaml` |
| Awards, service, training/certifications, affiliations (CV page) | `src/content/*.yaml` |
| Images (headshot, poster previews) | `public/images/` |
| Colors (both themes) | CSS variables at the top of `src/styles/global.css` |

Entries appear in the order they're listed in each YAML file (talks and
publications are sorted by date automatically). Quote any YAML value that
contains ` #` or starts with a special character, e.g. `"Grant #123"`.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. In the repo settings, **Pages → Build and
deployment → Source** must be set to **GitHub Actions**.

## Archive

The previous Jekyll blog posts are kept, unpublished, in `archive/blog/`.
