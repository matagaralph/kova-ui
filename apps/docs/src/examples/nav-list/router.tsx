import { KovaProvider, NavList } from "kova-ui/components"
import { type ComponentProps, createContext, use, useState } from "react"

const NavigateContext = createContext<(href: string) => void>(() => {})

// Stands in for a router's Link: it navigates without reloading the page
function Link({ href = "", onClick, ...props }: ComponentProps<"a">) {
  const navigate = use(NavigateContext)
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
        navigate(href)
      }}
    />
  )
}

const routes = [
  { href: "/overview", label: "Overview" },
  { href: "/dictionary", label: "Dictionary" },
  { href: "/contributors", label: "Contributors" },
]

function Example() {
  const [route, setRoute] = useState("/overview")

  return (
    <NavigateContext value={setRoute}>
      <KovaProvider linkComponent={Link}>
        <div className="max-w-64">
          <NavList aria-label="Main">
            {routes.map((page) => (
              <NavList.Item
                key={page.href}
                href={page.href}
                aria-current={route === page.href ? "page" : undefined}
              >
                {page.label}
              </NavList.Item>
            ))}
            <NavList.Item href="https://en.wikipedia.org/wiki/Shona_language">
              Shona on Wikipedia
            </NavList.Item>
          </NavList>
        </div>
      </KovaProvider>
    </NavigateContext>
  )
}

export { Example }
