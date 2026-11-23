import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList>
        <NavList.Heading>Contributions</NavList.Heading>
        <NavList.Item href="#in-review" aria-current="page">
          In review
          <NavList.TrailingVisual>12</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item href="#drafts">
          Drafts
          <NavList.TrailingVisual>2</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Group title="Dialects">
          <NavList.Item href="#zezuru">Zezuru</NavList.Item>
          <NavList.Item href="#karanga">Karanga</NavList.Item>
          <NavList.Item href="#manyika">Manyika</NavList.Item>
        </NavList.Group>
      </NavList>
    </div>
  )
}

export { Example }
