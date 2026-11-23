import { Separator } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-xs flex w-full flex-col gap-3 text-sm">
      <div className="flex flex-col gap-0.5">
        <h3 className="m-0 text-sm font-semibold">Rudo Mapfumo</h3>
        <p className="m-0 text-secondary">rudo.mapfumo@example.com</p>
      </div>
      <Separator />
      <p className="m-0">Reviews Karanga entries and records pronunciations for the dictionary.</p>
    </div>
  )
}

export { Example }
