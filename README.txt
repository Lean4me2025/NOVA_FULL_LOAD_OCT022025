README — Nova v9.4h (H94H) Patch

How to apply (2-minute drop-in):
1) Add <link> and <script> tags below to your welcome page (or global layout) so the CSS/JS load.
2) (Optional) Paste the two small text snippets where indicated on their pages.
3) Replace your Invest buttons with the Payhip embed snippet.

Add to <head> (or your bundle includes):
<link rel="stylesheet" href="/assets/css/welcome_inject.css">
<script src="/assets/js/welcome_inject.js" defer></script>

Files:
- assets/css/welcome_inject.css               -> ensures Welcome is visible
- assets/js/welcome_inject.js                 -> inserts H1 above the 89% line automatically
- snippets/welcome_time_text.snippet.html     -> replace time estimate text
- snippets/reflection_roles_text.snippet.html -> replace 'Try these roles:' with 'Discover these roles:'
- snippets/invest_payhip_buttons.snippet.html -> exact Payhip embed buttons

The injector searches the page for the first element containing the text
“89% of people do not know their purpose.” and inserts the H1 immediately before it.
If that text is inside a nested element, the script still inserts correctly.
