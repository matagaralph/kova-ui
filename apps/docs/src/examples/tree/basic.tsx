import { File, Folder, FolderOpen } from "@kova-ui/icons"
import { Tree, type TreeItemData } from "kova-ui/components"

const files: TreeItemData[] = [
  {
    value: "app",
    label: "app",
    children: [
      { value: "app/layout.tsx", label: "layout.tsx" },
      { value: "app/page.tsx", label: "page.tsx" },
      {
        value: "app/settings",
        label: "settings",
        children: [{ value: "app/settings/page.tsx", label: "page.tsx" }],
      },
    ],
  },
  {
    value: "components",
    label: "components",
    children: [
      { value: "components/button.tsx", label: "button.tsx" },
      { value: "components/card.tsx", label: "card.tsx" },
    ],
  },
  { value: "package.json", label: "package.json" },
  { value: "README.md", label: "README.md" },
]

function Items({ items }: { items: TreeItemData[] }) {
  return items.map((item) => (
    <Tree.Item key={item.value} value={item.value}>
      <Tree.ItemLabel>
        {(state) => (
          <>
            {item.children && <Tree.ItemIndicator />}
            {!item.children ? (
              <File aria-hidden="true" />
            ) : state.expanded ? (
              <FolderOpen aria-hidden="true" />
            ) : (
              <Folder aria-hidden="true" />
            )}
            <span>{item.label}</span>
          </>
        )}
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
  return (
    <Tree
      aria-label="Files"
      items={files}
      defaultExpanded={["app"]}
      defaultValue="app/page.tsx"
      className="max-w-72"
    >
      <Items items={files} />
    </Tree>
  )
}

export { Example }
