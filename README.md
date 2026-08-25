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

Search `index.html` for **`REPLACE ME`** — there are three:

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

Also worth checking: the stat strip in the Manifesto section (`2026 / 02 / S–XXL / 100%`).
The seven process stages come straight from your own diagram; only the one-line description
under each stage is written copy, so adjust any that don't match how you actually work.

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
labels · per-character hero reveal · IntersectionObserver scroll reveals with auto-stagger ·
scroll-linked parallax · magnetic buttons · 3D card tilt · velocity-reactive marquees ·
animated counters · scroll-spy nav + progress bar · click-to-copy colour swatches ·
gallery filtering · keyboard- and swipe-navigable lightbox · drag-to-scroll banner strip ·
EN/AR toggle with RTL switching · form validation with WhatsApp/email handoff.

Everything respects `prefers-reduced-motion`, and the custom cursor, magnetics and tilt
only activate on fine-pointer devices.

---

## Original assets

The source WhatsApp exports are still in the project root. Everything the site uses was
copied and renamed into `assets/img/`, so the originals can be archived or deleted.
