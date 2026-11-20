import { Separator } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-xs flex w-full flex-col gap-3 text-sm">
      <div className="flex flex-col gap-0.5">
        <h3 className="m-0 text-sm font-semibold">Rudo Chikwanha</h3>
        <p className="m-0 text-secondary">rudo.chikwanha@example.com</p>
      </div>
      <Separator />
      <p className="m-0">
        Designs the billing and onboarding flows, and reviews every new pricing page.
      </p>
    </div>
  )
}

export { Example }
