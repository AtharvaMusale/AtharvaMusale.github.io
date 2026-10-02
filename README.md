# Atharva Musale: Portfolio & Blog

🌐 **Live site:** https://atharvamusale.github.io

My personal portfolio and blog, built with a custom Python static-site generator and deployed to GitHub Pages through GitHub Actions.

## What's on the site

- **Profile & experience:** career highlights, skills and education
- **Projects:** case studies with pipeline diagrams
- **Blog:** date-based posts published at `/YYYY/MM/DD/Title.html`

## How it works

```
content/ (YAML + Markdown) → build.py (Jinja2 + markdown-it) → _site/ → GitHub Actions → GitHub Pages
```

- Site config and profile live in `content/site.yaml`
- Projects are `content/projects/*.md`, posts are `content/posts/`
- Pipeline diagrams use color-coded component types: **agent** (LLM workflows), **deterministic** (standard code), **parallel** (concurrent processes) and **storage** (state)

Adding a project or post is just adding a Markdown file with YAML front matter.

## Tech stack

Python · Jinja2 · markdown-it · YAML · GitHub Actions · GitHub Pages

## Project structure

```
content/     site config, projects and posts
templates/   HTML templates
static/      CSS, JS, images (served as /assets/)
build.py     the site generator
_site/       build output
```

## Run locally

```bash
pip install -r requirements.txt
python build.py --serve    # preview at http://localhost:8000 with live rebuilds
```
