import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "OtavioRezende-site/personal-trainer-premium-base").split("/");
const defaultPath = repository.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repository}`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? defaultPath;
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) throw new Error("Invalid NEXT_PUBLIC_BASE_PATH");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${owner.toLowerCase()}.github.io${basePath}/`;
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
writeFileSync("out/.nojekyll", "");
console.log(`Static site ready in out/ for ${siteUrl}`);
