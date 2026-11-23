import { ArrowRight } from "@kova-ui/icons"
import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-80 flex-col gap-1">
      <h3 className="text-sm font-medium">Proverb of the day</h3>
      <p className="text-sm text-secondary">Chara chimwe hachitswanyi inda.</p>
      <div>
        <Button variant="ghost" size="sm" opticallyAlign="start">
          See all proverbs
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export { Example }
