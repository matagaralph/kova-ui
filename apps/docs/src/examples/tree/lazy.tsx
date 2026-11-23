import { LoadingIndicator, Tree } from "kova-ui/components"
import { useState } from "react"

type Collection = { value: string; label: string }

const collections: Collection[] = [
  { value: "proverbs", label: "Proverbs" },
  { value: "stories", label: "Stories" },
  { value: "songs", label: "Songs" },
]

function Example() {
  const [dialects, setDialects] = useState<Record<string, Collection[]>>({})

  return (
    <Tree
      aria-label="Collections"
      className="max-w-72"
      loadChildren={async (value, { signal }) => {
        await new Promise((resolve, reject) => {
          const timer = setTimeout(resolve, 800)
          signal.addEventListener("abort", () => {
            clearTimeout(timer)
            reject(signal.reason)
          })
        })
        setDialects((current) => ({
          ...current,
          [value]: ["Zezuru", "Karanga", "Manyika"].map((dialect) => ({
            value: `${value}.${dialect}`,
            label: dialect,
          })),
        }))
      }}
    >
      {collections.map((collection) => (
        <Tree.Item key={collection.value} value={collection.value} branch>
          <Tree.ItemLabel>
            {(state) => (
              <>
                <Tree.ItemIndicator />
                <span>{collection.label}</span>
                {state.loading && <LoadingIndicator size={14} className="ms-auto" />}
              </>
            )}
          </Tree.ItemLabel>
          {dialects[collection.value] && (
            <Tree.Group>
              {dialects[collection.value]?.map((dialect) => (
                <Tree.Item key={dialect.value} value={dialect.value}>
                  <Tree.ItemLabel>{dialect.label}</Tree.ItemLabel>
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
