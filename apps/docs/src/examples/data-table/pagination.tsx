import { createColumnHelper, DataTable, Pagination, Table } from "kova-ui/components"
import { useState } from "react"

type Submission = { id: number; contributor: string; words: number }

const contributors = [
  "Tendai Moyo",
  "Rudo Ncube",
  "Tatenda Mutasa",
  "Chipo Chikore",
  "Nyasha Gumbo",
  "Tinashe Sibanda",
]

const submissions: Submission[] = Array.from({ length: 64 }, (_, index) => ({
  id: 1001 + index,
  contributor: contributors[index % contributors.length],
  words: 1 + ((index * 7) % 40),
}))

const column = createColumnHelper<Submission>()

const columns = [
  column.column({ header: "Submission", field: "id", rowHeader: true }),
  column.column({ header: "Contributor", field: "contributor" }),
  column.column({
    header: "Words",
    field: "words",
    align: "end",
    renderCell: (row) => row.words.toLocaleString("en-US"),
  }),
]

const pageSize = 10

function Example() {
  const [page, setPage] = useState(1)
  const rows = submissions.slice((page - 1) * pageSize, page * pageSize)

  return (
    <Table.Container>
      <Table.Title as="h3" id="submissions-pagination">
        Submissions
      </Table.Title>
      <DataTable aria-labelledby="submissions-pagination" data={rows} columns={columns} />
      <Table.Footer>
        <Pagination
          aria-label="Submissions pages"
          total={submissions.length}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
        >
          <Pagination.Range />
          <Pagination.List>
            {({ items }) => (
              <>
                <Pagination.Item>
                  <Pagination.Previous />
                </Pagination.Item>
                {items.map((item) => (
                  <Pagination.Item key={item}>
                    {typeof item === "number" ? (
                      <Pagination.Link page={item} />
                    ) : (
                      <Pagination.Ellipsis />
                    )}
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next />
                </Pagination.Item>
              </>
            )}
          </Pagination.List>
        </Pagination>
      </Table.Footer>
    </Table.Container>
  )
}

export { Example }
