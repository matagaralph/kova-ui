import { Pagination } from "kova-ui/components"

function Example() {
  return (
    <Pagination aria-label="Pronunciation recordings" total={1830} pageSize={50} showPages={false}>
      <Pagination.Range />
      <Pagination.List>
        <Pagination.Item>
          <Pagination.First />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Previous />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Last />
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  )
}

export { Example }
