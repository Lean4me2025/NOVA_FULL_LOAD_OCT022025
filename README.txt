Nova H94i — FlowGuard Patch
-----------------------------------
Purpose: Fix navigation order (Welcome → Categories → Traits) and stop preselected traits.
Includes:
1. welcome_flow_fix.js      — ensures clean start and directs to Categories
2. categories_stage_set.js  — marks session as 'categories_done'
3. traits_gatekeeper.js     — prevents skipping Categories or loading old traits

How to apply:
- Add the corresponding <script src="..."> tag for each file into your pages as described below.

1️⃣ index.html (Welcome)
   Add: <script src="welcome_flow_fix.js"></script> before </body>

2️⃣ categories.html
   Add: <script src="categories_stage_set.js"></script> before </body>

3️⃣ traits.html (or traits.js)
   Add: <script src="traits_gatekeeper.js"></script> at top or before traits code

Result:
- Always flows Welcome → Categories → Traits.
- Clears stale selections each run.
