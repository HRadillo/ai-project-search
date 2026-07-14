# AI Project Search Tool

An interactive concept for finding where video footage is used across Premiere Pro and After Effects projects.

The demo includes project and footage locations, creation dates, owners, name history, image-reference search, filters, usage analytics, and reusable-footage discovery.

## Run locally

```bash
pnpm install
pnpm run dev
```

## GitHub Pages

The static version is generated with:

```bash
pnpm pages:build
```

After the repository is published, the GitHub Actions workflow deploys that static version automatically whenever changes are pushed to `main`.
