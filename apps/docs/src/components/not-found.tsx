import { Link } from "@tanstack/react-router"
import { HomeLayout } from "fumadocs-ui/layouts/home"

import { baseOptions } from "../lib/layout.shared.js"

export function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <div
        id="nd-page"
        className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24"
      >
        <p className="text-fd-muted-foreground font-mono text-sm">404</p>
        <h1 className="text-2xl font-semibold">This page could not be found</h1>
        <Link
          to="/docs/$"
          params={{ _splat: "" }}
          className="text-sm font-medium underline underline-offset-4"
        >
          Back to the documentation
        </Link>
      </div>
    </HomeLayout>
  )
}
