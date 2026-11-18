import { Plus } from "@kova-ui/icons"
import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Projects">
        <NavList.Item href="#harbor" aria-current="page">
          Harbor redesign
          <NavList.TrailingAction label="New task in Harbor redesign" icon={Plus} />
        </NavList.Item>
        <NavList.Item href="#checkout">
          Checkout flow
          <NavList.TrailingAction label="New task in Checkout flow" icon={Plus} />
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
