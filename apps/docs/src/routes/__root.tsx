import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { RootProvider } from "fumadocs-ui/provider/tanstack"
import { THEME_STORAGE_KEY } from "kova-ui/theme"
import type { ReactNode } from "react"

import { SearchDialog } from "../components/search.js"
import { ThemeSync } from "../components/theme-sync.js"
import { siteDescription, siteName, withBase } from "../lib/shared.js"
import appCss from "../styles/app.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteName },
      { name: "description", content: siteDescription },
      { property: "og:site_name", content: siteName },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://rsms.me/" },
      { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: withBase("/favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: withBase("/favicon.png"), type: "image/png" },
      { rel: "alternate", href: withBase("/llms.txt"), type: "text/plain", title: "llms.txt" },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#nd-page" className="docs-skip-link">
          Skip to content
        </a>
        <RootProvider
          theme={{
            // Fumadocs styles follow the `dark` class, Kova follows `data-theme`
            attribute: ["class", "data-theme"],
            storageKey: THEME_STORAGE_KEY,
            defaultTheme: "system",
            enableSystem: true,
          }}
          search={{ SearchDialog }}
        >
          <ThemeSync />
          {children}
        </RootProvider>
        <Scripts />
      </body>
    </html>
  )
}
