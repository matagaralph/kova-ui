import { Button } from "kova-ui/components"

function Example() {
  return (
    <Button onClick={() => new Promise((resolve) => setTimeout(resolve, 1500))}>
      Upload recording
    </Button>
  )
}

export { Example }
