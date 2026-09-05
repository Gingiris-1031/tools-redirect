# Gingiris Growth Tools redirect

A zero-dependency static redirect page for the new Growth Tools home:
`https://tools.gingiris.com`.

Visitors see a branded transition screen for three seconds before being sent to
the matching path, query string, and hash on the new domain. A direct link is
available if automatic redirection is blocked.

## Local preview

Run any static file server from the repository root, for example:

```bash
python3 -m http.server 8000
```

## Deployment

Push to `main`. The GitHub Actions workflow publishes the repository as a
GitHub Pages site. In the repository settings, set **Pages → Source** to
**GitHub Actions** once if it is not already selected.

## Test

```bash
node --test tests/static-site.test.mjs
```
