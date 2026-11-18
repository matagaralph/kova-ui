import { Textarea } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <Textarea aria-label="Outline" placeholder="Outline" rows={2} />
      <Textarea aria-label="Soft" variant="soft" placeholder="Soft" rows={2} />
    </div>
  )
}

export { Example }
