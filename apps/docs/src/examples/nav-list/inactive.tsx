import { Chart, Folder, Home } from "@kova-ui/icons"
import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Workspace">
        <NavList.Item href="#home" aria-current="page">
          <NavList.LeadingVisual>
            <Home />
          </NavList.LeadingVisual>
          Home
        </NavList.Item>
        <NavList.Item href="#projects" tooltipText="Everything your team is working on">
          <NavList.LeadingVisual>
            <Folder />
          </NavList.LeadingVisual>
          Projects
        </NavList.Item>
        <NavList.Item href="#insights" inactiveText="Insights are down for maintenance until 6 PM">
          <NavList.LeadingVisual>
            <Chart />
          </NavList.LeadingVisual>
          Insights
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
