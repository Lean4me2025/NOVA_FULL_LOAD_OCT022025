
# Nova 8.5 Final (White Background)

One-page vanilla HTML/CSS/JS app matching Drew's requirements:

- **12 categories** (from `data/category_matrix.json`)
- **50 traits** (from `data/traits_with_categories.json`)
- **Role Reveal** with **Gold (Excellent)**, **Green (Better)**, **Silver (Good)** tiers (auto-analyzes for ~3s)
- **Reflection page** with OOH-like info from `data/ooh.json`
- **Invest-in-yourself note** + **Email & PIN save/return** via `localStorage`
- **Welcome audio** (`assets/welcome.mp3`) with autoplay fallback
- **PayHip embeds** placeholders (replace IDs to go live)

## Quick Start
Open `index.html` in a modern browser or host the folder on Vercel.

## Replace with Your Real Data
- Put your real `category_matrix.json`, `traits_with_categories.json`, and `ooh.json` in `/data` (same schema as included).
- Replace `assets/welcome.mp3` with your MP3.
- Swap the PayHip IDs in `index.html`:
  - PURPOSE_BOOK_ID, STARTER_ID, PRO_ID, MASTERY_ID

## Return Users
- Header has "Email + PIN" quick unlock.
- Saves selections and results to `localStorage` with key `nova:<email>:<pin>`.

(c) 2025 Nova
