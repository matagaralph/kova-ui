import { useState } from "react"

import { Button } from "../Button/index.js"
import { SlotTransitionGroup } from "../Transition/index.js"

import type { Meta } from "@storybook/react-vite"

const meta = {
  title: "Transitions/SlotTransitionGroup",
  component: SlotTransitionGroup,
} satisfies Meta<typeof SlotTransitionGroup>

export default meta

export const Base = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="w-[200px]">
      <div className="mx-auto mb-6 w-[100px]">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <div className="h-[200px]">
        <SlotTransitionGroup enterDuration={2000} exitDuration={1000}>
          {show && (
            <div key="s" className="storybook-tg h-[200px] w-[200px] rounded-lg bg-gray-300" />
          )}
        </SlotTransitionGroup>
      </div>
    </div>
  )
}
