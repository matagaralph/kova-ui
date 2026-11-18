import { CheckCircle } from "@kova-ui/icons"
import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    icon: CheckCircle,
    type: "select",
    options: [
      { value: "todo", label: "To do" },
      { value: "done", label: "Done" },
    ],
  },
]

function Example() {
  return (
    <div className="max-w-2xl flex w-full flex-col gap-6">
      <Filter label="Input only" variant="input" placeholder="Filter tasks" providers={providers} />
      <Filter
        label="Compact button"
        filterButtonVariant="compact"
        placeholder="Filter tasks"
        providers={providers}
      />
      <Filter
        label="Button only"
        variant="button"
        providers={providers}
        initialFilterValue="status:todo"
      />
    </div>
  )
}

export { Example }
