import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const folders: TreeItemData[] = [
  {
    value: "bookmarks",
    label: "Bookmarks",
    children: [
      { value: "words", label: "Words" },
      { value: "proverbs", label: "Proverbs" },
      { value: "stories", label: "Stories" },
    ],
  },
  {
    value: "collections",
    label: "Collections",
    children: [
      { value: "animals", label: "Animals" },
      { value: "family", label: "Family" },
    ],
  },
  { value: "archive", label: "Archive" },
]

function Example() {
  const [value, setValue] = useState<string[]>(["words", "proverbs"])

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <Tree
        aria-label="Folders"
        mode="multiple"
        items={folders}
        value={value}
        onValueChange={setValue}
        expandOnPress={false}
        defaultExpanded={["bookmarks", "collections"]}
      />
      <p className="m-0 text-sm text-secondary">Selected: {value.join(", ") || "nothing"}</p>
    </div>
  )
}

export { Example }
