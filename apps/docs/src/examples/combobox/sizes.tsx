import { Combobox } from "kova-ui/components"

const sizes = ["sm", "md", "lg", "xl"] as const
const fruits = ["Apple", "Banana", "Mango", "Pear"]

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Combobox key={size} items={fruits}>
          <Combobox.Control
            size={size}
            variant={size === "xl" ? "soft" : "outline"}
            pill={size === "lg"}
          >
            <Combobox.Input aria-label={`Fruit, ${size}`} placeholder={`Size ${size}`} />
            <Combobox.Trigger aria-label="Show fruits" />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.List>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  {fruit}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      ))}
    </div>
  )
}

export { Example }
