Nova v9.4i — Start Route Fix (No HTML edits)
-------------------------------------------------
This package forces a clean launch path using Vercel routing.

Included:
- vercel.json      → rewrites "/" to /start.html
- start.html       → clears storage and redirects to categories.html

How to apply:
1) Upload BOTH files (vercel.json and start.html) to the ROOT of your repo.
2) Commit to main; in Vercel, Redeploy → Clear build cache.
3) Open your site in Incognito. Visiting "/" will now:
   - clear stale traits/categories and session
   - go directly to categories.html (clean slate).

To restore the Welcome page as your root later, remove vercel.json (or change rewrite).
