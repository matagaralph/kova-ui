import { Alert, Button } from "kova-ui/components"

function Example() {
  return (
    <Alert
      title="Our contributor guidelines have changed"
      description="We've clarified how to cite sources, record pronunciations and credit other speakers. Review the new guidelines before you send more entries for review."
      actionsPlacement="bottom"
      actions={
        <>
          <Button variant="secondary" pill>
            Remind me later
          </Button>
          <Button pill>Review guidelines</Button>
        </>
      }
    />
  )
}

export { Example }
