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
