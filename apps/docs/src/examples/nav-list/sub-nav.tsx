import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Settings">
        <NavList.Item href="#profile">Profile</NavList.Item>
        <NavList.Item>
          Organization
          <NavList.SubNav>
            <NavList.Item href="#members">Members</NavList.Item>
            <NavList.Item href="#billing" aria-current="page">
              Billing
            </NavList.Item>
            <NavList.Item href="#audit-log">Audit log</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item defaultOpen>
          Developer
          <NavList.SubNav>
            <NavList.Item href="#api-keys">API keys</NavList.Item>
            <NavList.Item href="#webhooks">Webhooks</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
