import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const stack: TreeItemData[] = [
  {
    value: "frontend",
    label: "Frontend",
    children: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    value: "backend",
    label: "Backend",
    children: [
      { value: "node", label: "Node" },
      {
        value: "databases",
        label: "Databases",
        children: [
          { value: "postgres", label: "Postgres" },
          { value: "sqlite", label: "SQLite" },
        ],
      },
    ],
  },
]

function Items({ items }: { items: TreeItemData[] }) {
  return items.map((item) => (
    <Tree.Item key={item.value} value={item.value}>
      <Tree.ItemLabel>
        {item.children && <Tree.ItemIndicator />}
        <Tree.ItemCheckbox />
        <span>{item.label}</span>
      </Tree.ItemLabel>
      {item.children && (
        <Tree.Group>
          <Items items={item.children} />
        </Tree.Group>
      )}
    </Tree.Item>
  ))
}

function Example() {
  const [checked, setChecked] = useState<string[]>(["react", "postgres"])

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <Tree
        aria-label="Stack"
        mode="none"
        checkable
        items={stack}
        checked={checked}
        onCheckedChange={setChecked}
        defaultExpanded={["frontend", "backend", "databases"]}
      >
        <Items items={stack} />
      </Tree>
      <p className="m-0 text-sm text-secondary">Checked: {checked.join(", ") || "nothing"}</p>
    </div>
  )
}

export { Example }
