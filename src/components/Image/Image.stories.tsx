import { type Meta } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../Button/index.js"
import { Image } from "./index.js"

const meta = {
  title: "Components/Image",
  component: Image,
  args: {
    src: "https://picsum.photos/id/1018/640/400",
    alt: "Mountain range above a forested valley",
  },
} satisfies Meta<typeof Image>

export default meta

export const Base = (args: React.ComponentProps<typeof Image>) => (
  <Image {...args} className="h-50 w-80 rounded-md object-cover" />
)

export const Reload = () => {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        key={key}
        src={`https://picsum.photos/id/1043/640/400?reload=${key}`}
        alt="Snowy mountain peaks"
        className="h-50 w-80 rounded-md object-cover"
      />
      <Button color="secondary" variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Load a new copy
      </Button>
    </div>
  )
}

export const FailedToLoad = () => (
  <div className="flex gap-6">
    <figure className="flex flex-col items-center gap-2">
      <div className="h-30 w-40 rounded-md border border-dashed border-alpha/20">
        <Image src="https://example.com/missing.png" alt="Missing" className="size-full" />
      </div>
      <figcaption className="text-sm text-secondary">Default</figcaption>
    </figure>
    <figure className="flex flex-col items-center gap-2">
      <div className="h-30 w-40 rounded-md border border-dashed border-alpha/20">
        <Image
          src="https://example.com/missing.png"
          alt="Missing"
          className="size-full"
          forceRenderAfterLoadFail
        />
      </div>
      <figcaption className="text-sm text-secondary">forceRenderAfterLoadFail</figcaption>
    </figure>
  </div>
)
