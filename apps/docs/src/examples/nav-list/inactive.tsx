import { Book, Home, Mic } from "@kova-ui/icons"
import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Main">
        <NavList.Item href="#home" aria-current="page">
          <NavList.LeadingVisual>
            <Home />
          </NavList.LeadingVisual>
          Home
        </NavList.Item>
        <NavList.Item href="#dictionary" tooltipText="Every word, with its meanings and recordings">
          <NavList.LeadingVisual>
            <Book />
          </NavList.LeadingVisual>
          Dictionary
        </NavList.Item>
        <NavList.Item
          href="#recordings"
          inactiveText="Recordings are down for maintenance until 6 PM"
        >
          <NavList.LeadingVisual>
            <Mic />
          </NavList.LeadingVisual>
          Recordings
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
