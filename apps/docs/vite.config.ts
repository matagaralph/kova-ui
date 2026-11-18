import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { fumadocsMdx } from "fumadocs-mdx/vite"
import { readdirSync } from "node:fs"
import path from "node:path"
import { defaultClientConditions, defaultServerConditions, defineConfig } from "vite"

import { platformUIRequiredPlugins } from "../../postcss.config.mjs"

const CONTENT_DIR = path.resolve(import.meta.dirname, "content/docs")

/** The site is served under this path, like `/kova-ui/` on GitHub Pages */
const base = process.env.DOCS_BASE_PATH?.replace(/\/?$/, "/") ?? "/"

/** `/docs/...` for every content page, and the Markdown file next to each one */
function docsPaths() {
  const files = readdirSync(CONTENT_DIR, { recursive: true, encoding: "utf8" })
  return files
    .filter((file) => /\.mdx?$/.test(file))
    .flatMap((file) => {
      const slug = file
        .replace(/\.mdx?$/, "")
        .split(path.sep)
        .filter((segment) => segment !== "index")
        .join("/")
      const url = slug ? `/docs/${slug}` : "/docs"
      return [url, `${url}.md`]
    })
}

export default defineConfig({
  base,
  // The repository's shared favicons
  publicDir: path.resolve(import.meta.dirname, "../../public"),
  server: {
    port: 3000,
  },
  // Resolve the workspace packages to their source, as the rest of the repository does
  resolve: {
    conditions: ["kova-source", ...defaultClientConditions],
  },
  ssr: {
    // Lets the server build resolve `@import "tailwindcss"` in the global stylesheet
    noExternal: ["tailwindcss"],
    resolve: {
      conditions: ["kova-source", ...defaultServerConditions],
      externalConditions: ["kova-source"],
    },
  },
  css: {
    // The pipeline Kova's own build uses, so components render exactly as they do in apps
    postcss: {
      plugins: platformUIRequiredPlugins(),
    },
  },
  build: {
    rolldownOptions: {
      // An example that imports a component the package doesn't export yet gets `undefined`, and its
      // preview's error boundary shows the error, instead of the whole build failing
      shimMissingExports: true,
    },
  },
  plugins: [
    fumadocsMdx(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Every page is listed below, so a broken link doesn't stop the build
        crawlLinks: false,
        // Rendered like a crawler's request, so the HTML has every lazy example in place rather
        // than a fallback that a script swaps out
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KovaDocsPrerender/1.0; +bot)" },
      },
      pages: [
        "/",
        ...docsPaths(),
        "/llms.txt",
        "/llms-full.txt",
        "/search.json",
        "/sitemap.xml",
        "/robots.txt",
      ].map((page) => ({ path: page })),
    }),
    react(),
  ],
})
