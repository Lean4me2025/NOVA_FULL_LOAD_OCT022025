README.txt — Nova v9.4f Patch + Note

This bundle contains:
- Nova_Completion_Note_v9_4f.txt (the locked elements + changelog)
- patches/assets/css/style.css (traits grid improvements + footer tag)
- patches/assets/js/traits.js (robust trait loading + rendering)
- patches/invest.html.snippet (ensures Payhip links open in new tabs)
- patches/footer.html.snippet (footer tag markup)

Apply Steps (Drop-in Replace)
1) Back up your current project.
2) Copy /patches/assets/css/style.css to /assets/css/style.css in your codebase (or merge the marked sections).
3) Copy /patches/assets/js/traits.js to /assets/js/traits.js (or merge the functions below into your existing JS).
4) Open your Invest page and ensure buttons/links use the provided pattern (see invest.html.snippet).
5) Ensure your pages include the CSS/JS links shown in the Completion Note.

Manual Merge Tips
- Search for “/* NOVA v9.4f PATCH START */” and “/* NOVA v9.4f PATCH END */” markers.

Expected Data Structure
- traits_with_categories.json: array of objects like { "id": "t1", "name": "Analytical", "category": "Strategy" }
- category_matrix.json: list of available categories
- ooh.json: any reference dataset you use for roles/outcomes

Contact
- If file paths differ in your project, adjust the <link> and <script> paths accordingly.
