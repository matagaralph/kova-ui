import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      variant="soft"
      color="warning"
      title="Password expires in 3 days"
      description="Update it now to avoid losing access to your account."
      actions={
        <Button color="primary" pill>
          Update password
        </Button>
      }
    />
  )
}

export { Example }
