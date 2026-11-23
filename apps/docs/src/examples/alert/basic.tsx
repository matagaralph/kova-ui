import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      title="Scheduled maintenance"
      description="The dictionary will be read-only 2–4 AM CAT on July 14 while we move recordings to new storage."
      actions={
        <Button variant="secondary" pill>
          Dismiss
        </Button>
      }
    />
  )
}

export { Example }
