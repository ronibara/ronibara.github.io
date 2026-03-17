# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Rohan Barad (UX Researcher & Designer), hosted on GitHub Pages at `rohanbarad.com`. This is a static site — no build step, no package manager, no dependencies.

## Local Development

Serve locally with:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`. Deployment happens automatically on `git push` via GitHub Pages.

## Architecture

**Flat HTML structure** — each page is a standalone `.html` file sharing a common nav/footer pattern. There is no templating system or component framework; repeated markup (header, nav, footer) is duplicated across pages.

- `index.html` — landing page with hero section and project grid
- `about.html`, `work.html` — secondary pages
- `flow.html`, `ncaa.html`, `rush.html`, `shadowboxing.html`, `uber.html`, `ubetcha.html` — individual project case study pages
- `css/style.css` — single stylesheet (~2000 lines); defines all theming via CSS custom properties
- `js/theme.js` — dark/light mode toggle; persists preference in `localStorage`
- `js/menu.js` — mobile hamburger menu; auto-injects a Home link on non-index pages

## Theming System

Dark/light mode is driven entirely by CSS custom properties. Light mode variables are on `:root`, dark mode overrides are on `[data-theme="dark"]`. The `data-theme` attribute is toggled on `<html>` by `theme.js`. To change a color across both themes, update both blocks in `style.css`.

## Key Conventions

- **No JavaScript frameworks** — vanilla JS only
- **No CSS preprocessors** — plain CSS with custom properties
- External resources loaded from CDN: Font Awesome 4.7.0, Iconify 1.0.7, Google Fonts (Lato, Open Sans, Inter, Caveat)
- Google Analytics (GA4) tag `G-ENK8EJZ08D` is included in every page's `<head>`
- Custom font `RoundRohan-Regular.otf` is self-hosted in `assets/`
- `CNAME` maps the repo to the custom domain — do not delete it
