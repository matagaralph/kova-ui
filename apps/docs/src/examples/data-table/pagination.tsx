import { createColumnHelper, DataTable, Pagination, Table } from "kova-ui/components"
import { useState } from "react"

type Order = { id: number; customer: string; total: number }

const customers = ["Northwind", "Contoso", "Fabrikam", "Tailspin", "Litware", "Adventure Works"]

const orders: Order[] = Array.from({ length: 64 }, (_, index) => ({
  id: 1001 + index,
  customer: customers[index % customers.length],
  total: 120 + ((index * 37) % 900),
}))

const column = createColumnHelper<Order>()

const columns = [
  column.column({ header: "Order", field: "id", rowHeader: true }),
  column.column({ header: "Customer", field: "customer" }),
  column.column({
    header: "Total",
    field: "total",
    align: "end",
    renderCell: (row) => `$${row.total.toLocaleString("en-US")}`,
  }),
]

const pageSize = 10

function Example() {
  const [page, setPage] = useState(1)
  const rows = orders.slice((page - 1) * pageSize, page * pageSize)

  return (
    <Table.Container>
      <Table.Title as="h3" id="orders-pagination">
        Orders
      </Table.Title>
      <DataTable aria-labelledby="orders-pagination" data={rows} columns={columns} />
      <Table.Footer>
        <Pagination
          aria-label="Orders pages"
          total={orders.length}
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
