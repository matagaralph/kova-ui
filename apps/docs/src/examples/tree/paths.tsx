import { LoadingIndicator, Tree, treeFromPaths, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const paths = [
  "recordings/mhoro.mp3",
  "recordings/zezuru/mvura.mp3",
  "recordings/zezuru/shumba.mp3",
  "recordings/karanga/mvura.mp3",
  "recordings/karanga/nzou.mp3",
  "transcripts/",
  "contributors.csv",
  "README.md",
]

const archive = treeFromPaths(paths)
const files = new Set(paths.filter((path) => !path.endsWith("/")))

function Items({ items }: { items: TreeItemData[] }) {
  return items.map((item) => (
    <Tree.Item key={item.value} value={item.value}>
      <Tree.ItemLabel>
        {(state) => (
          <>
            {item.children && <Tree.ItemIndicator />}
            <span>{item.label}</span>
            {state.pending && <LoadingIndicator size={14} className="ms-auto" />}
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
  const [opened, setOpened] = useState<string | null>(null)

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <Tree
        aria-label="Archive"
        paths={paths}
        defaultExpanded={["recordings"]}
        defaultValue="recordings/mhoro.mp3"
        activation="automatic"
        onAction={async (value) => {
          if (!files.has(value)) return
          await new Promise((resolve) => setTimeout(resolve, 600))
          setOpened(value)
        }}
      >
        <Items items={archive} />
      </Tree>
      <p className="m-0 text-sm text-secondary" role="status">
        {opened ? `Opened ${opened}` : "Press Enter on a file to open it."}
      </p>
    </div>
  )
}

export { Example }
