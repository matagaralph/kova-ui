import { AlertDialog, Button, DeleteResource } from "kova-ui/components"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Example() {
  return (
    <DeleteResource
      resourceType="Collection"
      resourceName="Family words"
      onDelete={() => wait(1500)}
    >
      <AlertDialog.Trigger render={<Button variant="destructive" />}>
        Delete collection
      </AlertDialog.Trigger>
    </DeleteResource>
  )
}

export { Example }
