import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const pages: TreeItemData[] = [
  {
    value: "getting-started",
    label: "Getting started",
    children: [
      { value: "introduction", label: "Introduction", href: "#introduction" },
      { value: "installation", label: "Installation", href: "#installation" },
    ],
  },
  {
    value: "components",
    label: "Components",
    children: [
      { value: "accordion", label: "Accordion", href: "#accordion" },
      { value: "dialog", label: "Dialog", href: "#dialog" },
      { value: "tree", label: "Tree", href: "#tree" },
    ],
  },
  { value: "changelog", label: "Changelog", href: "#changelog" },
]

const links = new Set(
  pages
    .flatMap((section) => [section, ...(section.children ?? [])])
    .filter((page) => page.href)
    .map((page) => page.value),
)

function Example() {
  const [current, setCurrent] = useState("tree")

  return (
    <Tree
      aria-label="Docs"
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
