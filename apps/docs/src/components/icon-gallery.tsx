import * as Icons from "@kova-ui/icons"
import { CodeBlock } from "@kova-ui/markdown"
import { Blankslate, Button, CopyButton, Dialog, Menu, Tabs } from "kova-ui/components"
import { type ComponentType, type SVGProps, useDeferredValue, useRef, useState } from "react"

type IconEntry = [string, ComponentType<SVGProps<SVGSVGElement>>]

const ICONS = Object.entries(Icons as Record<string, unknown>)
  .filter((entry): entry is IconEntry => /^[A-Z]/.test(entry[0]))
  .sort(([a], [b]) => a.localeCompare(b))

const SIZES = ["16", "24"] as const

const VIEWS = [
  { value: "all", label: "All icons" },
  { value: "outline", label: "Outline" },
  { value: "filled", label: "Filled" },
]

const isFilled = (name: string) => name.includes("Filled")

/** Every icon in `@kova-ui/icons`, searchable. Selecting one opens its details in a side sheet */
export default function IconGallery() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<IconEntry | null>(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState("all")
  const query = useDeferredValue(search.trim().toLowerCase())
  const results = ICONS.filter(
    ([name]) =>
      name.toLowerCase().includes(query) &&
      (view === "all" || (view === "filled") === isFilled(name)),
  )

  return (
    <div>
      <div className="docs-search">
        <Icons.Search aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
          aria-label="Search icons"
          autoComplete="off"
          spellCheck={false}
        />
        <Menu>
          <Menu.Trigger
            render={<Button color="secondary" variant="outline" size="md" />}
            className="docs-icon-view"
          >
            <span className="text-secondary">View:</span>{" "}
            {VIEWS.find((option) => option.value === view)?.label}
            <Icons.ChevronDown aria-hidden />
          </Menu.Trigger>
          <Menu.Content minWidth={200} className="docs-view-menu">
            <Menu.RadioGroup value={view} onValueChange={setView}>
              {VIEWS.map((option) => (
                <Menu.RadioItem key={option.value} value={option.value}>
                  <Menu.ItemIndicator variant="ghost" className="docs-tick" />
                  {option.label}
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Content>
        </Menu>
      </div>
      {results.length === 0 ? (
        <Blankslate fill="none" className="pt-8">
          <Blankslate.Icon size="sm">
            <Icons.Search />
          </Blankslate.Icon>
          <Blankslate.Description>
            {search ? (
              <>
                No icons found matching <strong>"{search}"</strong>
              </>
            ) : (
              "No icons in this view"
            )}
          </Blankslate.Description>
        </Blankslate>
      ) : (
        <ul className="docs-icon-grid">
          {results.map((entry) => {
            const [name, Icon] = entry
            return (
              <li key={name}>
                <button
                  type="button"
                  className="docs-icon"
                  aria-haspopup="dialog"
                  onClick={() => {
                    setSelected(entry)
                    setOpen(true)
                  }}
                >
                  <span className="docs-icon-box">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="docs-icon-name">{name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Backdrop variant="fade" />
        <Dialog.Content
          position={{ regular: "right", narrow: "bottom" }}
          width="large"
          className="docs-icon-sheet"
        >
          {selected && <IconDetails key={selected[0]} name={selected[0]} Icon={selected[1]} />}
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

function IconDetails({ name, Icon }: { name: string; Icon: IconEntry[1] }) {
  const [size, setSize] = useState<(typeof SIZES)[number]>("16")
  const previewRef = useRef<HTMLDivElement>(null)

  const svgMarkup = () => {
    const svg = previewRef.current?.querySelector("svg")?.cloneNode(true)
    if (!(svg instanceof SVGSVGElement)) return ""
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svg.setAttribute("width", size)
    svg.setAttribute("height", size)
    svg.removeAttribute("aria-hidden")
    return svg.outerHTML
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([svgMarkup()], { type: "image/svg+xml" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `${name}-${size}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Dialog.Header>
        <div className="docs-icon-sheet-heading">
          <Dialog.Title>{name}</Dialog.Title>
          <div className="docs-icon-sheet-actions">
            <Button
              color="secondary"
              variant="ghost"
              size="sm"
              uniform
              aria-label={`Download ${name} SVG`}
              title="Download SVG"
              onClick={download}
            >
              <Icons.Download />
            </Button>
            <CopyButton
              color="secondary"
              variant="ghost"
              size="sm"
              uniform
              aria-label={`Copy ${name} SVG`}
              title="Copy SVG"
              copyValue={svgMarkup}
            />
          </div>
        </div>
      </Dialog.Header>
      <Dialog.Body className="docs-icon-sheet-body">
        <Tabs value={size} onValueChange={(value) => setSize(value as typeof size)}>
          <Tabs.List aria-label="Size">
            {SIZES.map((value) => (
              <Tabs.Tab key={value} value={value}>
                {value}px
              </Tabs.Tab>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs>
        <div ref={previewRef} className="docs-icon-sheet-preview">
          <Icon aria-hidden="true" />
        </div>
        <h3>Usage</h3>
        <p>Import the icon from the icons package, and set its size:</p>
        <CodeBlock language="tsx">
          {`import { ${name} } from "@kova-ui/icons"\n\n<${name} width={${size}} height={${size}} />`}
        </CodeBlock>
      </Dialog.Body>
    </>
  )
}
