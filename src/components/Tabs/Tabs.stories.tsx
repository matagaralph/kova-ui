import { type Meta } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../Button/index.js"
import {
  Calendar,
  Chart,
  Chat,
  Code,
  Comment,
  Eye,
  Folder,
  Invoice,
  Play,
  Settings,
  ShieldLock,
} from "../Icon/index.js"
import { Popover } from "../Popover/index.js"
import { Tabs } from "./index.js"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: { control: false },
    className: { control: false },
    as: { control: false },
  },
} satisfies Meta<typeof Tabs>

export default meta

export const Base = () => (
  <Tabs aria-label="Select a tab">
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
    <Tabs.Panel>Panel 1</Tabs.Panel>
    <Tabs.Panel>Panel 2</Tabs.Panel>
    <Tabs.Panel>Panel 3</Tabs.Panel>
  </Tabs>
)

export const WithCounters = () => (
  <Tabs aria-label="Select a tab">
    <Tabs.Tab counter="11K">Tab 1</Tabs.Tab>
    <Tabs.Tab counter={12}>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
    <Tabs.Panel>Panel 1</Tabs.Panel>
    <Tabs.Panel>Panel 2</Tabs.Panel>
    <Tabs.Panel>Panel 3</Tabs.Panel>
  </Tabs>
)

export const WithLeadingIcons = () => (
  <Tabs aria-label="Select a tab">
    <Tabs.Tab icon={Code}>Tab 1</Tabs.Tab>
    <Tabs.Tab icon={Eye}>Tab 2</Tabs.Tab>
    <Tabs.Tab icon={Comment}>Tab 3</Tabs.Tab>
    <Tabs.Panel>Panel 1</Tabs.Panel>
    <Tabs.Panel>Panel 2</Tabs.Panel>
    <Tabs.Panel>Panel 3</Tabs.Panel>
  </Tabs>
)

export const SelectedTab = () => (
  <Tabs aria-label="Select a tab" id="tab-panels">
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab aria-selected>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
    <Tabs.Panel>Panel 1</Tabs.Panel>
    <Tabs.Panel>Panel 2</Tabs.Panel>
    <Tabs.Panel>Panel 3</Tabs.Panel>
  </Tabs>
)

export const LabelledByExternalElement = () => (
  <>
    <h2 id="my-heading" className="mb-2 heading-md">
      Tabs example
    </h2>
    <Tabs aria-labelledby="my-heading">
      <Tabs.Tab>Tab 1</Tabs.Tab>
      <Tabs.Tab>Tab 2</Tabs.Tab>
      <Tabs.Tab>Tab 3</Tabs.Tab>
      <Tabs.Panel>Panel 1</Tabs.Panel>
      <Tabs.Panel>Panel 2</Tabs.Panel>
      <Tabs.Panel>Panel 3</Tabs.Panel>
    </Tabs>
  </>
)

export const WithIconsHiddenOnNarrowScreen = () => (
  <div className="max-w-[640px]">
    <Tabs aria-label="Tabs with icons">
      <Tabs.Tab icon={Code}>Tab 1</Tabs.Tab>
      <Tabs.Tab icon={Eye}>Tab 2</Tabs.Tab>
      <Tabs.Tab icon={Comment}>Tab 3</Tabs.Tab>
      <Tabs.Tab icon={Chat}>Tab 4</Tabs.Tab>
      <Tabs.Tab icon={Play}>Tab 5</Tabs.Tab>
      <Tabs.Tab icon={Folder}>Tab 6</Tabs.Tab>
      <Tabs.Tab icon={Chart}>Tab 7</Tabs.Tab>
      <Tabs.Tab icon={Settings}>Tab 8</Tabs.Tab>
      <Tabs.Tab icon={ShieldLock}>Tab 9</Tabs.Tab>
      <Tabs.Panel>Panel 1</Tabs.Panel>
      <Tabs.Panel>Panel 2</Tabs.Panel>
      <Tabs.Panel>Panel 3</Tabs.Panel>
      <Tabs.Panel>Panel 4</Tabs.Panel>
      <Tabs.Panel>Panel 5</Tabs.Panel>
      <Tabs.Panel>Panel 6</Tabs.Panel>
      <Tabs.Panel>Panel 7</Tabs.Panel>
      <Tabs.Panel>Panel 8</Tabs.Panel>
      <Tabs.Panel>Panel 9</Tabs.Panel>
    </Tabs>
  </div>
)

export const WithCountersInLoadingState = () => (
  <Tabs aria-label="Tabs with counters" loadingCounters>
    <Tabs.Tab counter="11K">Tab 1</Tabs.Tab>
    <Tabs.Tab counter={12}>Tab 2</Tabs.Tab>
    <Tabs.Panel>Panel 1</Tabs.Panel>
    <Tabs.Panel>Panel 2</Tabs.Panel>
  </Tabs>
)

export const Controlled = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  return (
    <>
      <Tabs
        aria-label="Billing period"
        value={billingPeriod}
        onChange={({ value }) => setBillingPeriod(value)}
      >
        <Tabs.Tab value="monthly" icon={Calendar}>
          Monthly
        </Tabs.Tab>
        <Tabs.Tab value="yearly" icon={Invoice}>
          Yearly
        </Tabs.Tab>
        <Tabs.Panel value="monthly">Pay month to month, cancel anytime…</Tabs.Panel>
        <Tabs.Panel value="yearly">Pay once a year and save 20%…</Tabs.Panel>
      </Tabs>
      <p className="mt-4">
        Selected billing period: <strong>{billingPeriod}</strong>
      </p>
    </>
  )
}

export const Uncontrolled = () => (
  <Tabs aria-label="Billing period" defaultValue="yearly">
    <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
    <Tabs.Tab value="yearly">Yearly</Tabs.Tab>
    <Tabs.Panel value="monthly">Pay month to month, cancel anytime…</Tabs.Panel>
    <Tabs.Panel value="yearly">Pay once a year and save 20%…</Tabs.Panel>
  </Tabs>
)

export const ManualActivation = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  return (
    <>
      <p className="mb-4">
        With <code>activationMode=&quot;manual&quot;</code>, arrow keys only move focus; press Enter
        or Space (or click) to commit selection. Prefer this when switching tabs triggers async work
        like a fetch.
      </p>
      <Tabs
        aria-label="Billing period"
        value={billingPeriod}
        activationMode="manual"
        onChange={({ value }) => setBillingPeriod(value)}
      >
        <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
        <Tabs.Tab value="yearly">Yearly</Tabs.Tab>
        <Tabs.Panel value="monthly">Pay month to month, cancel anytime…</Tabs.Panel>
        <Tabs.Panel value="yearly">Pay once a year and save 20%…</Tabs.Panel>
      </Tabs>
    </>
  )
}

export const InOverlay = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly")

  return (
    <Popover>
      <Popover.Trigger>
        <Button color="secondary" variant="outline">
          Select billing period
        </Button>
      </Popover.Trigger>
      <Popover.Content width={320}>
        <Tabs
          aria-label="Billing period"
          value={billingPeriod}
          onChange={({ value }) => setBillingPeriod(value)}
        >
          <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
          <Tabs.Tab value="yearly">Yearly</Tabs.Tab>
          <Tabs.Panel value="monthly" className="p-4">
            Pay month to month, cancel anytime…
          </Tabs.Panel>
          <Tabs.Panel value="yearly" className="p-4">
            Pay once a year and save 20%…
          </Tabs.Panel>
        </Tabs>
      </Popover.Content>
    </Popover>
  )
}
