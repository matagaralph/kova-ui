import { useState } from "react"

import { Button } from "../Button/index.js"
import { TransitionGroup } from "../Transition/index.js"

import type { Meta } from "@storybook/react-vite"

const meta = {
  title: "Transitions/TransitionGroup",
  component: TransitionGroup,
} satisfies Meta<typeof TransitionGroup>

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
        <TransitionGroup
          className="storybook-tg rounded-lg"
          enterDuration={2000}
          exitDuration={1000}
        >
          {show && <div key="s" className="h-[200px] w-[200px] rounded-lg bg-gray-300" />}
        </TransitionGroup>
      </div>
    </div>
  )
}
