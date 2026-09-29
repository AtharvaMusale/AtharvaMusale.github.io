// Theme toggle: flips between light and dark, remembering the choice when storage is available.
document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Gentle reveal-on-scroll for cards and sections.
if ("IntersectionObserver" in window) {
  const targets = document.querySelectorAll(".card, .stat, .timeline > li, .pipeline li, .side, .post-row");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -40px 0px" });
  targets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}
