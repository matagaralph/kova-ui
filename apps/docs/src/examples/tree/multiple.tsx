import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const mail: TreeItemData[] = [
  {
    value: "inbox",
    label: "Inbox",
    children: [
      { value: "invoices", label: "Invoices" },
      { value: "receipts", label: "Receipts" },
      { value: "newsletters", label: "Newsletters" },
    ],
  },
  {
    value: "projects",
    label: "Projects",
    children: [
      { value: "harare-office", label: "Harare office" },
      { value: "bulawayo-launch", label: "Bulawayo launch" },
    ],
  },
  { value: "archive", label: "Archive" },
]

function Example() {
  const [value, setValue] = useState<string[]>(["invoices", "receipts"])

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <Tree
        aria-label="Folders"
        mode="multiple"
        items={mail}
        value={value}
        onValueChange={setValue}
        expandOnPress={false}
        defaultExpanded={["inbox", "projects"]}
      />
      <p className="m-0 text-sm text-secondary">Selected: {value.join(", ") || "nothing"}</p>
    </div>
  )
}

export { Example }
