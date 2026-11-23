import { ScrollArea } from "kova-ui/components"

const contributors = [
  {
    name: "Tendai Moyo",
    dialect: "Zezuru",
    city: "Harare",
    words: 412,
    recordings: 186,
    reviews: 97,
  },
  {
    name: "Rudo Ncube",
    dialect: "Karanga",
    city: "Masvingo",
    words: 288,
    recordings: 140,
    reviews: 211,
  },
  {
    name: "Tatenda Mutasa",
    dialect: "Manyika",
    city: "Mutare",
    words: 351,
    recordings: 92,
    reviews: 45,
  },
  {
    name: "Chipo Mapfumo",
    dialect: "Zezuru",
    city: "Harare",
    words: 197,
    recordings: 233,
    reviews: 18,
  },
  {
    name: "Farai Gumbo",
    dialect: "Korekore",
    city: "Gweru",
    words: 164,
    recordings: 77,
    reviews: 132,
  },
  {
    name: "Nyasha Chikore",
    dialect: "Ndau",
    city: "Mutare",
    words: 121,
    recordings: 64,
    reviews: 29,
  },
  {
    name: "Tafadzwa Sibanda",
    dialect: "Karanga",
    city: "Bulawayo",
    words: 243,
    recordings: 118,
    reviews: 76,
  },
  {
    name: "Kudzai Marufu",
    dialect: "Zezuru",
    city: "Harare",
    words: 98,
    recordings: 51,
    reviews: 12,
  },
  {
    name: "Tsitsi Mutasa",
    dialect: "Manyika",
    city: "Nyanga",
    words: 176,
    recordings: 143,
    reviews: 88,
  },
  {
    name: "Tinashe Moyo",
    dialect: "Korekore",
    city: "Harare",
    words: 67,
    recordings: 39,
    reviews: 54,
  },
]

function Example() {
  return (
    <ScrollArea type="auto" className="h-64 w-96 rounded-lg border border-default">
      <ScrollArea.Viewport role="region" aria-label="Contributors">
        <ScrollArea.Content>
          <table className="text-sm whitespace-nowrap">
            <thead>
              <tr className="text-start text-secondary">
                {["Name", "Dialect", "City", "Words", "Recordings", "Reviews"].map((heading) => (
                  <th key={heading} scope="col" className="px-4 py-2 text-start font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contributors.map((person) => (
                <tr key={person.name} className="border-t border-default">
                  <th scope="row" className="px-4 py-2 text-start font-medium">
                    {person.name}
                  </th>
                  <td className="px-4 py-2">{person.dialect}</td>
                  <td className="px-4 py-2">{person.city}</td>
                  <td className="px-4 py-2 tabular-nums">{person.words}</td>
                  <td className="px-4 py-2 tabular-nums">{person.recordings}</td>
                  <td className="px-4 py-2 tabular-nums">{person.reviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  )
}

export { Example }
