import { LoadingIndicator, Tree, treeFromPaths, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const paths = [
  "src/index.ts",
  "src/lib/format.ts",
  "src/lib/parse.ts",
  "src/routes/home.tsx",
  "src/routes/about.tsx",
  "tests/",
  "package.json",
  "tsconfig.json",
]

const project = treeFromPaths(paths)
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
        aria-label="Project"
        paths={paths}
        defaultExpanded={["src"]}
        defaultValue="src/index.ts"
        activation="automatic"
        onAction={async (value) => {
          if (!files.has(value)) return
          await new Promise((resolve) => setTimeout(resolve, 600))
          setOpened(value)
        }}
      >
        <Items items={project} />
      </Tree>
      <p className="m-0 text-sm text-secondary" role="status">
        {opened ? `Opened ${opened}` : "Press Enter on a file to open it."}
      </p>
    </div>
  )
}

export { Example }
