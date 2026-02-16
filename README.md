# IFTY
I'm Fine Thank You!

## What I added

- A static web app at `app/index.html` (the UI you provided, with small improvements).
- `package.json` with a `start` script for local testing.
- `Dockerfile` to build a container serving the static site via nginx.
- A GitHub Actions workflow at `.github/workflows/pages.yml` to publish the `app` folder to GitHub Pages when you push to `main`.

## Run locally

Install nothing globally — you can run the site with `npx`:

```bash
npm start
# opens at http://localhost:8080
```

## Docker

Build and run:

```bash
docker build -t im-fine-thank-you .
docker run -p 80:80 im-fine-thank-you
# then open http://localhost
```

## Deploy to GitHub Pages

Push the repository to GitHub (to `main`) and the included GitHub Action will publish the `app` directory to GitHub Pages automatically. The action uses the default `GITHUB_TOKEN` so no secrets needed.

If you prefer Vercel or Netlify, you can also deploy by pointing them at this repo — the `app` folder is a static site.

## Next steps I can do for you

- Commit & push the changes and trigger the Pages deploy for you (requires repo push access).
- Replace the script `API` endpoint with a self-hosted endpoint and add a simple Node/Express receiver if you want to collect reports in your own backend.

