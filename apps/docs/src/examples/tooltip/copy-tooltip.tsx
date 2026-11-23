import { Button, CopyTooltip } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-2 text-sm">
      Proverb
      <CopyTooltip copyValue="Kugara hunzwana." render={<Button variant="secondary" size="sm" />}>
        Kugara hunzwana.
      </CopyTooltip>
    </div>
  )
}

export { Example }
