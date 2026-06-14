# Helpdesk Ticketing — Frontend

This repository contains a mobile-first Next.js frontend scaffold (app router) based on the project's FRONTEND_ARCHITECTURE_GUIDE.

Quick start (dev):

```bash
npm install
npm run dev
```

Build (production):

```bash
npm install
npm run build
```

Vercel:
- Connect this repository to Vercel. The included `vercel.json` uses the `@vercel/next` builder.
- Deploy as a Next.js app; Vercel will run `npm run build` during deployment.

Notes:
- Tailwind is configured and tested with a v3.x release for local compatibility.
- This repo is frontend-only; API calls should target your backend endpoints.

If you want, I can now:
- Add the full `components/ui` shadcn wrappers from the guide
- Wire up a sample API client and mobile navigation
- Create a small set of pages for tickets (list/detail/create)
