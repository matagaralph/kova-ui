import { Bell, Folder, Home, Settings } from "@kova-ui/icons"
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
        <NavList.Item href="#projects">
          <NavList.LeadingVisual>
            <Folder />
          </NavList.LeadingVisual>
          Projects
        </NavList.Item>
        <NavList.Item href="#notifications">
          <NavList.LeadingVisual>
            <Bell />
          </NavList.LeadingVisual>
          Notifications
        </NavList.Item>
        <NavList.Item href="#settings">
          <NavList.LeadingVisual>
            <Settings />
          </NavList.LeadingVisual>
          Settings
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
