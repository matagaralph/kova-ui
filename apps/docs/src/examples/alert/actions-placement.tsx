import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      title="Our terms of service have changed"
      description="We've clarified how we handle data, billing and user permissions. Review and accept the new terms to keep your service running."
      actionsPlacement="bottom"
      actions={
        <>
          <Button color="primary" variant="soft" pill>
            Remind me later
          </Button>
          <Button color="primary" pill>
            Review terms
          </Button>
        </>
      }
    />
  )
}

export { Example }
