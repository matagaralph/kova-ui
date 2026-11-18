import { Field, Select } from "kova-ui/components"

const regions = [
  { value: "us-east", label: "US East" },
  { value: "us-west", label: "US West" },
  { value: "europe", label: "Europe" },
  { value: "asia-pacific", label: "Asia Pacific" },
  { value: "africa", label: "Africa" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Regions</Field.Label>
      <Select
        multiple
        defaultValue={["us-east", "europe"]}
        placeholder="Select regions"
        items={regions}
      >
        <Select.Trigger>
          <Select.Value maxLabels={1} getMoreLabel={(count) => `${count} more`} />
        </Select.Trigger>
        <Select.Content>
          <Select.SelectAll />
          <Select.Separator />
          {regions.map((region) => (
            <Select.Item key={region.value} value={region.value}>
              {region.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
