import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Review = { id: number; headword: string; reviewer: string; due: string }

const column = createColumnHelper<Review>()

const columns = [
  column.column({ header: "Entry", field: "headword", rowHeader: true }),
  column.column({ header: "Reviewer", field: "reviewer" }),
  column.column({ header: "Due", field: "due", width: "auto" }),
]

const data = [
  {
    groupId: "in-review",
    label: "In review",
    rows: [
      { id: 1, headword: "nzou", reviewer: "Tsitsi Marufu", due: "Nov 20" },
      { id: 2, headword: "rwizi", reviewer: "Takudzwa Gumbo", due: "Nov 22" },
    ],
  },
  {
    groupId: "draft",
    label: "Draft",
    rows: [{ id: 3, headword: "gomo", reviewer: "Kudzai Mapfumo", due: "Dec 1" }],
  },
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="review-groups">
        Review queue
      </Table.Title>
      <DataTable aria-labelledby="review-groups" data={data} columns={columns} />
    </Table.Container>
  )
}

export { Example }
