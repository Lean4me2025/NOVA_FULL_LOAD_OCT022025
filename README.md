
# NOVA v8.3 (Full Body on Stable Skeleton)

**Flow:** Welcome → Categories → Traits → Reflections → Results (≥30% match) → Plan (Payhip + Family PIN) → Navi (subdomain).

## What's new vs 8.2a
- **Reflections step** to set context (start/switch/level up).
- **Results step** with job matching %, showing roles at or above **30%**.
- **jobs.json** dataset with required traits used for scoring.
- **Stable baseline** styling preserved (see `assets/css/STYLE_MANIFEST.json`).

## Matching Logic
- Score = (# of your selected traits that are in role’s required traits) / (required traits) × 100.
- Only roles ≥30% are shown; top matches first.
- Extend roles by editing `/assets/data/jobs.json`.
- Extend traits by editing `/assets/data/traits.json` and mapping categories.

## Deploy (New Repo)
1) Create a **new GitHub repo** (Nova_8_3 or your choice). Upload the contents of `Nova_v8_3/`.
2) In **Vercel**, import the repo (Framework: Other) → Deploy.
3) Point your root domain (e.g., `meetnovanow.com`) at this project.
4) Ensure **Navi** is deployed on its own project and mapped to `navi.meetnovanow.com`.
5) The **Plan** page button hands off to Navi when Family PIN is active.

## Private Family PIN
- Only on the Plan page. Accepted values: `FAMILY2025`, `NOVA-FAMILY`, `DREW-CLARA` (case/space-insensitive in 8.3).
