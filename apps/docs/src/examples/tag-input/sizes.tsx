import { TagInput } from "kova-ui/components"

const sizes = ["md", "lg", "xl", "2xl", "3xl"] as const

function Example() {
  return (
    <div className="flex w-96 flex-col gap-3">
      {sizes.map((size) => (
        <TagInput key={size} defaultValue={["Zezuru", "Karanga"]}>
          <TagInput.Control size={size}>
            <TagInput.Value />
            <TagInput.Input aria-label={`Tags, ${size}`} placeholder={`Size ${size}`} />
          </TagInput.Control>
        </TagInput>
      ))}
    </div>
  )
}

export { Example }
