import { Image } from "kova-ui/components"

function Example() {
  return (
    <div className="flex gap-6">
      <figure className="flex flex-col items-center gap-2">
        <div className="h-30 w-40 rounded-md border border-dashed border-alpha/20">
          <Image src="https://example.com/missing.png" alt="Team photo" className="size-full" />
        </div>
        <figcaption className="text-sm text-secondary">Removed</figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <div className="h-30 w-40 rounded-md border border-dashed border-alpha/20">
          <Image
            src="https://example.com/missing.png"
            alt="Team photo"
            className="size-full"
            forceRenderAfterLoadFail
          />
        </div>
        <figcaption className="text-sm text-secondary">forceRenderAfterLoadFail</figcaption>
      </figure>
    </div>
  )
}

export { Example }
