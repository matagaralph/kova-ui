import { Pagination } from "kova-ui/components"

function Example() {
  return (
    <Pagination
      aria-label="Blog posts"
      pageCount={8}
      defaultPage={2}
      getHref={(page) => `#posts-page-${page}`}
      showPages
    >
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
