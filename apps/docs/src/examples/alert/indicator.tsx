import { Lightbulb } from "@kova-ui/icons"
import { Alert } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-lg flex w-full flex-col gap-3">
      <Alert
        indicator={<Lightbulb />}
        title="Tip"
        description="Press / anywhere to search the dictionary."
      />
      <Alert
        indicator={false}
        description="Saved words and their recordings now work offline. Updates apply the next time you open the app."
      />
    </div>
  )
}

export { Example }
