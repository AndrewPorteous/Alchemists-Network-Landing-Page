# Alchemists Network Website

Static, mobile-first website prepared for Vercel.

## Main route
- `/` — community landing page
- `/experts/` — reserved for the future expert journey

## Updating WhatsApp invite links
Edit only `js/config.js`. All five WhatsApp destination URLs are centralized there.

## V2 feedback implemented
- Larger, clearer brand presence in the sticky header
- Explicit “Alchemists Network” heading in the hero
- Header includes the brand tagline
- New professional collaboration image with no bottles/table clutter
- Hero information card moved below the image so it no longer overlaps the picture
- “Free to join • Global • Built around real human connection” is clickable and scrolls to the interest categories
- Section spacing reduced substantially
- Secondary buttons use the same subtle hover movement as primary buttons
- Navigation links now also receive subtle hover movement

## Local preview
From this folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## V6 (6 Oct 2026) - join form + update page
Built on the live v4 code (identical to the zip Vanesa sent on 30 Sep).
- Topic cards and both "Join General" buttons open the GoHighLevel join form (section `#join`) instead of going straight to WhatsApp.
- `js/config.js`: paste the join form ID into `ghlFormId` and the existing-members form ID into `ghlUpdateFormId`. Until then the site works exactly like v4 and `/update/` shows "opens very soon".
- `js/main.js`: remembers tracking links (utm_*, ref) and the chosen topic, and passes them to the form.
- `/join/`: GoHighLevel redirects here after the form; it opens the right WhatsApp group.
- `/update/`: form for existing WhatsApp members (link to share in the Announcements group).
- `css/styles.css`: join form styles added at the end.
- `/privacy/` and `/terms/`: interim versions ("company registration in progress", no address). Replace the "Who we are" sections and the governing-law line once the legal entity exists.
- Footer Privacy/Terms links now work on every page; the join section shows a short consent line under the form.

## V7 (6 Oct 2026) - speed, mobile and SEO
Built on v6. Changes:
- Images converted to WebP at the size they are shown (2-3x for sharp screens). Page images: about 15 MB -> about 0.6 MB. Original PNGs stay in the v4/v6 folders.
- Hero and "inside" photos load in two sizes (800px / 1400px); the phone downloads the small one.
- All images have width/height (no jumping while loading); images below the first screen load lazily.
- New share image `assets/og-image.jpg` (1200x630) for Facebook/LinkedIn/WhatsApp previews.
- Head: OpenGraph + Twitter card tags, language tag, Organization + WebSite structured data (JSON-LD), favicon.
- One H1 ("Alchemists Network"); section headings H2, card titles H3. "Value That Transforms" is now a styled paragraph.
- Footer tagline removed (tagline stays in the header).
- Fluid headings for small phones; all buttons/links at least 48px tall.
- Copy: long paragraphs split, key phrases bolded (words unchanged). See "v7 copy before-after".

## V8 (9 Oct 2026) - consents, legal notice, full legal texts
Built on v7. Changes:
- Consent line under the join form: 18+, Terms of Service, Privacy Policy, WhatsApp visibility. The only checkbox (optional marketing) lives inside the GoHighLevel form.
- /update/ page shows the same consent line for existing members.
- New /legal-notice/ page (Impressum). Footer on every page: Privacy · Terms · Legal notice.
- Full Privacy Policy and Terms of Service with the temporary operator A&M Business Communication UG (haftungsbeschränkt), Kirchstr. 126, 47509 Rheurdt, Germany, Managing Director Andrew A. Porteous. Version 2026-10, updated 9 October 2026.
- When the operator company changes: update section 1 of privacy and terms, and the legal notice page.
