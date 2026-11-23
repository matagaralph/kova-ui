import { Button, Menu } from "kova-ui/components"
import { useState } from "react"

const orders = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name" },
]

function Example() {
  const [order, setOrder] = useState("newest")

  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>
        Sort: {orders.find((option) => option.value === order)?.label}
      </Menu.Trigger>
      <Menu.Content minWidth={220}>
        <Menu.RadioGroup value={order} onValueChange={setOrder}>
          <Menu.GroupLabel>Sort by</Menu.GroupLabel>
          {orders.map((option) => (
            <Menu.RadioItem key={option.value} value={option.value}>
              <Menu.ItemIndicator />
              {option.label}
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
