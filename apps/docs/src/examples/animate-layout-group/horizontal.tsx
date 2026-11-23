import { AnimateLayoutGroup, Badge, Button } from "kova-ui/components"
import { useState } from "react"

const all = ["Zezuru", "Karanga", "Korekore", "Manyika", "Ndau"]

function Example() {
  const [tags, setTags] = useState(all)

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center">
        <AnimateLayoutGroup dimension="width">
          {tags.map((tag) => (
            <span key={tag} className="pr-2">
              <Badge color="info" size="md">
                {tag}
              </Badge>
            </span>
          ))}
        </AnimateLayoutGroup>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setTags(tags.length ? tags.slice(0, -1) : all)}
      >
        {tags.length ? "Remove last" : "Reset"}
      </Button>
    </div>
  )
}

export { Example }
