Nova H94i RoleFix — Reflection Page Patch
------------------------------------------------
Includes:
- reflection_look_forward.html (main fix, line updated to "Discover these roles:")
- role_text_hotfix.js (runtime fallback for cached builds)

Usage:
Option 1: Replace reflection_look_forward.html in your repo and redeploy.
Option 2: Keep your file, add <script src="role_text_hotfix.js"></script> before </body>.

Either way, it will display "Discover these roles:" correctly after deployment.
