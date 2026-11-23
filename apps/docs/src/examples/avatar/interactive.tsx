import { Avatar } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-3">
      <Avatar
        size={48}
        render={<button type="button" aria-label="Wave at Kudzai" />}
        onClick={() => setCount((value) => value + 1)}
      >
        <Avatar.Image src="https://randomuser.me/api/portraits/med/men/91.jpg" alt="" />
        <Avatar.Fallback name="Kudzai Chikore" aria-hidden="true" />
      </Avatar>
      <p className="text-sm text-secondary">Waved {count} times</p>
    </div>
  )
}

export { Example }
