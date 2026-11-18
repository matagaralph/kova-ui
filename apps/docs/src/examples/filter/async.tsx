import { User } from "@kova-ui/icons"
import { Filter, type FilterProvider } from "kova-ui/components"

const people = ["alex", "jordan", "morgan", "riley", "sam", "taylor"]

const providers: FilterProvider[] = [
  {
    key: "assignee",
    displayName: "Assignee",
    icon: User,
    aliases: ["owner"],
    getSuggestions: (query) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            people.filter((name) => name.includes(query.toLowerCase())).map((value) => ({ value })),
          )
        }, 600)
      }),
  },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter label="Filter tasks" providers={providers} initialFilterValue="assignee:" />
    </div>
  )
}

export { Example }
