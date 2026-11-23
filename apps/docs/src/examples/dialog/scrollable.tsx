import { Button, Dialog } from "kova-ui/components"

const sections = [
  "Add words as people say them. Write each headword in standard Shona spelling, and note its dialect when it's local to one.",
  "Give each meaning in plain English, with an example sentence where you can.",
  "Record pronunciations in a quiet room. Say the word once, clearly, at an everyday pace.",
  "Credit your sources. When a proverb or story comes from a book or from someone who told it to you, say so.",
  "Reviewers check every entry before it's published. They may ask for changes, and their notes appear on the entry.",
  "Be kind in comments. Many contributors are still learning, and every dialect is welcome.",
]

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Read the guidelines</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content width="large" height="small" initialFocus="content">
        <Dialog.Header>
          <Dialog.Title>Contributor guidelines</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-3">
          {sections.map((section) => (
            <p key={section}>{section}</p>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline" />}>Decline</Dialog.Close>
          <Dialog.Close value="accept" render={<Button />}>
            Accept
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
