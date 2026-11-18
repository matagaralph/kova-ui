export const siteName = "Kova UI"
export const siteDescription =
  "Kova UI is the design system for Amashona. It brings design tokens, a Tailwind 4 setup, and accessible React components built on ui-sdk."
export const githubUrl = "https://github.com/matagaralph/kova-ui"
export const docsRoute = "/docs"

/** The base path the site is served under, without a trailing slash, like `/kova-ui` */
export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "")

/** The public origin, used for canonical URLs, the sitemap and links in Markdown */
export const siteOrigin = (
  import.meta.env.VITE_DOCS_SITE_URL ?? "https://matagaralph.github.io"
).replace(/\/$/, "")

/** Prefixes a site path with the base path, for URLs the router doesn't handle */
export function withBase(pathname: string) {
  return `${basePath}${pathname}`
}

/** The absolute URL of a site path */
export function absoluteUrl(pathname: string) {
  return `${siteOrigin}${withBase(pathname)}`
}

/** The Markdown version of a page, `/docs/components/switch` → `/docs/components/switch.md` */
export function markdownPath(pageUrl: string) {
  return `${pageUrl}.md`
}
