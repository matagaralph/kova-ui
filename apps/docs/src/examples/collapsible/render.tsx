import { Collapsible } from "kova-ui/components"

const steps = [
  { label: "Published", time: "Today 09:40" },
  { label: "Approved by Chipo Ncube", time: "Today 08:12" },
  { label: "Sent for review", time: "Mon 17:03" },
]

function Example() {
  return (
    <Collapsible className="w-80">
      <Collapsible.Trigger
        render={(props) => (
          <h3 className="m-0">
            <button {...props} />
          </h3>
        )}
      >
        {(state) => (
          <span className="flex flex-col">
            <span>History of “mbira”</span>
            <span className="text-xs font-normal text-secondary">
              {state.open ? "3 changes" : "Published today"}
            </span>
          </span>
        )}
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <ol className="flex flex-col gap-1">
          {steps.map((step) => (
            <li key={step.label} className="flex justify-between gap-4">
              <span className="text-default">{step.label}</span>
              <span>{step.time}</span>
            </li>
          ))}
        </ol>
      </Collapsible.Panel>
    </Collapsible>
  )
}

export { Example }
