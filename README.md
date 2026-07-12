# Khorasaan Kabab & Gyro &#8212; Website

A single-page, mobile-first restaurant website for **Khorasaan Kabab & Gyro**, an Afghan halal restaurant in Brooklyn, NY.

## Features

- **Afghan-themed design** with a green, black, and gold color palette
- **Mobile-first responsive layout** with a polished hamburger drawer and prominent "Call to Order" CTA
- **Smooth scroll** with `scroll-padding-top` so anchor nav links land below the fixed header
- **Interactive menu** with expandable/collapsible categories and category filtering
- **Reviews**, gallery, hours, location, and contact sections
- No build step required &#8212; open directly in a browser

## Live Site

The site is published via **GitHub Pages** at:

- https://aba223tuk.github.io/khorasaan-kabab-gyro/

## Files

- `index.html` &#8212; page structure and content
- `styles.css` &#8212; styling, animations, and responsive layout
- `script.js` &#8212; mobile nav, scroll effects, menu filtering, active nav links

## How to View Locally

1. Open the `khorasan-kabab-gyro` folder.
2. Double-click `index.html` or open it in your browser.

Or serve it locally for the best experience:

```bash
# Using Python
python -m http.server 8000

# Then open http://localhost:8000
```

## Business Info Used

- **Name:** Khorasaan Kabab & Gyro
- **Address:** 1947 Bath Ave, Brooklyn, NY 11214
- **Phone:** (347) 312-7777
- **Website:** This website will replace the old one
- **Google Maps:** https://maps.app.goo.gl/yQWxTRjSVfmVyHBS7
- **Rating:** 4.6 / 5 (458 reviews)

## Images

The site ships with no external photo assets &#8212; every visual is built from CSS gradients, colors, and inline SVG (an Afghan-arch motif in the About section). The site is fully self-contained, with no third-party image requests, so it loads fast and works offline.

To add real photography, drop `<img>` tags inside the `.card-img` divs in `index.html` or replace the placeholder text in the gallery items.

## Notes

- Menu reflects the full Khorasaan Kabab & Gyro menu. Prices should still be verified in case they change.
- Menu card images use subtle Afghan geometric patterns. Replace them with real dish photos by editing the `.card-img` styles or swapping in `<img>` tags.
- Hours are estimated based on the listing; verify and update them as needed.
- The mobile nav uses a right-side drawer with a gold "Call to Order" CTA. Tapping any in-page link closes the drawer and smooth-scrolls to the section, offset to clear the 72px fixed header.

