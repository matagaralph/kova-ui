import { type Meta } from "@storybook/react-vite"
import { Fragment, useState } from "react"
import { ArrowRight, ArrowUp, Mail, PlusLg } from "../Icon/index.js"
import { Popover } from "../Popover/index.js"
import { ShimmerText } from "../ShimmerText/index.js"
import { Button, type ButtonProps } from "./Button.js"

const meta = {
  title: "Components/Button",
  args: {
    children: "Submit",
  },
  component: Button,
} satisfies Meta<typeof Button>

export default meta

export const Base = (args: ButtonProps) => <Button {...args} />

Base.args = {
  variant: "solid",
  color: "primary",
  size: "md",
}

export const Sizing = (args: ButtonProps) => (
  <div className="flex flex-col items-start justify-start gap-2">
    <Button {...args}>
      <Mail /> Button <ArrowRight />
    </Button>
    <Button {...args}>
      Button <ArrowRight />
    </Button>
    <Button {...args}>
      <Mail /> Button
    </Button>
    <Button {...args}>Button</Button>
  </div>
)

Sizing.args = {
  color: "primary",
  size: "xl",
  pill: true,
}

Sizing.parameters = {
  controls: { include: ["size", "pill"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
}

export const Icon = (args: ButtonProps) => (
  <Button {...args}>
    <PlusLg />
  </Button>
)

Icon.args = {
  color: "secondary",
  size: "lg",
  uniform: true,
  pill: false,
  variant: "ghost",
}

Icon.parameters = {
  controls: { include: ["size", "gutterSize", "iconSize", "uniform", "pill", "variant"] },
}

Icon.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
  iconSize: { control: "select" }, //, options: [undefined, "sm", "md", "lg", "xl", "2xl"] },
  variant: { control: "select" },
}

export const Block = (args: ButtonProps) => (
  <div className="w-[290px] rounded-md border border-dashed border-alpha/20 p-2 text-center">
    <Button {...args} />
  </div>
)

Block.args = {
  children: "Continue",
  size: "lg",
  block: true,
}

Block.parameters = {
  controls: { include: ["block"] },
}

export const OpticalAlignment = (args: ButtonProps) => (
  <div className="flex flex-col gap-3">
    <div className="rounded-md border border-dashed border-alpha/20 px-6 py-4">
      <div className="mb-2 text-sm text-secondary">Default gutters</div>
      <Button {...{ ...args, opticallyAlign: undefined }}>{args.children}</Button>
    </div>
    <div className="rounded-md border border-dashed border-alpha/20 px-6 py-4">
      <div className="mb-2 text-sm text-secondary">opticallyAlign="start"</div>
      <Button {...args} />
    </div>
  </div>
)

OpticalAlignment.args = {
  children: "Ghost button",
  variant: "ghost",
  opticallyAlign: "start",
}

export const Disabled = (args: ButtonProps) => <Button {...args} />

Disabled.args = {
  disabled: true,
  onClick: () => alert("Not disabled"),
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
}

export const Inert = (args: ButtonProps) => <Button {...args} />

Inert.args = {
  inert: true,
  onClick: () => alert("Not inert"),
}

Inert.parameters = {
  controls: { include: ["inert"] },
}

export const Selected = (args: ButtonProps) => (
  <Popover>
    <Popover.Trigger>
      <Button {...args} />
    </Popover.Trigger>
    <Popover.Content minWidth="auto" className="p-4 text-sm">
      <ShimmerText className="font-medium text-secondary">Button should look selected</ShimmerText>
    </Popover.Content>
  </Popover>
)

Selected.args = {
  children: "Click to open",
  selected: false,
  variant: "ghost",
}

Selected.parameters = {
  controls: { include: ["selected", "variant"] },
  docs: {
    source: {
      code: `<Button selected {...restProps} />`,
    },
  },
}

Selected.argTypes = {
  variant: { control: "select" },
}

export const Loading = (args: ButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Button
      {...args}
      loading={loading}
      onClick={() => {
        setLoading(!loading)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }}
    >
      <ArrowUp /> Click to load
    </Button>
  )
}

Loading.args = {
  size: "xl",
  pill: true,
}

Loading.parameters = {
  docs: {
    source: {
      code: `<Button loading {...restProps} />`,
    },
  },
}

const VARIANTS = ["soft", "solid", "outline", "ghost"] as const
const COLORS = [
  "primary",
  "secondary",
  "danger",
  "info",
  "discovery",
  "success",
  "caution",
  "warning",
] as const

export const Colors = (args: ButtonProps) => (
  <div className="min-w-[820px] pt-1 pb-6">
    <Matrix
      rowLabels={VARIANTS}
      columnLabels={COLORS}
      renderCell={(row, col) => (
        <Button {...args} size={args.size} color={COLORS[col]} variant={VARIANTS[row]} />
      )}
    />
  </div>
)

Colors.parameters = {
  layout: "padded",
}

const Matrix = ({
  rowLabels,
  columnLabels,
  renderCell,
}: {
  rowLabels: Readonly<string[]>
  columnLabels: Readonly<string[]>
  renderCell: (rowIndex: number, colIndex: number) => React.ReactNode
}) => {
  const template = `auto repeat(${columnLabels.length}, min-content)`

  return (
    <div
      className="grid items-center justify-center gap-6"
      style={{ gridTemplateColumns: template }}
    >
      {/* top‐left corner spacer */}
      <div />
      {columnLabels.map((col, i) => (
        <div key={i} className="mb-1 text-center text-sm text-tertiary">
          {col}
        </div>
      ))}

      {rowLabels.map((row, ri) => (
        <Fragment key={ri}>
          <div className="mr-3 -ml-3 text-right text-sm text-tertiary">{row}</div>
          {columnLabels.map((_, ci) => (
            <div key={ci} className="text-center">
              {renderCell(ri, ci)}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
