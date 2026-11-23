import { Button, Image } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [version, setVersion] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-50 w-80 rounded-md bg-(--alpha-04)">
        <Image
          key={version}
          src={`https://picsum.photos/id/1043/640/400?v=${version}`}
          alt="Snowy mountain peaks"
          className="size-full rounded-md object-cover"
        />
      </div>
      <Button variant="outline" size="sm" onClick={() => setVersion(version + 1)}>
        Load a new copy
      </Button>
    </div>
  )
}

export { Example }
