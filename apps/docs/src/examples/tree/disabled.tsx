import { Tree, type TreeItemData } from "kova-ui/components"

const plans: TreeItemData[] = [
  {
    value: "plans",
    label: "Plans",
    children: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise", disabled: true },
    ],
  },
  { value: "billing", label: "Billing" },
  { value: "audit-log", label: "Audit log", disabled: true },
]

function Example() {
  return (
    <Tree aria-label="Settings" items={plans} defaultExpanded={["plans"]} className="max-w-72" />
  )
}

export { Example }
