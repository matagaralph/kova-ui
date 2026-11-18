import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field.Set className="w-80">
      <Field.Legend>Shipping address</Field.Legend>
      <Field.Description>We'll deliver your order here.</Field.Description>
      <Field.Group>
        <Field name="street">
          <Field.Label>Street address</Field.Label>
          <Input autoComplete="street-address" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field name="city">
            <Field.Label>City</Field.Label>
            <Input autoComplete="address-level2" />
          </Field>
          <Field name="postal-code">
            <Field.Label>Postal code</Field.Label>
            <Input autoComplete="postal-code" />
          </Field>
        </div>
      </Field.Group>
    </Field.Set>
  )
}

export { Example }
