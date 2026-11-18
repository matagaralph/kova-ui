import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      title="Scheduled maintenance"
      description="We'll be offline 2–4 AM UTC on July 14 while we upgrade our database."
      actions={
        <Button color="primary" variant="soft" pill>
          Dismiss
        </Button>
      }
    />
  )
}

export { Example }
