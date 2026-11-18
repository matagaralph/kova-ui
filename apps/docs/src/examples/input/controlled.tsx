import { Field, Input } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [slug, setSlug] = useState("my-project")

  return (
    <Field className="w-72">
      <Field.Label>Project URL</Field.Label>
      <Input
        value={slug}
        onValueChange={(value, details) => {
          if (!/^[a-z0-9-]*$/.test(value)) details.cancel()
          else setSlug(value)
        }}
      />
      <Field.Description>kova.dev/{slug || "…"}</Field.Description>
    </Field>
  )
}

export { Example }
