# Talha Blueprint Portfolio — V1

A data-driven static portfolio inspired by construction drawing sets.

## V1 features
- Responsive drawing-sheet visual language
- Animated project timeline and category layers
- Project/research/contact sections
- Admin page with editable content
- Five theme presets + custom colors/fonts/line weight/grid/motion controls
- Browser draft persistence
- JSON import/export and advanced raw data editing
- Optional GitHub-backed publishing API for Vercel

## Publish configuration
Set these environment variables in Vercel (do not commit secrets):
- `GITHUB_TOKEN` — fine-grained token with Contents read/write access to the repository
- `ADMIN_PUBLISH_KEY` — private key required by the admin publish action
- `GITHUB_REPO` — defaults to `TalhaShaharyar/bimetryx-digital-hub`
- `GITHUB_BRANCH` — defaults to `main`

The serverless endpoint updates `portfolio-v1/data/site.json`. Because the Vercel project is linked to GitHub, the commit triggers a redeploy.
