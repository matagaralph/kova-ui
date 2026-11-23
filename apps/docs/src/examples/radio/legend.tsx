import { Field, Label, Radio } from "kova-ui/components"
import { useId } from "react"

const languages = [
  { value: "english", label: "In English", detail: "for learners" },
  { value: "shona", label: "In Shona", detail: "for fluent readers" },
]

function Example() {
  const id = useId()
  return (
    <Field.Set>
      <Field.Legend id={`${id}-legend`}>Meanings</Field.Legend>
      <Field.Description id={`${id}-description`}>
        Learners usually start with meanings in English.
      </Field.Description>
      <Radio.Group
        defaultValue="english"
        direction="col"
        aria-labelledby={`${id}-legend`}
        aria-describedby={`${id}-description`}
      >
        {languages.map((language) => (
          <Label key={language.value}>
            <Radio value={language.value}>
              <Radio.Indicator />
            </Radio>
            {language.label}
            <span className="text-secondary">({language.detail})</span>
          </Label>
        ))}
      </Radio.Group>
    </Field.Set>
  )
}

export { Example }
