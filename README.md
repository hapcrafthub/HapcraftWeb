# HapcraftWeb

The Hapcraft Media website (hapcraftmedia.com), built with Next.js (App Router) and deployed on Vercel.

```
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things are

- `src/app/` — routes (`/`, `/work`, `/about`, `/services`), `/api/contact`, sitemap, robots, manifest, icons.
- `src/components/*View.tsx` — the page content. `src/components/` also holds the shared header, menus and contact form.
- `src/lib/site.ts` — the list of pages with their titles and descriptions. The sitemap, each page's `<head>` and the structured data (JSON-LD) all read from it, so add a new page there too.
- `src/assets/` — images. `public/sw.js` removes the service worker the old (Vite) version of the site installed; leave it in place.
- `npm run brand-assets` regenerates the favicon, app icons and share image from the logo files.

## Contact form

The form on About and Services posts to `/api/contact`, which emails `support@hapcraftmedia.com` through that mailbox (GoDaddy Workspace Email SMTP). Replying to the email replies to the visitor.

Set these in Vercel (Project → Settings → Environment Variables, Production), then redeploy:

| Variable | Required | Default |
| --- | --- | --- |
| `SMTP_PASS` | yes | the password of the support@hapcraftmedia.com mailbox |
| `SMTP_USER` | no | `support@hapcraftmedia.com` |
| `SMTP_HOST` | no | `smtpout.secureserver.net` |
| `SMTP_PORT` | no | `465` |
| `CONTACT_TO` | no | `support@hapcraftmedia.com` |

Without `SMTP_PASS` the form shows an error asking visitors to email directly. For local testing put the same variables in `.env.local`.
