import { AlertDialog, Button, DeleteResource } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [error, setError] = useState<string>()

  return (
    <DeleteResource
      resourceType="Workspace"
      resourceName="Marketing"
      caseSensitive={false}
      deleteButtonText="Delete forever"
      size="sm"
      errorMessage={error}
      onOpenChange={(open) => !open && setError(undefined)}
      onDelete={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setError("This workspace still has active projects. Move or delete them first.")
        throw new Error("Workspace isn't empty")
      }}
    >
      <AlertDialog.Trigger render={<Button color="danger" variant="outline" />}>
        Delete workspace
      </AlertDialog.Trigger>
    </DeleteResource>
  )
}

export { Example }
