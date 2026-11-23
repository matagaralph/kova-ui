import { KovaProvider, TabNav } from "kova-ui/components"
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
  { href: "/dictionary", label: "Dictionary" },
  { href: "/proverbs", label: "Proverbs" },
  { href: "/stories", label: "Stories" },
]

function Example() {
  const [route, setRoute] = useState("/dictionary")

  return (
    <NavigateContext value={setRoute}>
      <KovaProvider linkComponent={Link}>
        <TabNav aria-label="AmaShona">
          {routes.map((page) => (
            <TabNav.Link key={page.href} href={page.href} current={route === page.href}>
              {page.label}
            </TabNav.Link>
          ))}
        </TabNav>
      </KovaProvider>
    </NavigateContext>
  )
}

export { Example }
