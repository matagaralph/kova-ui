import { Separator } from "kova-ui/components"

const details = [
  { term: "Headword", value: "mvura" },
  { term: "Part of speech", value: "Noun" },
  { term: "Meaning", value: "Water" },
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
