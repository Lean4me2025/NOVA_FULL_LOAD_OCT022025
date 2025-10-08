Nova v9.4d — Invest Page Patch (layout + product URLs)

What this does
1) Moves the green "Choose ..." button to the RIGHT of the plan title on desktop/tablet (stacks on mobile).
2) Sets each button to the exact product URL you provide (no more homepage links).

How to apply (2-minute drop-in)
1) Copy the 'assets' and 'data' folders from this patch into your deployed build (merge folders).
2) In invest.html, include these files AFTER your main stylesheet and BEFORE the closing </body> tag:

   <!-- layout fix (after style.css) -->
   <link rel="stylesheet" href="assets/css/invest.layout.css" />

   <!-- pricing URL override (near end of body) -->
   <script src="assets/js/pricing.override.js"></script>

3) Edit 'data/pricing_links.json' and paste your real product links:
   - For Square Online: use the 'Share product' URL (looks like .../product/product-name/XXXXXXXX)
   - For Payhip: use the direct product link (.../b/XXXX)

Example pricing_links.json:
{
  "starter": "https://your-site.square.site/product/navi-starter-plan/ABC123",
  "pro":     "https://your-site.square.site/product/navi-pro-plan/DEF456",
  "mastery": "https://your-site.square.site/product/mastery-plan/GHI789",
  "book":    "https://your-site.square.site/product/purpose-book/JKL101"
}

Notes
- Safe, isolated patch: it only affects invest.html.
- If an URL is missing, nothing breaks — the button keeps its existing link.