import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://redirect.example${path}`, {
      headers: { accept: "text/html", host: "redirect.example", "x-forwarded-proto": "https" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the branded redirect page and destination", async () => {
  const response = await render("/seo?q=tools");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Growth Tools has moved · Gingiris<\/title>/i);
  assert.match(html, /Growth Tools/);
  assert.match(html, /has <em>moved\.<\/em>/);
  assert.match(html, /https:\/\/tools\.gingiris\.com/);
  assert.match(html, /Redirecting securely/);
  assert.match(html, /https:\/\/redirect\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("client redirect preserves the current path, query, and hash", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /window\.location\.pathname/);
  assert.match(source, /window\.location\.search/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /window\.location\.replace\(getDestination\(\)\)/);
  assert.match(source, /https:\/\/tools\.gingiris\.com/);
});
