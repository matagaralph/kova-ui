import { Label, Radio } from "kova-ui/components"
import { useState } from "react"

const themes = ["Light", "Dark", "System"]

function Example() {
  const [theme, setTheme] = useState<string | null>("System")

  return (
    <div className="flex flex-col gap-3">
      <Radio.Group aria-label="Theme" value={theme} onValueChange={setTheme}>
        {themes.map((name) => (
          <Label key={name}>
            <Radio value={name}>
              <Radio.Indicator />
            </Radio>
            {name}
          </Label>
        ))}
      </Radio.Group>
      <p className="text-sm text-secondary">Theme: {theme}</p>
    </div>
  )
}

export { Example }
