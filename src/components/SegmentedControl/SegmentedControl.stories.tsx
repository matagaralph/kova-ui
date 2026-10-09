import type { Meta } from "@storybook/react-vite"
import { useState } from "react"
import { Eye, FileCode, Users } from "../Icon/index.js"
import { SegmentedControl, type SegmentedControlProps, type SizeVariant } from "./index.js"

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>

export default meta

export const Base = (args: SegmentedControlProps<string>) => {
  const [view, setView] = useState("preview")

  return (
    <SegmentedControl
      {...args}
      value={view}
      onChange={(nextView) => setView(nextView)}
      aria-label="File view"
    >
      <SegmentedControl.Option value="preview">Preview</SegmentedControl.Option>
      <SegmentedControl.Option value="raw">Raw</SegmentedControl.Option>
      <SegmentedControl.Option value="blame">Blame</SegmentedControl.Option>
    </SegmentedControl>
  )
}

const FILE_VIEWS = ["preview", "raw", "blame"] as const

export const Controlled = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <SegmentedControl
      value={FILE_VIEWS[selectedIndex]}
      onChange={(nextView) => setSelectedIndex(FILE_VIEWS.indexOf(nextView))}
      aria-label="File view"
    >
      <SegmentedControl.Option value="preview">Preview</SegmentedControl.Option>
      <SegmentedControl.Option value="raw">Raw</SegmentedControl.Option>
      <SegmentedControl.Option value="blame">Blame</SegmentedControl.Option>
    </SegmentedControl>
  )
}

export const WithLeadingIcons = () => {
  const [view, setView] = useState("preview")

  return (
    <SegmentedControl value={view} onChange={setView} aria-label="File view">
      <SegmentedControl.Option value="preview" aria-label="Preview">
        <Eye />
        Preview
      </SegmentedControl.Option>
      <SegmentedControl.Option value="raw" aria-label="Raw">
        <FileCode />
        Raw
      </SegmentedControl.Option>
      <SegmentedControl.Option value="blame" aria-label="Blame">
        <Users />
        Blame
      </SegmentedControl.Option>
    </SegmentedControl>
  )
}

export const IconOnly = () => {
  const [view, setView] = useState("preview")

  return (
    <SegmentedControl value={view} onChange={setView} aria-label="File view">
      <SegmentedControl.Option value="preview" aria-label="Preview">
        <Eye />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="raw" aria-label="Raw">
        <FileCode />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="blame" aria-label="Blame">
        <Users />
      </SegmentedControl.Option>
    </SegmentedControl>
  )
}

export const Sizing = (args: SegmentedControlProps<string>) => <Base {...args} />

Sizing.args = {
  size: "xl",
  pill: false,
}

Sizing.parameters = {
  controls: { include: ["size", "gutterSize", "pill"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
}

export const Block = (args: SegmentedControlProps<string>) => (
  <div className="w-[420px] rounded-md border border-dashed border-alpha/20 p-2 text-center">
    <Base {...args} />
  </div>
)

Block.args = {
  block: true,
}

Block.parameters = {
  controls: { include: ["block"] },
  docs: {
    source: {
      code: `<SegmentedControl block>
  <SegmentedControl.Option />
  <SegmentedControl.Option />
  <SegmentedControl.Option />
</SegmentedControl>`,
    },
  },
}

export const Disabled = (args: SegmentedControlProps<string>) => <Base {...args} />

Disabled.args = {
  disabled: true,
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `<SegmentedControl disabled>
  <SegmentedControl.Option />
  <SegmentedControl.Option />
  <SegmentedControl.Option />
</SegmentedControl>`,
    },
  },
}

export const DisabledOption = ({ disabled, ...restProps }: SegmentedControlProps<string>) => {
  const [view, setView] = useState("preview")

  return (
    <SegmentedControl
      {...restProps}
      value={view}
      onChange={(nextView) => setView(nextView)}
      aria-label="File view"
    >
      <SegmentedControl.Option value="preview">Preview</SegmentedControl.Option>
      <SegmentedControl.Option value="raw">Raw</SegmentedControl.Option>
      <SegmentedControl.Option value="blame" disabled={disabled}>
        Blame
      </SegmentedControl.Option>
    </SegmentedControl>
  )
}

DisabledOption.args = {
  disabled: true,
}

DisabledOption.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `<SegmentedControl>
  <SegmentedControl.Option />
  <SegmentedControl.Option />
  <SegmentedControl.Option disabled />
</SegmentedControl>`,
    },
  },
}

export const Scrollable = ({ size }: { size: SizeVariant }) => {
  const [long, setLong] = useState("1")

  return (
    <div className="max-w-[400px]">
      <div className="flex">
        <SegmentedControl
          value={long}
          onChange={(v) => setLong(v)}
          aria-label="Horrible control"
          size={size}
        >
          <SegmentedControl.Option value="1">Weird</SegmentedControl.Option>
          <SegmentedControl.Option value="2">use</SegmentedControl.Option>
          <SegmentedControl.Option value="3">of this</SegmentedControl.Option>
          <SegmentedControl.Option value="4">component</SegmentedControl.Option>
          <SegmentedControl.Option value="5">but showing</SegmentedControl.Option>
          <SegmentedControl.Option value="6">it can</SegmentedControl.Option>
          <SegmentedControl.Option value="7">become</SegmentedControl.Option>
          <SegmentedControl.Option value="8">scrollable</SegmentedControl.Option>
        </SegmentedControl>
      </div>
    </div>
  )
}

Scrollable.parameters = {
  docs: {
    source: {
      code: `<div className="flex">
  <SegmentedControl>
    {...}
  </SegmentedControl>
</div>`,
    },
  },
}
