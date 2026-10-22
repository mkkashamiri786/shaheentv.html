# Shaheen TV Developers website (modular)

## Folder structure
- `index.html`: stable page shell. Normally you do not need to edit this file.
- `css/style.css`: website styling.
- `js/content.js`: loads the JSON content files and renders the page.
- `js/main.js`: scroll effects, counters, reveal animations.
- `js/carousel.js`: screenshot carousel.
- `js/download.js`: download button effects.
- `data/downloads.json`: **add, edit or remove download links here**.
- `data/screenshots.json`: add, edit or remove screenshot image URLs here.
- `data/site.json`: brand, hero text, statistics, WhatsApp link, ticker and app copy.
- `data/features.json`: feature cards.
- `data/services.json`: service cards.
- `data/navigation.json`: navigation links.

## Edit download links
Open `data/downloads.json`. Add another object inside `links`, or remove an object to remove a download button. Each link uses:
- `title`: visible heading
- `description`: small supporting text
- `badge`: optional badge text
- `icon`: icon image URL
- `url`: actual destination URL
- `newTab`: optional `true` to open in a new tab

Keep JSON syntax valid: use double quotes and commas between objects. The `index.html` file does not need changes.

## Important for Vercel / GitHub Pages
This version fetches JSON files at runtime, so preview it through a web server or deploy it to Vercel/GitHub Pages. Opening `index.html` directly as a `file://` page may block `fetch()` and prevent JSON content from loading.

## Upload
Upload the whole project structure, keeping `css`, `js`, and `data` folders at the repository root. Deploy the repository root as a static site.
