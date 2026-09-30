#!/usr/bin/env python3
"""Static site generator for atharvamusale.github.io.

    python build.py            # build into _site/
    python build.py --serve    # build, serve on :8000, rebuild on file changes
"""
from __future__ import annotations

import argparse
import datetime as dt
import functools
import hashlib
import http.server
import re
import shutil
import threading
import time
from dataclasses import dataclass, field
from email.utils import format_datetime
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown_it import MarkdownIt

ROOT = Path(__file__).parent
CONTENT = ROOT / "content"
TEMPLATES = ROOT / "templates"
STATIC = ROOT / "static"
OUT = ROOT / "_site"

FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.S)
POST_FILENAME = re.compile(r"(\d{4})-(\d{2})-(\d{2})-(.+)\.md$")

md = MarkdownIt("commonmark", {"html": True, "typographer": True}).enable(["table", "strikethrough"])


@dataclass
class Page:
    meta: dict
    html: str
    url: str
    words: int = 0
    extra: dict = field(default_factory=dict)

    def __getattr__(self, name):  # lets templates write page.title instead of page.meta.title
        try:
            return self.meta[name]
        except KeyError:
            raise AttributeError(name) from None

    @property
    def reading_time(self) -> int:
        return max(1, round(self.words / 220))


def parse(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    m = FRONT_MATTER.match(text)
    if not m:
        return {}, text
    return yaml.safe_load(m.group(1)) or {}, text[m.end():]


def load_projects() -> list[Page]:
    projects = []
    for path in sorted((CONTENT / "projects").glob("*.md")):
        meta, body = parse(path)
        meta.setdefault("slug", path.stem)
        projects.append(Page(meta, md.render(body), f"/projects/{meta['slug']}/", len(body.split())))
    return sorted(projects, key=lambda p: p.meta.get("order", 99))


def load_posts() -> list[Page]:
    posts = []
    for path in (CONTENT / "posts").glob("*.md"):
        m = POST_FILENAME.match(path.name)
        if not m:
            raise ValueError(f"Post filename must look like YYYY-MM-DD-title.md: {path.name}")
        y, mo, d, name = m.groups()
        meta, body = parse(path)
        meta.setdefault("title", name)
        date = meta.get("date") or dt.date(int(y), int(mo), int(d))
        meta["date"] = date if isinstance(date, dt.date) else dt.date.fromisoformat(str(date))
        # Mirror Jekyll's /YYYY/MM/DD/Title-With-Hyphens.html so old links keep working.
        slug = re.sub(r"\s+", "-", name.strip())
        posts.append(Page(meta, md.render(body), f"/{y}/{mo}/{d}/{slug}.html", len(body.split())))
    return sorted(posts, key=lambda p: p.meta["date"], reverse=True)


def asset_version() -> str:
    """Short hash of static files, appended as ?v= so browsers never pair new HTML with stale CSS/JS."""
    digest = hashlib.sha1()
    for path in sorted(STATIC.rglob("*")):
        if path.is_file():
            digest.update(path.read_bytes())
    return digest.hexdigest()[:10]


def write(rel: str, content: str) -> None:
    rel = rel.lstrip("/")
    target = OUT / (rel + "index.html" if rel.endswith("/") or not rel else rel)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def build() -> None:
    started = time.perf_counter()
    site = yaml.safe_load((CONTENT / "site.yaml").read_text(encoding="utf-8"))
    site["year"] = dt.date.today().year
    projects, posts = load_projects(), load_posts()
    by_slug = {p.slug: p for p in projects}

    env = Environment(loader=FileSystemLoader(TEMPLATES), autoescape=select_autoescape(["html", "xml"]),
                      trim_blocks=True, lstrip_blocks=True)
    env.globals["asset_exists"] = lambda url: bool(url) and (STATIC / url.removeprefix("/assets/")).is_file()
    env.filters["date"] =lambda d, f="%b %d, %Y": d.strftime(f)
    env.filters["rfc822"] = lambda d: format_datetime(dt.datetime.combine(d, dt.time(), dt.timezone.utc))
    env.globals.update(site=site, projects=projects, posts=posts, by_slug=by_slug, asset_version=asset_version())

    def render(template: str, **ctx) -> str:
        return env.get_template(template).render(**ctx)

    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(STATIC, OUT / "assets")

    write("/", render("index.html", nav="home"))
    write("/projects/", render("projects.html", nav="projects", title="Projects"))
    for i, project in enumerate(projects):
        nxt = projects[(i + 1) % len(projects)]
        write(project.url, render("project.html", nav="projects", page=project, next_project=nxt,
                                  title=project.title, description=project.summary))
    write("/blog/", render("blog.html", nav="blog", title="Writing"))
    for post in posts:
        write(post.url, render("post.html", nav="blog", page=post, title=post.title,
                               description=post.meta.get("excerpt", "")))
    write("/404.html", render("404.html", title="Not found"))
    write("/feed.xml", render("feed.xml"))
    write("/sitemap.xml", render("sitemap.xml"))
    (OUT / ".nojekyll").touch()  # tell GitHub Pages not to run Jekyll on the output

    print(f"Built {len(projects)} projects, {len(posts)} posts in {time.perf_counter() - started:.2f}s -> {OUT}")


def snapshot() -> dict[Path, float]:
    watched = [CONTENT, TEMPLATES, STATIC, Path(__file__)]
    files = [p for w in watched for p in ([w] if w.is_file() else w.rglob("*")) if p.is_file()]
    return {p: p.stat().st_mtime for p in files}


def watch() -> None:
    last = snapshot()
    while True:
        time.sleep(0.7)
        current = snapshot()
        if current != last:
            last = current
            try:
                build()
            except Exception as exc:  # keep the dev server alive on template/content errors
                print(f"Build failed: {exc}")


def serve(port: int) -> None:
    threading.Thread(target=watch, daemon=True).start()
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
    print(f"Serving on http://localhost:{port} (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--serve", action="store_true", help="serve _site/ and rebuild on changes")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    build()
    if args.serve:
        serve(args.port)
