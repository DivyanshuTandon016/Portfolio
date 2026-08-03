const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- mobile nav ---------- */

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ---------- active section highlight ---------- */

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ---------- header shadow on scroll ---------- */

window.addEventListener("scroll", () => {
  header?.classList.toggle("has-shadow", window.scrollY > 8);
});

/* ---------- scroll-reveal ---------- */

if (prefersReducedMotion) {
  document.querySelectorAll(".reveal, .reveal-group").forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal, .reveal-group").forEach((el) => revealObserver.observe(el));
}

/* ---------- stat count-up ---------- */

const statEls = [...document.querySelectorAll(".stat-num")];

function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\d+)(\+?)$/);
  if (!match) return; // leave non-numeric values (e.g. "∞") untouched

  const target = Number(match[1]);
  const suffix = match[2];
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (statEls.length && !prefersReducedMotion) {
  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  statEls.forEach((el) => statObserver.observe(el));
}

/* ---------- subtle portrait tilt ---------- */

const portraitFrame = document.querySelector(".portrait-frame");

if (portraitFrame && !prefersReducedMotion && matchMedia("(hover: hover)").matches) {
  const maxTilt = 5;

  portraitFrame.addEventListener("mousemove", (event) => {
    const rect = portraitFrame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portraitFrame.style.transform = `rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg)`;
  });

  portraitFrame.addEventListener("mouseleave", () => {
    portraitFrame.style.transform = "";
  });
}

/* ---------- footer year ---------- */

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
