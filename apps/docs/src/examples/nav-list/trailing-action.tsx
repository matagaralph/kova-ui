import { Plus } from "@kova-ui/icons"
import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-64">
      <NavList aria-label="Collections">
        <NavList.Item href="#proverbs" aria-current="page">
          Proverbs
          <NavList.TrailingAction label="Add an entry to Proverbs" icon={Plus} />
        </NavList.Item>
        <NavList.Item href="#greetings">
          Greetings
          <NavList.TrailingAction label="Add an entry to Greetings" icon={Plus} />
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
