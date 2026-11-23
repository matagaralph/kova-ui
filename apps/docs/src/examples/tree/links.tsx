import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const pages: TreeItemData[] = [
  {
    value: "greetings",
    label: "Greetings",
    children: [
      { value: "morning", label: "Morning", href: "#morning" },
      { value: "evening", label: "Evening", href: "#evening" },
    ],
  },
  {
    value: "family",
    label: "Family",
    children: [
      { value: "parents", label: "Parents", href: "#parents" },
      { value: "grandparents", label: "Grandparents", href: "#grandparents" },
      { value: "children", label: "Children", href: "#children" },
    ],
  },
  { value: "proverbs", label: "Proverbs", href: "#proverbs" },
]

const links = new Set(
  pages
    .flatMap((section) => [section, ...(section.children ?? [])])
    .filter((page) => page.href)
    .map((page) => page.value),
)

function Example() {
  const [current, setCurrent] = useState("grandparents")

  return (
    <Tree
      aria-label="Lessons"
      mode="none"
      items={pages}
      current={current}
      className="max-w-72"
      onAction={(value, { event }) => {
        if (!links.has(value)) return
        event?.preventDefault()
        setCurrent(value)
      }}
    />
  )
}

export { Example }
