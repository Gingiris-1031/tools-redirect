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
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /我们搬家了。/);
  assert.match(html, /data-language="zh-CN"/);
  assert.match(html, /data-language="en"/);
  assert.match(script, /defaultLanguage = "zh-CN"/);
  assert.match(script, /tools-redirect-language/);
  assert.match(script, /https:\/\/tools\.gingiris\.com/);
  assert.match(html, /id="countdown">6</);
  assert.match(html, /将在 6 秒后跳转/);
  assert.match(script, /redirectSeconds = 6/);
  assert.doesNotMatch(`${html}\n${script}`, /https:\/\/gingiris\.tools/);
  assert.match(script, /window\.location\.pathname/);
  assert.match(script, /github\.io/);
  assert.match(script, /\/tools-redirect/);
  assert.match(script, /window\.location\.search/);
  assert.match(script, /window\.location\.hash/);
  assert.match(script, /window\.location\.replace\(destination\)/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
