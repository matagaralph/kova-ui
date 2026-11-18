import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline" color="secondary">
        Disabled outline
      </Button>
      <Button disabled focusableWhenDisabled aria-describedby="publish-hint">
        Publish
      </Button>
      <p id="publish-hint" className="text-sm text-secondary">
        Add a title to publish.
      </p>
    </div>
  )
}

export { Example }
