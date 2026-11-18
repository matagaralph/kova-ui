import { Checkbox, Field, Label } from "kova-ui/components"

const toppings = [
  { value: "cheese", label: "Cheese" },
  { value: "mushrooms", label: "Mushrooms" },
  { value: "olives", label: "Olives" },
  { value: "peppers", label: "Peppers" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Toppings</Field.Label>
      <Checkbox.Group defaultValue={["cheese", "olives"]} allValues={toppings.map((t) => t.value)}>
        <Label>
          <Checkbox parent>
            <Checkbox.Indicator />
          </Checkbox>
          All toppings
        </Label>
        {toppings.map((topping) => (
          <Label key={topping.value}>
            <Checkbox value={topping.value}>
              <Checkbox.Indicator />
            </Checkbox>
            {topping.label}
          </Label>
        ))}
      </Checkbox.Group>
    </Field>
  )
}

export { Example }
