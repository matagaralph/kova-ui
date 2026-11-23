import { OTPInput } from "kova-ui/components"

const sizes = ["sm", "md", "lg", "xl"] as const

function Example() {
  return (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <OTPInput key={size} size={size} maxLength={4} aria-label={`PIN, ${size}`}>
          <OTPInput.Group>
            {[0, 1, 2, 3].map((index) => (
              <OTPInput.Slot key={index} index={index} />
            ))}
          </OTPInput.Group>
        </OTPInput>
      ))}
    </div>
  )
}

export { Example }
