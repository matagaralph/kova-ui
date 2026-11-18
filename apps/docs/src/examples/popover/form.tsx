import { Button, Field, Input, Popover } from "kova-ui/components"

function Example() {
  return (
    <Popover>
      <Popover.Trigger render={<Button color="secondary" variant="outline" />}>
        Rename
      </Popover.Trigger>
      <Popover.Content className="flex flex-col gap-3 p-4" minWidth={280}>
        <Popover.Title>Rename project</Popover.Title>
        <Field>
          <Field.Label>Name</Field.Label>
          <Input defaultValue="Apollo" />
        </Field>
        <div className="flex justify-end gap-2">
          <Popover.Close render={<Button color="secondary" variant="outline" size="sm" />}>
            Cancel
          </Popover.Close>
          <Popover.Close render={<Button color="primary" size="sm" />}>Save</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  )
}

export { Example }
