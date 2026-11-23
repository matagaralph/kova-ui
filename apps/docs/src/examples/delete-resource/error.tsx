import { AlertDialog, Button, DeleteResource } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [error, setError] = useState<string>()

  return (
    <DeleteResource
      resourceType="Lesson"
      resourceName="Greetings"
      caseSensitive={false}
      deleteButtonText="Delete forever"
      size="sm"
      errorMessage={error}
      onOpenChange={(open) => !open && setError(undefined)}
      onDelete={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setError("This lesson is still in two collections. Remove it from them first.")
        throw new Error("Lesson is in use")
      }}
    >
      <AlertDialog.Trigger render={<Button variant="secondary-destructive" />}>
        Delete lesson
      </AlertDialog.Trigger>
    </DeleteResource>
  )
}

export { Example }
