// Writes `src/routeTree.gen.ts`, which TypeScript needs and the TanStack Start plugin generates.
// Starting Vite's server runs the plugin, without serving or building anything.
import { createServer } from "vite"

const server = await createServer({
  logLevel: "error",
  server: { middlewareMode: true, ws: false },
})
await server.close()
