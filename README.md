# Khorasaan Kabab & Gyro &#8212; Website

A single-page, mobile-first restaurant website for **Khorasaan Kabab & Gyro**, an Afghan halal restaurant in Brooklyn, NY.

## Features

- **Afghan-themed design** with a green, black, and gold color palette
- **Clean background photography** on hero, menu, popular, reviews, gallery, contact, and footer sections
- **Smooth scroll animations** and hover effects
- **Mobile-optimized** hamburger navigation
- **Interactive menu** with expandable/collapsible categories and filtering
- **Reviews**, gallery, hours, location, and contact sections
- No build step required &#8212; open directly in a browser

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

The site uses curated Unsplash photos as placeholder background images:

- Hero: grilled meat/kebab
- About: Afghan spices
- Menu: food spread
- Popular: family dining + chicken and lamb food shots
- Reviews: cozy restaurant ambiance
- Gallery: restaurant ambiance, kababs, rice, gyros, family dining, ingredients
- Contact: restaurant interior
- Footer: spice market

To use your own photos, replace the `url('https://images.unsplash.com/...')` values in `styles.css` with paths to local images, e.g. `url('images/hero.jpg')`.

## Notes

- Menu reflects the full Khorasaan Kabab & Gyro menu. Prices should still be verified in case they change.
- Menu card images use subtle Afghan geometric patterns. Replace them with real dish photos by editing the `.card-img` styles or swapping in `<img>` tags.
- Hours are estimated based on the listing; verify and update them as needed.

