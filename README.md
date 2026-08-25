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
index.html                  the brand site
products.html               the product catalogue
assets/
  css/style.css             brand tokens, grain, gradients, all animation CSS
  js/app.js                 shared interaction modules, no dependencies
  img/brand/                logotype + eight business banners
  img/designs/              ten sample designs
  img/products/             13 products x card+full WebP (91 files, 6.2 MB)
  img/team/                 (empty — drop team headshots here)
```

`products.html` is generated from a manifest, but it is committed as plain HTML —
edit it directly like any other page.

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

### products.html

| # | Section | What's in it |
|---|---------|--------------|
| — | Hero | Campaign poster, style/shot counts, catalogue marquee |
| 01 | The range | 13 product boxes, filterable by category, multi-shot lightbox |
| 02 | Colourways | Six fabric colours (click to copy) + size range + customisation |
| 03 | Lookbook | Two full-bleed campaign shots |

**The 13 products — 44 shots in total.** Click any box to page through that product's shots.

| # | Product | Colourway | Shots |
|---|---------|-----------|-------|
| 01 | Varsity Jacket | Maroon / Cream | 5 |
| 02 | Varsity Jacket | Navy / Cream | 6 |
| 03 | Wool Coach Jacket | Maroon | 5 |
| 04 | Zip Hoodie | Maroon — Semi Seniors 2027 | 3 |
| 05 | Seniors Hoodie | Maroon (SENIORS★ back print) | 5 |
| 06 | Quarter Zip | Black | 7 |
| 07 | Quarter Zip | Maroon | 2 |
| 08 | Heritage Tee | Emerald — KSA Emblem | 2 |
| 09 | Heritage Tee | Emerald — Wave Print | 2 |
| 10 | Heritage Tee | Cream — Wave Print | 2 |
| 11 | Heritage Tee | Navy — KSA Emblem | 2 |
| 12 | Heritage Tee | Cream — Portrait Print | 2 |
| 13 | ERA University Tote | Natural Canvas | 1 |

Every unique image in the source folder is placed against a product — nothing is orphaned.
Three shots do double duty: two also serve as lookbook images, and the tote shot also
belongs to the black quarter zip.

There is **no sweatpants product** on the page. Sweatpants appear styled in many shots,
but the source folder has no standalone sweatpants shot to build a box around — add one
and it becomes a 14th product.

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

### About the product photography

Every shot on `products.html` came from the `yaser` folder, and the source filenames
(`Gemini_Generated_Image_*`) say they are **AI-generated renders, not photographs of
manufactured stock**. That is completely normal for concept and pre-order presentation —
but a customer looking at the catalogue cannot tell the difference. Before you push this
to a class, decide whether to:

- label the page as concept renders / pre-production visuals, or
- replace the renders with photos of real samples as they come off the line.

Two other things to check on that page: the **Heritage Tee — Portrait Print** carries a
likeness of a public figure, and several tees carry Saudi state symbols. Confirm you are
clear to sell both before taking orders.

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
`loading="lazy" decoding="async"`.

Product images are **WebP at two sizes** — an 820px card and a 1500px full, never upscaled
above the source. The 44 product shots plus 3 campaign shots come to 6.2 MB on disk, but a
first visit to `products.html` only pulls the 13 visible cards (~15–75 KB each); full sizes
load on demand when the lightbox opens.

The Arabic face is **Tajawal**; English keeps Bodoni Moda (display), Anton (poster) and
Inter (body).

The brand and design images on `index.html` are still JPEG (~2.0 MB). Converting those to
WebP the same way would cut them by roughly 60–70%.

---

## Original assets

The source WhatsApp exports are still in the project root. Everything the site uses was
copied and renamed into `assets/img/`, so the originals can be archived or deleted.
