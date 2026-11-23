import { NavList } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-72">
      <NavList aria-label="Collections">
        <NavList.Item href="#proverbs" aria-current="page">
          Proverbs
          <NavList.Description>Updated 2 hours ago</NavList.Description>
        </NavList.Item>
        <NavList.Item href="#greetings">
          Greetings
          <NavList.Description variant="block">
            Mhoro, Mangwanani and Manheru, and how to answer Makadii?
          </NavList.Description>
        </NavList.Item>
        <NavList.Item href="#family">
          Family
          <NavList.Description truncate>
            Words for family: baba, amai, sekuru, ambuya and mwana
          </NavList.Description>
        </NavList.Item>
      </NavList>
    </div>
  )
}

export { Example }
