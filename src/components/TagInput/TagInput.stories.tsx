import { type Meta } from "@storybook/react"
import { EMAIL_REGEX } from "../../lib/constants.js"
import { TagInput, type TagInputProps } from "./index.js"

const meta: Meta<TagInputProps> = {
  title: "Components/TagInput",
  component: TagInput,
  args: {
    placeholder: "name@example.com",
    validator: (email) => EMAIL_REGEX.test(email),
    rows: 3,
    autoFocus: true,
  },
} satisfies Meta<typeof TagInput>

export default meta

export const Base = (args: TagInputProps) => (
  <div style={{ width: 350 }}>
    <TagInput {...args} />
  </div>
)
