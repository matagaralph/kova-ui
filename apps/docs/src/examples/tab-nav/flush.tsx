import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Billing</h3>
      <TabNav aria-label="Billing" variant="flush">
        <TabNav.Link href="#plan" current>
          Plan
        </TabNav.Link>
        <TabNav.Link href="#invoices">Invoices</TabNav.Link>
        <TabNav.Link href="#payment">Payment method</TabNav.Link>
      </TabNav>
    </div>
  )
}

export { Example }
