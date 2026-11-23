import { Table } from "kova-ui/components"

const contributors = [
  { id: 1, name: "Tendai Moyo", dialect: "Zezuru", location: "Harare" },
  { id: 2, name: "Rumbidzai Mapfumo", dialect: "Manyika", location: null },
  { id: 3, name: "Tafadzwa Marufu", dialect: "Karanga", location: "Masvingo" },
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="contributors-table">
        Contributors
      </Table.Title>
      <Table aria-labelledby="contributors-table" gridTemplateColumns="2fr 1fr 1fr">
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Dialect</Table.Header>
            <Table.Header>Location</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {contributors.map((person) => (
            <Table.Row key={person.id}>
              <Table.Cell scope="row">{person.name}</Table.Cell>
              <Table.Cell>{person.dialect}</Table.Cell>
              <Table.Cell>
                {person.location ?? <Table.CellPlaceholder>Not shared</Table.CellPlaceholder>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  )
}

export { Example }
