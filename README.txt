Nova v9.4i — Traits Gatekeeper (Drop-in)
---------------------------------------------
This is a direct replacement for: assets/js/traits.js

What it does:
- If this session hasn't completed Categories (sessionStorage.nova_stage !== 'categories_done')
  OR Start wasn't clicked this run (sessionStorage.nova_run_started !== '1'),
  it clears stale selections and redirects to categories.html.

How to use:
1) In GitHub, navigate to assets/js/
2) Replace the existing traits.js with this one (same filename).
3) Commit to main; Vercel will auto-deploy.
4) Test in Incognito.

Expected result:
- Welcome → Start → Categories (not Traits)
- Traits only loads after Categories; no preselected items.
