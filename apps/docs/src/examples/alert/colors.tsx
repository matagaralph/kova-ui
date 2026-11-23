import { Alert } from "kova-ui/components"

const colors = ["primary", "success", "danger", "warning", "caution", "info", "discovery"] as const

function Example() {
  return (
    <div className="max-w-lg flex w-full flex-col gap-6">
      {(["outline", "soft"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <p className="text-sm text-secondary">{variant}</p>
          {colors.map((color) => (
            <Alert
              key={color}
              variant={variant}
              color={color}
              title={`A ${color} message`}
              description="Read more in the contributor guide."
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export { Example }
