import { NavList } from "kova-ui/components"

const moreChannels = ["design-crit", "release-train", "support-escalations", "random", "lunch"]

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Channels">
        <NavList.Group title="Channels" hideDivider>
          <NavList.Item href="#general" aria-current="page">
            general
          </NavList.Item>
          <NavList.Item href="#engineering">engineering</NavList.Item>
          <NavList.GroupExpand
            label="Show more channels"
            pages={2}
            items={moreChannels.map((channel) => ({ text: channel, href: `#${channel}` }))}
          />
        </NavList.Group>
      </NavList>
    </div>
  )
}

export { Example }
