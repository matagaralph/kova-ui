import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-72">
      <NavList aria-label="Repositories">
        <NavList.Item href="#kova-ui" aria-current="page">
          kova-ui
          <NavList.Description>Updated 2 hours ago</NavList.Description>
        </NavList.Item>
        <NavList.Item href="#docs">
          docs
          <NavList.Description variant="block">
            The documentation site, built with TanStack Start.
          </NavList.Description>
        </NavList.Item>
        <NavList.Item href="#icons">
          icons
          <NavList.Description truncate>
            Every icon in the design system, exported as React components
          </NavList.Description>
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
