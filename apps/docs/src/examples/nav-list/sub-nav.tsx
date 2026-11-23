import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Settings">
        <NavList.Item href="#profile">Profile</NavList.Item>
        <NavList.Item>
          Contributions
          <NavList.SubNav>
            <NavList.Item href="#drafts">Drafts</NavList.Item>
            <NavList.Item href="#in-review" aria-current="page">
              In review
            </NavList.Item>
            <NavList.Item href="#published">Published</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultOpen>
          Preferences
          <NavList.SubNav>
            <NavList.Item href="#dialect">Dialect</NavList.Item>
            <NavList.Item href="#notifications">Notifications</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
