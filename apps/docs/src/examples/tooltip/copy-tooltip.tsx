import { Button, CopyTooltip } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-2 text-sm">
      API key
      <CopyTooltip
        copyValue="sk_live_51Hx9"
        render={<Button color="secondary" variant="soft" size="sm" className="font-mono" />}
      >
        sk_live_51Hx9
      </CopyTooltip>
    </div>
  )
}

export { Example }
