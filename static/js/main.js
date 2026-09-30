const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- Theme toggle ----------
document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const current = root.dataset.theme || "dark";  // dark is the default theme
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Count-up for metric numbers ----------
// Animates values with a single number ("97%", "2,000+", "< 2 s"); leaves ranges like "4 / 3" alone.
function countUp(el) {
  const final = el.textContent;
  const m = final.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)([^\d]*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = (num.split(".")[1] || "").length;
  const fmt = (v) => pre + v.toLocaleString("en-US", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: num.includes(","),
  }) + post;
  const start = performance.now(), duration = 1400;
  requestAnimationFrame(function step(now) {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = fmt(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step); else el.textContent = final;
  });
}

// ---------- Reveal-on-scroll with stagger ----------
if ("IntersectionObserver" in window && !reduceMotion) {
  const targets = document.querySelectorAll(
    ".card-main, .viz-panel, .stat, .timeline > li, .tl-body li, .pipeline li:not(.pipe-rail), .side, .post-row, .skill-group, .edu, .section-head"
  );
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target;
      el.classList.add("in");
      el.querySelectorAll(":scope > strong, :scope .card-metric strong").forEach(countUp);
      // Drop the stagger delay once revealed so hover transitions stay snappy.
      setTimeout(() => { el.style.transitionDelay = ""; }, 900);
      io.unobserve(el);
    }
  }, { rootMargin: "0px 0px -60px 0px" });
  targets.forEach((el) => {
    const siblings = [...el.parentElement.children];
    el.style.transitionDelay = `${(siblings.indexOf(el) % 6) * 70}ms`;
    el.classList.add("reveal");
    io.observe(el);
  });
}

// ---------- Card spotlight (follows the cursor) ----------
if (finePointer && !reduceMotion) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

// ---------- Scroll-linked progress: timeline rail, pipeline rail, reading bar ----------
const clamp = (v) => Math.max(0, Math.min(1, v));
const tracks = [
  { box: document.querySelector(".tl"), items: document.querySelectorAll(".timeline > li"), anchor: ".tl-dot" },
  { box: document.querySelector(".pipeline"), items: document.querySelectorAll(".pipeline li:not(.pipe-rail)"), anchor: ".step-n" },
].filter((t) => t.box);
const readBar = document.querySelector(".read-progress");

function onScroll() {
  const line = innerHeight * 0.62;
  for (const { box, items, anchor } of tracks) {
    const r = box.getBoundingClientRect();
    box.style.setProperty("--p", clamp((line - r.top) / r.height).toFixed(3));
    items.forEach((li) => {
      const a = li.querySelector(anchor).getBoundingClientRect();
      li.classList.toggle("lit", a.top + a.height / 2 < line);
    });
  }
  if (readBar) {
    const max = root.scrollHeight - innerHeight;
    readBar.style.setProperty("--read", max > 0 ? clamp(scrollY / max).toFixed(3) : 0);
  }
}
if (tracks.length || readBar) {
  let queued = false;
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; onScroll(); }); } };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  onScroll();
}

// ---------- Hero agent-network canvas ----------
const canvas = document.querySelector(".hero-net");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, nodes = [], running = false, visible = true;
  const pointer = { x: -1e4, y: -1e4 };
  const LINK = 130;

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.round((w * h) / 10000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.8, hub: Math.random() < 0.12, hue: Math.floor(Math.random() * 3),
    }));
  }

  function draw() {
    const styles = getComputedStyle(root);
    const ink = styles.getPropertyValue("--text").trim();
    const hubs = ["--k-agent", "--k-deterministic", "--k-parallel"].map((v) => styles.getPropertyValue(v).trim());
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const dx = n.x - pointer.x, dy = n.y - pointer.y, d = Math.hypot(dx, dy);
      if (d < 110 && d > 0) { n.x += (dx / d) * 0.8; n.y += (dy / d) * 0.8; }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.globalAlpha = (1 - d / LINK) * 0.22;
          ctx.strokeStyle = ink;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.globalAlpha = n.hub ? 0.95 : 0.45;
      ctx.fillStyle = n.hub ? hubs[n.hue] : ink;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.hub ? n.r + 1.5 : n.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    draw();
    requestAnimationFrame(loop);
  }
  function setRunning(on) {
    if (on && !running && !reduceMotion) { running = true; requestAnimationFrame(loop); }
    if (!on) running = false;
  }

  resize(); draw();
  addEventListener("resize", () => { resize(); draw(); });
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("pointerleave", () => { pointer.x = pointer.y = -1e4; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning(visible && !document.hidden); }).observe(canvas);
  document.addEventListener("visibilitychange", () => setRunning(visible && !document.hidden));
  // Repaint once when the theme flips so colors update even if paused.
  new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
}
