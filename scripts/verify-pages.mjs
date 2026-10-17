import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { chromium } from "@playwright/test";

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "OtavioRezende-site/personal-trainer-premium-base").split("/");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? (repository.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repository}`);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${owner.toLowerCase()}.github.io${prefix}/`;
const root = resolve("out");
assert.ok(existsSync(resolve(root, ".nojekyll")), "Run npm run build:pages first");
const html = readFileSync(resolve(root, "index.html"), "utf8");
assert.ok(html.includes(`content="${new URL(siteUrl).origin}${prefix}/opengraph-image.png"`), "Social image URL must include exactly one project prefix");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://preview.local").pathname);
    if (!path.startsWith(`${prefix}/`)) { res.writeHead(404).end(); return; }
    let file = resolve(root, `.${path.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) { res.writeHead(404).end(); return; }
    if (statSync(file).isDirectory()) file = resolve(file, "index.html");
    const stat = statSync(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream", "Content-Length": stat.size });
    createReadStream(file).pipe(res);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}${prefix}/`;
let browser;
try {
  browser = await chromium.launch(existsSync("/usr/bin/chromium") ? { executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] } : {});
  for (const [width, height] of [[390,844],[820,1180],[820,768],[1440,900]]) {
    const context = await browser.newContext({viewport: {width,height}});
    const page = await context.newPage();
    const failures = [], videoSources = new Set();
    page.on("pageerror", error => failures.push(error.message));
    page.on("response", response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
    page.on("request", request => { if (request.url().endsWith(".mp4")) videoSources.add(new URL(request.url()).pathname); });
    assert.equal((await page.goto(url)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("video").waitFor();
    const expectedSource = width >= 1024 || width >= 768 && width > height ? "desktop" : "mobile";
    assert.equal(await page.locator("video").getAttribute("src"), `${prefix}/videos/hero-${expectedSource}.mp4`);
    await page.waitForFunction(() => document.querySelector("video")?.readyState >= 2);
    await page.getByRole("button", {name:"Começar minha evolução"}).click();
    assert.ok(await page.getByRole("dialog",{name:/UMA BOA CONVERSA/}).isVisible());
    await page.keyboard.press("Escape");
    await page.getByRole("tab",{name:/Acompanhamento online/}).click();
    assert.ok(await page.getByRole("tabpanel",{name:/Acompanhamento online/}).isVisible());
    await page.evaluate(async () => {
      for (let y=0; y<document.body.scrollHeight; y+=700) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,25)); }
    });
    await page.waitForFunction(() => [...document.querySelectorAll("main img")].filter(i=>i.getBoundingClientRect().width>0).every(i=>i.complete && i.naturalWidth>0));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.getByRole("link",{name:"Privacidade",exact:true}).click();
    await page.waitForURL(`${url}privacidade/`);
    await page.reload();
    assert.ok((await page.locator("h1").textContent()).includes("SUA PRIVACIDADE"));
    assert.deepEqual(videoSources, new Set([`${prefix}/videos/hero-${expectedSource}.mp4`]));
    assert.deepEqual(failures, []);
    console.log(`PASS Pages ${width}x${height}: video, images, contact, tabs, navigation, direct privacy route and no overflow`);
    await context.close();
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
