import { Separator } from "kova-ui/components"

const details = [
  { term: "Plan", value: "Pro" },
  { term: "Seats", value: "8 of 10" },
  { term: "Renews", value: "December 1, 2026" },
]

function Example() {
  return (
    <div className="max-w-xs flex w-full flex-col gap-3 text-sm">
      {details.map((detail, index) => (
        <div key={detail.term} className="contents">
          {index > 0 && <Separator />}
          <dl className="m-0 flex justify-between">
            <dt className="text-secondary">{detail.term}</dt>
            <dd className="m-0 font-medium">{detail.value}</dd>
          </dl>
        </div>
      ))}
    </div>
  )
}

export { Example }
