import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      variant="soft"
      color="warning"
      title="Your entry for “rwizi” needs changes"
      description="A reviewer left 2 comments. Update the entry to send it back to the review queue."
      actions={<Button pill>Open entry</Button>}
    />
  )
}

export { Example }
