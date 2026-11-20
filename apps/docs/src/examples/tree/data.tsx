import { Tree, type TreeItemData } from "kova-ui/components"

const groceries: TreeItemData[] = [
  {
    value: "fruit",
    label: "Fruit",
    children: [
      { value: "mango", label: "Mango" },
      { value: "banana", label: "Banana" },
      { value: "guava", label: "Guava" },
    ],
  },
  {
    value: "vegetables",
    label: "Vegetables",
    children: [
      { value: "covo", label: "Covo" },
      { value: "pumpkin-leaves", label: "Pumpkin leaves" },
    ],
  },
  { value: "bread", label: "Bread" },
]

function Example() {
  return <Tree aria-label="Groceries" items={groceries} className="max-w-72" />
}

export { Example }
