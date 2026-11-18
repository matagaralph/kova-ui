import { Button, TagInput } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [tags, setTags] = useState<string[]>(["bug"])

  return (
    <div className="flex w-96 flex-col items-start gap-3">
      <TagInput value={tags} onValueChange={setTags}>
        <TagInput.Control className="w-full">
          <TagInput.Value />
          <TagInput.Input aria-label="Labels" placeholder="Add a label" />
        </TagInput.Control>
      </TagInput>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="soft" onClick={() => setTags([])}>
          Clear all
        </Button>
        <p className="text-sm text-secondary">{tags.length} labels</p>
      </div>
    </div>
  )
}

export { Example }
