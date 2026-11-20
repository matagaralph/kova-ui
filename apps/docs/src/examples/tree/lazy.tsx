import { LoadingIndicator, Tree } from "kova-ui/components"
import { useState } from "react"

type Table = { value: string; label: string }

const tables: Table[] = [
  { value: "users", label: "users" },
  { value: "orders", label: "orders" },
  { value: "archive", label: "archive" },
]

function Example() {
  const [columns, setColumns] = useState<Record<string, Table[]>>({})

  return (
    <Tree
      aria-label="Database"
      className="max-w-72"
      loadChildren={async (value, { signal }) => {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, 800)
          signal.addEventListener("abort", () => {
            clearTimeout(timer)
            reject(signal.reason)
          })
        })
        setColumns((current) => ({
          ...current,
          [value]: ["id", "created_at", "updated_at"].map((column) => ({
            value: `${value}.${column}`,
            label: column,
          })),
        }))
      }}
    >
      {tables.map((table) => (
        <Tree.Item key={table.value} value={table.value} branch>
          <Tree.ItemLabel>
            {(state) => (
              <>
                <Tree.ItemIndicator />
                <span>{table.label}</span>
                {state.loading && <LoadingIndicator size={14} className="ms-auto" />}
              </>
            )}
          </Tree.ItemLabel>
          {columns[table.value] && (
            <Tree.Group>
              {columns[table.value]?.map((column) => (
                <Tree.Item key={column.value} value={column.value}>
                  <Tree.ItemLabel>{column.label}</Tree.ItemLabel>
                </Tree.Item>
              ))}
            </Tree.Group>
          )}
        </Tree.Item>
      ))}
    </Tree>
  )
}

export { Example }
