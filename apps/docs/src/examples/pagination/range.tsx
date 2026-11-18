import { Pagination } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [page, setPage] = useState(3)

  return (
    <Pagination
      aria-label="Invoices"
      total={243}
      pageSize={25}
      page={page}
      onPageChange={setPage}
      showPages
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
  )
}

export { Example }
