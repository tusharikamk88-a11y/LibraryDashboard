# Apni Library Dashboard (Next.js)

This is a rewrite of your Streamlit "Apni Library" dashboard as a **Next.js** app,
so it can be deployed on **Vercel**. Streamlit apps can't run on Vercel (Vercel is
serverless, Streamlit needs a persistent server), so this app reproduces the same
look, tabs, search, and data source using React + a small serverless API route.

## What's inside

- `app/page.js` – the dashboard itself (sidebar nav, kids/adults catalogue, events, about)
- `app/api/sheet/route.js` – a serverless API route that fetches your Google Sheet
  (as CSV) and returns clean JSON. This avoids CORS issues you'd hit fetching
  Google Sheets directly from the browser.
- `app/globals.css` – styling ported from your original custom CSS
- `components/` – Sidebar, BookGrid, EventList

Your Google Sheet ID and tab names ("Catalogue kids", "Catalogue Adults", "Events")
are unchanged, so no changes are needed on the spreadsheet side.

## 1. Run it locally in VS Code

1. Open this folder in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` ``) and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser. You should see the same dashboard,
   with live data pulled from your Google Sheet.

If a page doesn't show books/events, check that your Google Sheet is still shared
as "Anyone with the link can view" — the API route needs public read access,
same as the original Streamlit app did.

## 2. Push the project to GitHub

Vercel deploys straight from a GitHub repo (easiest path):

```bash
cd apni-library-next
git init
git add .
git commit -m "Initial commit: Apni Library dashboard"
```

Then create a new empty repository on https://github.com/new (don't initialize it
with a README), and push:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## 3. Deploy on Vercel

**Option A — Vercel website (recommended, no install needed):**

1. Go to https://vercel.com and sign in (GitHub login is easiest).
2. Click **Add New → Project**.
3. Select the GitHub repo you just pushed.
4. Vercel auto-detects it's a Next.js app — leave the default build settings.
5. (Optional) Under **Environment Variables**, add `SHEET_ID` if you want to
   override the sheet without editing code.
6. Click **Deploy**.
7. After a minute or two, you'll get a live URL like
   `https://your-project.vercel.app`.

**Option B — Vercel CLI (from VS Code terminal):**

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts (accept defaults for a first deploy), then for production:

```bash
vercel --prod
```

## 4. Updating the site later

Any time you push new commits to the connected GitHub repo's `main` branch,
Vercel automatically rebuilds and redeploys. No manual redeploy step needed.

## Notes / things that changed from the Streamlit version

- Data fetching moved from Python/pandas (server-side, on Streamlit's own server)
  to a Next.js API route (`/api/sheet`) that does the same job as a serverless
  function — this is what makes the Vercel deployment possible.
- The "Reload Data" button re-fetches all three sheets on demand (there's no
  server-side cache to clear, since serverless functions are stateless).
- The favicon referenced in the original app
  (`Apni-Library-Independence-Day-Celebration.ico`) isn't included — drop your
  `.ico` file into the `app/` folder as `favicon.ico` if you'd like the browser
  tab icon back.
