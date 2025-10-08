Nova v9.4c — "Purpose Meets Outlook"
Discover Purpose. Live It Boldly.

Included
- Guided Start Overlay (10–15 min intro + checkbox)
- Cinematic Welcome (tagline + fade)
- Categories → Traits → Role Reveal
- Reflection (Two Steps: Look Back, Look Forward), mandatory selection
- Invest grid (Starter | Pro | Mastery | Purpose Book)
- Career Snapshot on Reflection (OOH-style via /data/*.json)
- Navi handoff object (localStorage: novaHandoff, includes novaVersion)
- Version footer + console log

Handoff JSON
{
  "selectedTraits": [...],
  "revealedRole": "...",
  "categoriesChosen": [...],
  "reflectionChoice": "...",
  "timestamp": "...",
  "novaVersion": "9.4c"
}

Deploy
1) Upload all files to your GitHub repo and deploy via Vercel.
2) Ensure /data/ JSON files are served; use static hosting with correct paths.
3) Test flow: GuidedStart → Welcome → Categories → Traits → Role → Reflection (Back/Forward) → Invest.
4) Open DevTools console to verify version tag.
