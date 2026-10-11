import { type Meta } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../Button/index.js"
import { ShimmerableText, ShimmerText } from "./index.js"

const meta = {
  title: "Components/ShimmerText",
  component: ShimmerText,
  argTypes: {
    children: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof ShimmerText>

export default meta

export const Base = () => <ShimmerText className="text-secondary">Thinking…</ShimmerText>

export const AsHeading = () => (
  <ShimmerText as="h3" className="text-xl font-semibold">
    Generating your report
  </ShimmerText>
)

export const Shimmerable = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <ShimmerableText shimmer={loading} className="text-secondary">
        {loading ? "Searching the workspace…" : "Found 24 results"}
      </ShimmerableText>
      <Button color="secondary" variant="outline" size="sm" onClick={() => setLoading((v) => !v)}>
        {loading ? "Finish" : "Search again"}
      </Button>
    </div>
  )
}
