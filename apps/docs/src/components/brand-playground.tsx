import { Button, Checkbox, Label, Switch, TextLink } from "kova-ui/components"
import { useTheme } from "kova-ui/theme"
import { type CSSProperties, useId, useState } from "react"

import { hexToOklch } from "../lib/oklch.js"
import { CopyButton } from "./copy-button.js"

type Brand = {
  primary: string
  foreground: string
  ring: string
  link: string
}

const PRESETS: { name: string; brand: Brand | null }[] = [
  { name: "Kova", brand: null },
  {
    name: "Blue",
    brand: { primary: "#0169cc", foreground: "#ffffff", ring: "#0285ff", link: "#0169cc" },
  },
  {
    name: "Green",
    brand: { primary: "#008635", foreground: "#ffffff", ring: "#04b84c", link: "#008635" },
  },
  {
    name: "Purple",
    brand: { primary: "#8046d9", foreground: "#ffffff", ring: "#924ff7", link: "#6b3ab4" },
  },
  {
    name: "Pink",
    brand: { primary: "#e04c91", foreground: "#ffffff", ring: "#ff66ad", link: "#ba437a" },
  },
  {
    name: "Yellow",
    brand: { primary: "#ffc300", foreground: "#1a1400", ring: "#e0ac00", link: "#916f00" },
  },
]

const FIELDS: { key: keyof Brand; variable: string; label: string }[] = [
  { key: "primary", variable: "--kova-primary", label: "Primary" },
  { key: "foreground", variable: "--kova-primary-foreground", label: "On primary" },
  { key: "ring", variable: "--kova-ring", label: "Focus ring" },
  { key: "link", variable: "--kova-link", label: "Link" },
]

function toCss(brand: Brand | null) {
  if (!brand) return "/* Kova's defaults: set nothing */"
  return `:root {\n${FIELDS.map((field) => `  ${field.variable}: ${hexToOklch(brand[field.key])};`).join("\n")}\n}`
}

/** Pick brand colors and see Kova components pick them up */
export default function BrandPlayground() {
  const { resolvedTheme } = useTheme()
  const [brand, setBrand] = useState<Brand | null>(PRESETS[1]?.brand ?? null)
  const id = useId()
  const css = toCss(brand)

  const style = Object.fromEntries(
    brand ? FIELDS.map((field) => [field.variable, brand[field.key]]) : [],
  ) as CSSProperties

  return (
    <div className="docs-playground">
      <div className="docs-playground-controls">
        <fieldset>
          <legend className="text-sm font-medium">Presets</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className="docs-chip"
                aria-pressed={brand === preset.brand}
                onClick={() => setBrand(preset.brand)}
              >
                <span
                  aria-hidden="true"
                  className="docs-chip-swatch"
                  style={{ background: preset.brand?.primary ?? "var(--gray-900)" }}
                />
                {preset.name}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          {FIELDS.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label htmlFor={`${id}-${field.key}`} className="text-sm font-medium">
                {field.label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`${id}-${field.key}`}
                  type="color"
                  className="docs-color-input"
                  value={brand?.[field.key] ?? "#181818"}
                  onChange={(event) =>
                    setBrand((current) => ({
                      ...(current ?? {
                        primary: "#181818",
                        foreground: "#ffffff",
                        ring: "#0169cc",
                        link: "#0169cc",
                      }),
                      [field.key]: event.target.value,
                    }))
                  }
                />
                <code className="text-fd-muted-foreground text-xs">{field.variable}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="docs-playground-canvas"
        data-theme={resolvedTheme}
        style={style}
        aria-label="Kova components with the selected brand"
        role="group"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>Save changes</Button>
          <Button variant="secondary">Soft</Button>
          <Button variant="outline">Tab to me</Button>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Label>
            <Switch defaultChecked>
              <Switch.Thumb />
            </Switch>
            Notifications
          </Label>
          <Label>
            <Checkbox defaultChecked>
              <Checkbox.Indicator />
            </Checkbox>
            Remember me
          </Label>
        </div>
        <p className="text-sm text-secondary">
          Read the{" "}
          <TextLink href="#theming-with-css-variables" primary>
            brand guide
          </TextLink>{" "}
          before you ship.
        </p>
      </div>

      <div className="docs-playground-output">
        <pre>
          <code>{css}</code>
        </pre>
        <CopyButton value={css} label="the CSS" className="docs-button docs-button-small">
          Copy CSS
        </CopyButton>
      </div>
    </div>
  )
}
