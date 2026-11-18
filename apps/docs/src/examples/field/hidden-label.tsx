import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label visuallyHidden>Search projects</Field.Label>
      <Input type="search" name="q" placeholder="Search projects" />
    </Field>
  )
}

export { Example }
