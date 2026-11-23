import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Button block>Create account</Button>
      <Button block variant="outline">
        Sign in
      </Button>
    </div>
  )
}

export { Example }
