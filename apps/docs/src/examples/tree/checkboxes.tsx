import { Tree, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const words: TreeItemData[] = [
  {
    value: "family",
    label: "Family",
    children: [
      { value: "amai", label: "amai" },
      { value: "baba", label: "baba" },
      { value: "mwana", label: "mwana" },
    ],
  },
  {
    value: "nature",
    label: "Nature",
    children: [
      { value: "gomo", label: "gomo" },
      {
        value: "animals",
        label: "Animals",
        children: [
          { value: "shumba", label: "shumba" },
          { value: "nzou", label: "nzou" },
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
  const [checked, setChecked] = useState<string[]>(["amai", "shumba"])

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <Tree
        aria-label="Words to practise"
        mode="none"
        checkable
        items={words}
        checked={checked}
        onCheckedChange={setChecked}
        defaultExpanded={["family", "nature", "animals"]}
      >
        <Items items={words} />
      </Tree>
      <p className="m-0 text-sm text-secondary">Checked: {checked.join(", ") || "nothing"}</p>
    </div>
  )
}

export { Example }
