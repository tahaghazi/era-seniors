# ERA SENIORS — Landing Page

A single-page portfolio site for **ERA Seniors** (est. 2026) — graduation-class apparel,
designed and manufactured in-house.

Built with plain HTML, TailwindCSS (CDN) and dependency-free vanilla JS.

---

## Run it

Just open `index.html` in a browser. TailwindCSS and Google Fonts load from CDN,
so you need an internet connection the first time.

Or serve it locally:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

---

## Structure

```
index.html                  the whole page
assets/
  css/style.css             brand tokens, grain, gradients, all animation CSS
  js/app.js                 16 interaction modules, no dependencies
  img/brand/                logotype + the four business banners
  img/designs/              ten sample designs
  img/team/                 (empty — drop team headshots here)
```

---

## Sections

| # | Section | What's in it |
|---|---------|--------------|
| — | Hero | Kinetic `ERA` logotype, parallax poster fragments, brand marquee |
| 01 | Manifesto | The brand line + stat strip |
| 02 | Story | Your Arabic copy verbatim — who we are, هدفنا, والأهم — each with an English translation |
| 03 | Brand identity | Logo lockups, 10-colour palette, type specimen |
| 04 | Banners | Drag-scrollable strip of all eight business banners |
| 05 | Sample designs | Filterable 10-piece gallery with lightbox |
| 06 | Team | Four cards (placeholders — see below) |
| 07 | Process | Your seven-stage pipeline: التخطيط → التصميم → القماش → التنفيذ → التدقيق → التغليف → النقل |
| 08 | Contact | Enquiry form that hands off to WhatsApp or email |

---

## Things to fill in

Search `index.html` for **`REPLACE ME`** — there are four:

1. **Team names** (`#team`) — four cards currently read *"Your Name"*. Swap the names and roles.
   To add photos, drop files in `assets/img/team/` and replace the monogram
   `<span class="team-card__img …">A</span>` with:
   ```html
   <img src="assets/img/team/name.jpg" alt="" class="team-card__img w-full h-full object-cover">
   ```

2. **WhatsApp number** — on the `<form id="enquiry">` tag:
   ```html
   data-whatsapp="201234567890"   <!-- country code + number, digits only -->
   ```
   Leave it empty and the form falls back to email instead.

3. **Email address** — `hello@eraseniors.com` appears in the contact list and in
   `data-email` on the same form.

4. **"Within 24 hours"** — a response-time promise written for you, not one you stated.
   It appears twice in the contact section. Confirm it or change it.

### Claims to confirm

Everything below was written to fit your brand, but is not something your deck states.
It is all live on a public URL, so it is worth a read-through:

| Claim | Where | Basis |
|---|---|---|
| `100%` in-house production | Manifesto stat strip | Inferred from "طلبة وأصحاب المصانع" |
| `02` collections live | Manifesto stat strip | Seniors + Semi/Seniors 2027 |
| `S–XXL` size range | Manifesto stat strip | From the FUTURES poster ("SIZE XXL – S") |
| Team roles (4 cards) | Team section | Inferred from your story |
| Stage descriptions (7) | Process section | Stage *names* are yours; the one-liners are written copy |
| "Within 24 hours" | Contact | Written copy |

`EST. 2026`, `@era_seniors`, the manifesto line, the collection names and the seven
process stage names all come directly from your assets.

---

## Brand tokens

Defined once at the top of `assets/css/style.css` and mirrored in the Tailwind config
inside `index.html`. Change them in both places to re-skin the site.

| Token | Hex | Use |
|-------|-----|-----|
| Deep Wine | `#4A0A14` | Primary background gradient |
| Maroon | `#6B1220` | Gradient mid-tone, product colourway |
| Burgundy Rose | `#A81F3D` | Gradient highlight |
| Poster Red | `#D62128` | Campaign accent, CTA hover |
| Marigold | `#F5A623` | Secondary campaign accent |
| Champagne | `#F3D3BA` | Logotype, primary UI accent |
| Bone | `#F1EFE6` | Body text, inverse backgrounds |
| Varsity Navy | `#1E2749` | Jacket colourway |
| Mocha | `#8A5A44` | Warm gradient tint |
| Ink | `#0F0F12` | Page background |

---

## Interactions

Preloader with real image-decode progress · custom trailing cursor with contextual
labels · per-character hero reveal · **hero scroll-exit** (drift, swell, fade) ·
**section labels that decode themselves on first view** (character pool drawn from the
target string, so Arabic scrambles with Arabic glyphs) · **ambient light drifting across
the gradient sections** · IntersectionObserver scroll reveals with auto-stagger ·
scroll-linked parallax · magnetic buttons · 3D card tilt · velocity-reactive marquees ·
animated counters · scroll-spy nav + progress bar · click-to-copy colour swatches ·
gallery filtering · keyboard- and swipe-navigable lightbox · drag-to-scroll banner strip ·
EN/AR toggle with RTL switching · form validation with WhatsApp/email handoff.

**Story section** is its own scroll sequence: a chapter rail that fills with reading
progress, three chapter dots, word-by-word illumination on every Arabic paragraph and its
translation, clip-path panel wipes with four parallax rates, and a one-shot sheen across
each chapter card.

Everything respects `prefers-reduced-motion`, and the custom cursor, magnetics and tilt
only activate on fine-pointer devices.

## Performance notes

Images carry explicit `width`/`height` (no layout shift) and everything below the fold is
`loading="lazy" decoding="async"`. Total image payload is **~2.0 MB** across 18 JPEGs.
Converting them to WebP would cut that by roughly 60–70% — worth doing before you push the
link to a whole graduating class on mobile data.

---

## Original assets

The source WhatsApp exports are still in the project root. Everything the site uses was
copied and renamed into `assets/img/`, so the originals can be archived or deleted.
