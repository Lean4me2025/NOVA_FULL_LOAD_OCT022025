Nova Patch: Results + Reflection (No SOC in Examples)
Generated: 2025-10-08 22:37:08

What this does
--------------
- Shows BOTH sections on results.html: "Your Result" and "Reflection (Looking Forward)"
- Example Occupations show **job title + salary range only** (no SOC code displayed)
- Adds an "Invest in Yourself" CTA only if one is not already present

Install (1 minute)
------------------
1) Copy `src/results_dual_render_no_soc.js` into your project's `src/` folder.
2) In `results.html`, just before `</body>`, include:
   <script src="src/nova_roles.js"></script>
   <script src="src/nova_categories.js"></script>
   <script src="src/results_dual_render_no_soc.js"></script>
