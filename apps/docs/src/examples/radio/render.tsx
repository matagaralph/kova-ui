import { Check } from "@kova-ui/icons"
import { Field, Radio } from "kova-ui/components"
import { useId } from "react"

const options = [
  { value: "all", label: "Everything", description: "Every message and update." },
  { value: "mentions", label: "Mentions", description: "Only when someone mentions you." },
  { value: "none", label: "Nothing", description: "Turn notifications off." },
]

function Example() {
  const id = useId()
  return (
    <Field className="w-72">
      <Field.Label>Notify me about</Field.Label>
      <Radio.Group defaultValue="mentions" direction="col" className="w-full">
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            aria-labelledby={`${id}-${option.value}-label`}
            aria-describedby={`${id}-${option.value}-description`}
            render={(props, state) => (
              <button
                {...props}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-default p-3 text-start hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-(--color-ring) data-checked:border-(--color-primary)"
              >
                <span className="flex flex-col text-sm">
                  <span id={`${id}-${option.value}-label`} className="font-medium">
                    {option.label}
                  </span>
                  <span id={`${id}-${option.value}-description`} className="text-secondary">
                    {option.description}
                  </span>
                </span>
                <Check
                  aria-hidden="true"
                  className={state.checked ? "size-4" : "invisible size-4"}
                />
              </button>
            )}
          />
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
