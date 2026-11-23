import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-md flex w-full flex-col gap-2">
      <h3 className="text-lg font-semibold">mvura</h3>
      <TabNav aria-label="mvura" variant="flush">
        <TabNav.Link href="#meaning" current>
          Meaning
        </TabNav.Link>
        <TabNav.Link href="#recordings">Recordings</TabNav.Link>
        <TabNav.Link href="#history">History</TabNav.Link>
      </TabNav>
    </div>
  )
}

export { Example }
