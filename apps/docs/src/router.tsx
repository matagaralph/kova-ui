import { createRouter } from "@tanstack/react-router"

import { NotFound } from "./components/not-found.js"
import { routeTree } from "./routeTree.gen.js"

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  })
}
