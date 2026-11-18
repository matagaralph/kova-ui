import { Button } from "kova-ui/components"
import { type Theme, useTheme } from "kova-ui/theme"

const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
]

function Example() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div className="flex flex-col items-center gap-3">
      <div role="group" aria-label="Theme" className="flex gap-2">
        {THEMES.map((option) => (
          <Button
            key={option.value}
            variant={theme === option.value ? "solid" : "outline"}
            color={theme === option.value ? "primary" : "secondary"}
            aria-pressed={theme === option.value}
            onClick={() => setTheme(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <p className="text-sm text-secondary">Showing the {resolvedTheme} theme.</p>
    </div>
  )
}

export { Example }
