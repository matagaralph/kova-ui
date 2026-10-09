import { type Meta } from "@storybook/react-vite"
import { Headphones } from "../Icon/index.js"
import { Avatar, AvatarGroup, type AvatarGroupProps } from "./index.js"

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  args: {
    stack: "start",
    size: 42,
  },
  argTypes: {
    size: {
      control: {
        type: "range",
        min: 14,
        max: 80,
        step: 2,
      },
    },
  },
} satisfies Meta<typeof AvatarGroup>

export default meta

export const Base = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar name="Amara" imageUrl="https://i.pravatar.cc/240?img=47" />
    <Avatar name="Kofi" color="primary" variant="solid" />
    <Avatar name="Support" Icon={Headphones} variant="solid" />
    <Avatar overflowCount={5} />
  </AvatarGroup>
)

Base.parameters = {
  docs: {
    source: {
      code: `
<AvatarGroup size={42}>
  <Avatar name="Amara" imageUrl="https://i.pravatar.cc/240?img=47" />
  <Avatar name="Kofi" color="primary" variant="solid" />
  <Avatar name="Support" Icon={Headphones} variant="solid" />
  <Avatar overflowCount={5} />
</AvatarGroup>
`,
    },
  },
}

export const Direction = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar name="Amara" imageUrl="https://i.pravatar.cc/240?img=47" />
    <Avatar name="Noah" />
    <Avatar name="Support" Icon={Headphones} variant="solid" />
    <Avatar overflowCount={5} variant="soft" />
  </AvatarGroup>
)

Direction.parameters = {
  controls: { include: ["stack"] },
}

Direction.args = {
  stack: "end",
  size: 42,
}

Direction.argTypes = {
  stack: { control: "select" },
}

export const Sizing = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar name="Amara" color="info" />
    <Avatar name="Kofi" color="discovery" />
    <Avatar name="Noah" color="danger" />
    <Avatar overflowCount={5} />
  </AvatarGroup>
)

Sizing.args = {
  size: 48,
}

Sizing.parameters = {
  controls: { include: ["size"] },
}
