import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Button block>Continue</Button>
      <Button block color="secondary" variant="outline">
        Back
      </Button>
    </div>
  )
}

export { Example }
