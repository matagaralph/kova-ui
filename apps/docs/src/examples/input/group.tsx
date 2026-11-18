import { Globe, Search } from "@kova-ui/icons"
import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Input.Group>
        <Search className="fill-tertiary" />
        <Input type="search" aria-label="Search projects" placeholder="Search projects" />
        <Input.Clear aria-label="Clear search" />
      </Input.Group>
      <Field name="website">
        <Field.Label>Website</Field.Label>
        <Input.Group variant="soft">
          <Globe className="fill-tertiary" />
          <span className="text-secondary">https://</span>
          <Input placeholder="example.com" />
        </Input.Group>
      </Field>
    </div>
  )
}

export { Example }
