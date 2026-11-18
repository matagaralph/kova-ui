import { Button, Combobox, Field } from "kova-ui/components"
import { useState } from "react"

const countries = [
  { value: "gh", label: "Ghana" },
  { value: "ke", label: "Kenya" },
  { value: "za", label: "South Africa" },
  { value: "zw", label: "Zimbabwe" },
]

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex w-64 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("country")))
      }}
    >
      <Field name="country">
        <Field.Label>Country</Field.Label>
        <Combobox required items={countries}>
          <Combobox.Control>
            <Combobox.Input placeholder="Search countries…" />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.List>
              {countries.map((country) => (
                <Combobox.Item key={country.value} value={country.value} label={country.label}>
                  {country.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
        <Field.Error match="valueMissing">Choose a country.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {submitted && <p className="text-sm text-secondary">Submitted country={submitted}</p>}
    </form>
  )
}

export { Example }
