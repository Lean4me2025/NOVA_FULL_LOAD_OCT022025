# Nova + Navi (v8.4) — Final Minimal Release

**Built:** 2025-10-07

This is a lightweight, deploy-ready build for Nova → Navi. It runs fully client-side and persists state in localStorage.

## What’s Included
- Welcome → Categories → Traits → Results → Reflection → Plans → Navi
- PIN/username capture (local only)
- Category + trait selection with green-outline highlights
- Simple match engine v0 (keyword + category overlap) using your OOH dataset
- Results table + **Print to PDF**
- Plan selection with Payhip links (set in `/assets/config.json`)
- Navi bridge dashboard (top matches, quick resume/cover drafts, job and training links)

## Required Data Files
Place these in `/data/` before deploying:
- `traits_with_categories.json`
- `category_matrix.json`
- `ooh.json`

### Flexible Formats
- `category_matrix.json`: either `["Technology","Healthcare",...]` **or** `{ "Technology":[...], "Healthcare":[...] }`
- `traits_with_categories.json`: either `[{id,name,category}, ...]` **or** `{ "traits":[...] }`
- `ooh.json`: `[{title, summary, soc_code, categories?}, ...]`

## Payhip
Update `/assets/config.json` with your Payhip product URLs. Buttons open in a new tab; plan selection is also stored locally for bridge continuity.

## PDF Export
Click **Export as PDF** on the Results page (uses the browser's print-to-PDF).

## Deploy on Vercel
1. Upload the entire folder to your repo (or drag-drop on Vercel).
2. Framework preset: **Other / Static**.
3. Build command: (none) • Output directory: `/` (root).
4. Ensure `data/` contains your three JSON files.
5. Connect domain: `MeetNovaNow.com` → Nova; link `MyNovaWork.com` or subdomain to `/navi.html` if desired.

## Notes
- This is intentionally lean and stable. You can layer audio welcome, advanced PDF, and authenticated backends later.
- If your OOH file does not include categories, the match engine falls back to trait keyword matches in title/summary.
- All state is local to the device (no backend).

— With care, for Drew.
