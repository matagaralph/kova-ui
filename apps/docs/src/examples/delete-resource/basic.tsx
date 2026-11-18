import { AlertDialog, Button, DeleteResource } from "kova-ui/components"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Example() {
  return (
    <DeleteResource resourceType="Project" resourceName="apollo-web" onDelete={() => wait(1500)}>
      <AlertDialog.Trigger render={<Button color="danger" />}>Delete project</AlertDialog.Trigger>
    </DeleteResource>
  )
}

export { Example }
