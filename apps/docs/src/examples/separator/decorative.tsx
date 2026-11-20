import { Button, Separator } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-xs flex w-full flex-col gap-3">
      <Button color="primary" block>
        Sign in with passkey
      </Button>
      <div className="flex items-center gap-3 text-sm text-secondary">
        <Separator decorative className="flex-1" />
        <span>or</span>
        <Separator decorative className="flex-1" />
      </div>
      <Button color="secondary" variant="outline" block>
        Email me a link
      </Button>
    </div>
  )
}

export { Example }
