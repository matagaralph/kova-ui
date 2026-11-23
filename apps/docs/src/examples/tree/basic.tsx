import { File, Folder, FolderOpen } from "@kova-ui/icons"
import { Tree, type TreeItemData } from "kova-ui/components"

const files: TreeItemData[] = [
  {
    value: "recordings",
    label: "recordings",
    children: [
      { value: "recordings/mhoro.mp3", label: "mhoro.mp3" },
      { value: "recordings/mangwanani.mp3", label: "mangwanani.mp3" },
      {
        value: "recordings/animals",
        label: "animals",
        children: [{ value: "recordings/animals/shumba.mp3", label: "shumba.mp3" }],
      },
    ],
  },
  {
    value: "lessons",
    label: "lessons",
    children: [
      { value: "lessons/greetings.md", label: "greetings.md" },
      { value: "lessons/family.md", label: "family.md" },
    ],
  },
  { value: "contributors.csv", label: "contributors.csv" },
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
      defaultExpanded={["recordings"]}
      defaultValue="recordings/mhoro.mp3"
      className="max-w-72"
    >
      <Items items={files} />
    </Tree>
  )
}

export { Example }
