import { Combobox, Field } from "kova-ui/components"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "tanstack-start", label: "TanStack Start" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Framework</Field.Label>
      <Combobox items={frameworks}>
        <Combobox.Control>
          <Combobox.Input placeholder="Select a framework" />
          <Combobox.Trigger aria-label="Show frameworks" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.Empty>No frameworks found.</Combobox.Empty>
          <Combobox.List>
            {frameworks.map((framework) => (
              <Combobox.Item key={framework.value} value={framework.value} label={framework.label}>
                {framework.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
