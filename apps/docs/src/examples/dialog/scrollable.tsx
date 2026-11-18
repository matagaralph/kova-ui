import { Button, Dialog } from "kova-ui/components"

const sections = [
  "These terms govern your use of the service. By creating an account, you agree to them and to the privacy policy.",
  "You're responsible for the content you upload and for keeping your password safe.",
  "We may change the service, and these terms, as the product grows. We'll email you 30 days before a change affects you.",
  "You can stop using the service at any time. We keep your data for 30 days after you close your account, then delete it.",
  "The service is provided as is. To the extent the law allows, we aren't liable for indirect damages.",
  "If you have questions about these terms, write to us. We reply within two working days.",
]

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button color="secondary" variant="outline" />}>
        Read the terms
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content width="large" height="small" initialFocus="content">
        <Dialog.Header>
          <Dialog.Title>Terms of service</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-3">
          {sections.map((section) => (
            <p key={section}>{section}</p>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button color="secondary" variant="outline" />}>
            Decline
          </Dialog.Close>
          <Dialog.Close value="accept" render={<Button color="primary" />}>
            Accept
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
