import { AnimateLayoutGroup, Button } from "kova-ui/components"
import { useState } from "react"

let nextId = 4

function Example() {
  const [items, setItems] = useState([
    { id: 1, name: "sadza-zezuru.m4a" },
    { id: 2, name: "mvura-karanga.m4a" },
    { id: 3, name: "nzou-ndau.m4a" },
  ])

  return (
    <div className="flex w-80 flex-col gap-3">
      <Button
        variant="outline"
        onClick={() => setItems([...items, { id: nextId, name: `recording-${nextId++}.m4a` }])}
      >
        Add recording
      </Button>
      <div>
        <AnimateLayoutGroup
          as="div"
          initial={{ y: -10, opacity: 0 }}
          enter={{ y: 0, delay: 150, duration: 600 }}
          exit={{ scale: 0.8, blur: 10, duration: 400 }}
          layoutExit={{ delay: 150 }}
        >
          {items.map((item) => (
            <div key={item.id} className="py-1">
              <div className="flex items-center justify-between rounded-md border border-default px-3 py-2 text-sm">
                {item.name}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setItems(items.filter((other) => other.id !== item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </AnimateLayoutGroup>
      </div>
    </div>
  )
}

export { Example }
