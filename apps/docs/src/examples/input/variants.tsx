import { Input } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Input aria-label="Outline" placeholder="Outline" />
      <Input aria-label="Soft" variant="soft" placeholder="Soft" />
      <Input aria-label="Pill" variant="soft" pill placeholder="Pill" />
    </div>
  )
}

export { Example }
