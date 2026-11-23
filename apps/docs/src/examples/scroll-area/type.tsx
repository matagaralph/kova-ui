import { ScrollArea, type ScrollAreaType } from "kova-ui/components"

const months = [
  "Ndira",
  "Kukadzi",
  "Kurume",
  "Kubvumbi",
  "Chivabvu",
  "Chikumi",
  "Chikunguru",
  "Nyamavhuvhu",
  "Gunyana",
  "Gumiguru",
  "Mbudzi",
  "Zvita",
]

const types: ScrollAreaType[] = ["hover", "scroll", "auto", "always"]

function Example() {
  return (
    <div className="sm:grid-cols-4 grid grid-cols-2 gap-4">
      {types.map((type) => (
        <div key={type} className="flex flex-col gap-2">
          <code className="text-xs text-secondary">type="{type}"</code>
          <ScrollArea type={type} className="h-40 w-32 rounded-lg border border-default">
            <ScrollArea.Viewport aria-label={`Months, ${type}`}>
              <ScrollArea.Content>
                <ul className="px-3 py-2 text-sm">
                  {months.map((month) => (
                    <li key={month} className="py-1">
                      {month}
                    </li>
                  ))}
                </ul>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}

export { Example }
