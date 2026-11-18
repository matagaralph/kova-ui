import { Table } from "kova-ui/components"

const people = [
  { id: 1, name: "Inès Moreau", team: "Design", location: "Lyon" },
  { id: 2, name: "Kofi Mensah", team: "Engineering", location: null },
  { id: 3, name: "Wren Takahashi", team: "Research", location: "Osaka" },
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="people-table">
        People
      </Table.Title>
      <Table aria-labelledby="people-table" gridTemplateColumns="2fr 1fr 1fr">
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Team</Table.Header>
            <Table.Header>Location</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {people.map((person) => (
            <Table.Row key={person.id}>
              <Table.Cell scope="row">{person.name}</Table.Cell>
              <Table.Cell>{person.team}</Table.Cell>
              <Table.Cell>
                {person.location ?? <Table.CellPlaceholder>Remote</Table.CellPlaceholder>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  )
}

export { Example }
