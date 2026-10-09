import { type Meta } from "@storybook/react-vite"
import { type ReactElement, useState } from "react"
import {
  Analytics,
  CreditCard,
  Document,
  Folder,
  Home,
  Invoice,
  Settings,
  ShieldLock,
  Users,
} from "../Icon/index.js"
import { TabNav } from "./index.js"

const meta = {
  title: "Components/TabNav",
  component: TabNav,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: { control: false },
    className: { control: false },
    as: { control: false },
  },
} satisfies Meta<typeof TabNav>

export default meta

export const Base = () => (
  <TabNav aria-label="Workspace">
    <TabNav.Item href="#" aria-current="page">
      Overview
    </TabNav.Item>
    <TabNav.Item href="#">Projects</TabNav.Item>
    <TabNav.Item href="#">Analytics</TabNav.Item>
    <TabNav.Item href="#">Team</TabNav.Item>
    <TabNav.Item href="#">Settings</TabNav.Item>
  </TabNav>
)

export const WithCounters = () => (
  <TabNav aria-label="Workspace with counters">
    <TabNav.Item href="#" aria-current="page">
      Overview
    </TabNav.Item>
    <TabNav.Item href="#">Projects</TabNav.Item>
    <TabNav.Item href="#" counter={4}>
      Analytics
    </TabNav.Item>
    <TabNav.Item href="#" counter={2}>
      Team
    </TabNav.Item>
    <TabNav.Item href="#">Settings</TabNav.Item>
  </TabNav>
)

export const WithLeadingIcons = () => (
  <TabNav aria-label="Workspace with leading icons">
    <TabNav.Item href="#" leadingVisual={<Home />} aria-current="page">
      Overview
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Folder />}>
      Projects
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Analytics />}>
      Analytics
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Users />}>
      Team
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Settings />}>
      Settings
    </TabNav.Item>
  </TabNav>
)

export const WithIconsAndCounters = () => (
  <TabNav aria-label="Workspace with icons and counters">
    <TabNav.Item href="#" leadingVisual={<Home />}>
      Overview
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Folder />} counter={6}>
      Projects
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Analytics />} aria-current="page">
      Analytics
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Users />} counter={7}>
      Team
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Settings />}>
      Settings
    </TabNav.Item>
  </TabNav>
)

export const WithCounterLabels = () => (
  <TabNav aria-label="Workspace with counters">
    <TabNav.Item href="#" leadingVisual={<Home />} counter="11K" aria-current="page">
      Overview
    </TabNav.Item>
    <TabNav.Item href="#" leadingVisual={<Folder />} counter={12}>
      Projects
    </TabNav.Item>
  </TabNav>
)

const items: { navigation: string; icon: ReactElement; counter?: number | string }[] = [
  { navigation: "Overview", icon: <Home /> },
  { navigation: "Projects", icon: <Folder />, counter: "12K" },
  { navigation: "Documents", icon: <Document />, counter: 13 },
  { navigation: "Team", icon: <Users />, counter: 5 },
  { navigation: "Analytics", icon: <Analytics />, counter: 4 },
  { navigation: "Invoices", icon: <Invoice />, counter: 9 },
  { navigation: "Billing", icon: <CreditCard />, counter: "0" },
  { navigation: "Security", icon: <ShieldLock /> },
  { navigation: "Settings", icon: <Settings />, counter: 10 },
]

export const OverflowOnNarrowScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(1)

  return (
    <div className="max-w-[480px]">
      <TabNav aria-label="Workspace">
        {items.map((item, index) => (
          <TabNav.Item
            key={item.navigation}
            href={`#${item.navigation.toLowerCase()}`}
            leadingVisual={item.icon}
            aria-current={index === selectedIndex ? "page" : undefined}
            onSelect={(event) => {
              event.preventDefault()
              setSelectedIndex(index)
            }}
            counter={item.counter}
          >
            {item.navigation}
          </TabNav.Item>
        ))}
      </TabNav>
    </div>
  )
}

export const CountersLoadingState = () => (
  <TabNav aria-label="Workspace with loading counters" loadingCounters>
    {items.slice(0, 5).map((item, index) => (
      <TabNav.Item
        key={item.navigation}
        href="#"
        leadingVisual={item.icon}
        aria-current={index === 0 ? "page" : undefined}
        counter={item.counter}
      >
        {item.navigation}
      </TabNav.Item>
    ))}
  </TabNav>
)

export const VariantFlush = () => (
  <TabNav aria-label="Workspace" variant="flush">
    <TabNav.Item href="#" aria-current="page">
      Overview
    </TabNav.Item>
    <TabNav.Item href="#">Projects</TabNav.Item>
    <TabNav.Item href="#">Analytics</TabNav.Item>
    <TabNav.Item href="#">Team</TabNav.Item>
    <TabNav.Item href="#">Settings</TabNav.Item>
  </TabNav>
)
