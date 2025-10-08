Nova H94i — One-Click Reset Page
------------------------------------
This adds a simple page you can visit to clear all saved Nova selections
(localStorage + sessionStorage) and redirect to the Welcome page.

How to use:
1) Upload reset.html to the root of your repo (same level as index.html).
2) Deploy to Vercel.
3) In your browser, open: https://<your-domain>/reset.html
   (e.g., https://nova-full-load-oct-022025.vercel.app/reset.html)
4) It will show "Resetting Nova…" for a moment, wipe saved data, then send you to the Welcome page.

Use this whenever traits/categories feel "stuck" across deployments.
