import { CopyButton } from "kova-ui/components"

function Example() {
  return (
    <CopyButton copyValue="Chara chimwe hachitswanyi inda." variant="secondary">
      {({ copied }) => (copied ? "Copied" : "Copy proverb")}
    </CopyButton>
  )
}

export { Example }
