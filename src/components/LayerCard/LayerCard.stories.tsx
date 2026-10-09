import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Badge } from "../Badge/index.js"
import { Button } from "../Button/index.js"
import { ArrowRight } from "../Icon/index.js"
import { Input } from "../Input/index.js"
import { SegmentedControl } from "../SegmentedControl/index.js"
import { LayerCard } from "./index.js"

const meta = {
  title: "Components/LayerCard",
  component: LayerCard,
  argTypes: {
    className: { control: false },
    render: { control: false },
  },
} satisfies Meta<typeof LayerCard>

export default meta

export const Base = () => (
  <LayerCard className="w-[320px]">
    <LayerCard.Secondary className="flex items-center justify-between">
      <div>Next Steps</div>
      <Button variant="ghost" color="secondary" size="sm" uniform aria-label="Go to next steps">
        <ArrowRight />
      </Button>
    </LayerCard.Secondary>

    <LayerCard.Primary>Get started with Kova UI</LayerCard.Primary>
  </LayerCard>
)

export const Basic = () => (
  <LayerCard className="w-[250px]">
    <LayerCard.Secondary>Getting Started</LayerCard.Secondary>
    <LayerCard.Primary>
      <p className="text-sm text-secondary">Quick start guide for new users</p>
    </LayerCard.Primary>
  </LayerCard>
)

export const Surface = () => (
  <LayerCard className="w-[250px] p-4">
    <p className="text-sm text-secondary">Quick start guide for new users</p>
  </LayerCard>
)

export const Multiple = () => (
  <div className="flex gap-4">
    <LayerCard className="w-[200px]">
      <LayerCard.Secondary>Components</LayerCard.Secondary>
      <LayerCard.Primary>
        <p className="text-sm">Browse all components</p>
      </LayerCard.Primary>
    </LayerCard>
    <LayerCard className="w-[200px]">
      <LayerCard.Secondary>Examples</LayerCard.Secondary>
      <LayerCard.Primary>
        <p className="text-sm">View code examples</p>
      </LayerCard.Primary>
    </LayerCard>
  </div>
)

const ORIGINS = [
  { origin: "challenges.example.com", s2xx: 1, s4xx: 0, duration: "95.4ms" },
  { origin: "Unknown", s2xx: 19, s4xx: 7, duration: "463.7ms" },
  { origin: "api.example.com", s2xx: 42, s4xx: 3, duration: "128.1ms" },
]

type StatusFilter = "all" | "2xx" | "3xx" | "4xx" | "5xx"

export const FilterToolbar = () => {
  const [filter, setFilter] = useState<StatusFilter>("all")
  const [search, setSearch] = useState("")

  const filtered = ORIGINS.filter((o) => {
    if (filter === "2xx" && o.s2xx === 0) return false
    if (filter === "4xx" && o.s4xx === 0) return false
    if (search && !o.origin.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <LayerCard className="w-full max-w-[540px]">
      <LayerCard.Secondary>Subrequests</LayerCard.Secondary>

      <LayerCard.Primary>
        <div className="mb-2 flex items-center gap-3">
          <Input
            size="xs"
            placeholder="Filter origins…"
            aria-label="Filter origins"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1"
          />
          <SegmentedControl<StatusFilter>
            size="xs"
            className="shrink-0"
            value={filter}
            onChange={setFilter}
            aria-label="Filter by status"
          >
            <SegmentedControl.Option value="all">All</SegmentedControl.Option>
            <SegmentedControl.Option value="2xx">2xx</SegmentedControl.Option>
            <SegmentedControl.Option value="3xx">3xx</SegmentedControl.Option>
            <SegmentedControl.Option value="4xx">4xx</SegmentedControl.Option>
            <SegmentedControl.Option value="5xx">5xx</SegmentedControl.Option>
          </SegmentedControl>
        </div>

        <div className="-mx-1 text-sm">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-default px-1 pb-2 text-xs font-medium text-secondary">
            <span>Origin</span>
            <span className="w-28 text-right">Requests</span>
            <span className="w-20 text-right">Duration</span>
          </div>

          {filtered.map((row, i) => (
            <div
              key={row.origin}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-1 py-2.5 ${i < filtered.length - 1 ? "border-b border-subtle" : ""}`}
            >
              <span className="truncate font-medium">{row.origin}</span>
              <div className="flex w-28 items-center justify-end gap-1.5">
                {row.s2xx > 0 && <Badge color="success">{`2xx ${row.s2xx}`}</Badge>}
                {row.s4xx > 0 && <Badge color="danger">{`4xx ${row.s4xx}`}</Badge>}
              </div>
              <span className="w-20 text-right text-secondary">{row.duration}</span>
            </div>
          ))}
        </div>

        <div className="-mx-1 border-t border-default pt-2 text-xs text-secondary">
          Showing {filtered.length} of {ORIGINS.length}
        </div>
      </LayerCard.Primary>
    </LayerCard>
  )
}

export const TestIds = () => (
  <LayerCard className="w-[250px]">
    <LayerCard.Secondary data-testid="card-header">Getting Started</LayerCard.Secondary>
    <LayerCard.Primary data-testid="card-body">
      <p className="text-sm text-secondary">Quick start guide for new users</p>
    </LayerCard.Primary>
  </LayerCard>
)
