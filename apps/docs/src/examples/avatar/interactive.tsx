import { Avatar } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-3">
      <Avatar
        size={48}
        color="primary"
        render={<button type="button" aria-label="Wave at Noah" />}
        onClick={() => setCount((value) => value + 1)}
      >
        <Avatar.Fallback aria-hidden="true">N</Avatar.Fallback>
      </Avatar>
      <p className="text-sm text-secondary">Waved {count} times</p>
    </div>
  )
}

export { Example }
