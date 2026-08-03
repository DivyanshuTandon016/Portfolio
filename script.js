const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenu(open) {
  nav?.classList.toggle("is-open", open);
  navToggle?.setAttribute("aria-expanded", String(open));
  navToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

navToggle?.addEventListener("click", () => {
  setMenu(!nav?.classList.contains("is-open"));
});

navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("is-open")) return;
  if (!nav.contains(event.target) && !navToggle?.contains(event.target)) setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) setMenu(false);
});

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-30% 0px -62% 0px", threshold: 0 }
  );
  observedSections.forEach((section) => sectionObserver.observe(section));
}

function updateHeader() {
  header?.classList.toggle("has-shadow", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = [...document.querySelectorAll(".reveal, .reveal-group")];
const revealAll = () => revealTargets.forEach((element) => element.classList.add("is-visible"));

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealAll();
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7% 0px", threshold: 0.02 }
  );
  revealTargets.forEach((element) => revealObserver.observe(element));
  window.setTimeout(revealAll, 1800);
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
