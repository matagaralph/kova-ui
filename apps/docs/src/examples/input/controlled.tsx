import { Field, Input } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [slug, setSlug] = useState("proverbs")

  return (
    <Field className="w-72">
      <Field.Label>Collection URL</Field.Label>
      <Input
        value={slug}
        onValueChange={(value, details) => {
          if (!/^[a-z0-9-]*$/.test(value)) details.cancel()
          else setSlug(value)
        }}
      />
      <Field.Description>/collections/{slug || "…"}</Field.Description>
    </Field>
  )
}

export { Example }
