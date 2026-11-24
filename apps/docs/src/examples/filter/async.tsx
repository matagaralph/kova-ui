import { User } from "@kova-ui/icons"
import { Filter, type FilterProvider } from "kova-ui/components"

const contributors = ["chipo", "farai", "nyasha", "rudo", "tatenda", "tendai"]

const providers: FilterProvider[] = [
  {
    key: "contributor",
    displayName: "Contributor",
    icon: User,
    aliases: ["author"],
    getSuggestions: (query, _context, { signal }) =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          resolve(
            contributors
              .filter((name) => name.includes(query.toLowerCase()))
              .map((value) => ({ value })),
          )
        }, 600)
        signal.addEventListener("abort", () => {
          clearTimeout(timeout)
          reject(signal.reason)
        })
      }),
  },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter label="Filter entries" providers={providers} initialFilterValue="contributor:" />
    </div>
  )
}

export { Example }
