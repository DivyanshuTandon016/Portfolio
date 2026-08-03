# Divyanshu Tandon Portfolio

Published personal portfolio for Divyanshu Tandon.

Live site: [https://dtandon.com/](https://dtandon.com/)

## Overview

This is a static portfolio website for internships, research roles, professional networking, and public viewing. Dark theme built around ASU's brand colors (maroon `#8C1D40`, gold `#FFC627`). Sections: hero, About, Projects, Experience, Education, Writings (publication + posters), Gallery, Technical Stack, and Contact.

## Project Structure

- `index.html` - page content, SEO metadata, contact links, and portfolio sections
- `styles.css` - dark ASU-themed design system: layout, cards, animations, responsive breakpoints
- `script.js` - mobile nav, active-section highlighting, scroll-reveal, stat count-up, portrait tilt
- `assets/` - resume PDF and portfolio images (lab photos are pre-rotated/compressed for web)
- `CNAME` - custom domain configuration for `dtandon.com`

## Notes on the JS-dependent animations

Scroll-reveal only hides content once an inline script in `<head>` confirms JS is
running (adds a `js` class to `<html>`). If JS fails to load for any reason, all
content stays fully visible by default - the animations are a progressive
enhancement, not a requirement for the page to work.

## Local Preview

Open `index.html` in a browser. No build step or package install is required.

## Deployment

The site is published with GitHub Pages from this repository:

[https://github.com/divtandon/Portfolio](https://github.com/divtandon/Portfolio)

The custom domain is configured through `CNAME`:

```text
dtandon.com
```

## Updating The Site

1. Edit the relevant file locally.
2. Preview `index.html` in a browser.
3. Commit and push changes to GitHub.
4. GitHub Pages will publish the update automatically.

Common updates:

- Update page text and links in `index.html`
- Adjust layout or colors in `styles.css`
- Replace images or the resume PDF in `assets/`
- Keep canonical, Open Graph, and structured-data URLs pointed to `https://dtandon.com/`
