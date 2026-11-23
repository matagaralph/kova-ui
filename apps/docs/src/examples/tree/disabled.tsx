import { Tree, type TreeItemData } from "kova-ui/components"

const lessons: TreeItemData[] = [
  {
    value: "beginner",
    label: "Beginner",
    children: [
      { value: "greetings", label: "Greetings" },
      { value: "family", label: "Family" },
      { value: "months", label: "Months", disabled: true },
    ],
  },
  { value: "proverbs", label: "Proverbs" },
  { value: "advanced", label: "Advanced", disabled: true },
]

function Example() {
  return (
    <Tree
      aria-label="Lessons"
      items={lessons}
      defaultExpanded={["beginner"]}
      className="max-w-72"
    />
  )
}

export { Example }
