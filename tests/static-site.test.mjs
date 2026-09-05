import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("static page points only to the new Growth Tools domain", async () => {
  const [html, script, workflow] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("redirect.js", root), "utf8"),
    readFile(new URL(".github/workflows/deploy-pages.yml", root), "utf8"),
  ]);
  assert.match(html, /Growth Tools has moved/);
  assert.match(script, /https:\/\/tools\.gingiris\.com/);
  assert.doesNotMatch(`${html}\n${script}`, /https:\/\/gingiris\.tools/);
  assert.match(script, /window\.location\.pathname/);
  assert.match(script, /github\.io/);
  assert.match(script, /\/tools-redirect/);
  assert.match(script, /window\.location\.search/);
  assert.match(script, /window\.location\.hash/);
  assert.match(script, /window\.location\.replace\(destination\)/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
