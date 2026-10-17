import type { NextConfig } from "next";

const staticExport = process.env.GITHUB_PAGES === "true";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, ""),
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: { formats: ["image/avif", "image/webp"], unoptimized: staticExport },
  ...(!staticExport ? {
    async headers() {
      return [{ source: "/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ] }];
    },
  } : {}),
};
export default nextConfig;
