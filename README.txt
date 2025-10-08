Nova H94i — Welcome Integrity (Drop-in)
---------------------------------------------
What this is:
- A drop-in replacement for: assets/js/welcome.js
- No HTML edits needed (your Welcome page already references this path).

What it does:
- Logs build/version to console for quick verification.
- Forces the Start button to go to categories.html.
- Clears local/session storage on click to prevent skipping Categories on next page.
- Warns if an older cached Welcome is being served.

How to use:
1) In GitHub, navigate to assets/js/
2) Replace the existing welcome.js with this one (same filename).
3) Commit to main; let Vercel deploy.
4) Open the Welcome page:
   - Console shows: "✅ Welcome is correct (Start -> categories.html)"
   - Clicking Start goes to Categories with a clean slate.
