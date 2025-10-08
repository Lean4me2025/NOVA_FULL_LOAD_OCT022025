Nova Add‑On: Invest in Yourself Page
Generated: 2025-10-08 22:22:16

What this is
------------
A drop‑in page (`invest.html`) that you can link to *after* Reflection. It shows your Payhip buttons
for Starter, PRO, Mastery, and the Purpose book — using the green theme you prefer.

How to add it
-------------
1) Copy `invest.html` into the root of your Nova project (same folder as `index.html`).
2) Ensure Payhip's script is loaded site‑wide once in `<head>`:
   <script type="text/javascript" src="https://payhip.com/payhip.js"></script>
   (The page includes it defensively too. Duplicates are safe.)
3) Add a button on your Reflection/Results step that routes to `invest.html`:
   <a class="cta" href="invest.html">Invest in Yourself</a>

Optional styling
----------------
- The page uses dark theme colors to match Nova. You can paste its CSS into your main stylesheet
  if you prefer.
