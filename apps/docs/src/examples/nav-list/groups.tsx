import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList>
        <NavList.Heading>Mail</NavList.Heading>
        <NavList.Item href="#inbox" aria-current="page">
          Inbox
          <NavList.TrailingVisual>12</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item href="#drafts">
          Drafts
          <NavList.TrailingVisual>2</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Group title="Labels">
          <NavList.Item href="#clients">Clients</NavList.Item>
          <NavList.Item href="#invoices">Invoices</NavList.Item>
          <NavList.Item href="#travel">Travel</NavList.Item>
        </NavList.Group>
      </NavList>
    </div>
  )
}

export { Example }
