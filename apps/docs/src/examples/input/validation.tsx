import { Button, Field, Input } from "kova-ui/components"

function Example() {
  return (
    <form
      className="flex w-72 flex-col items-start gap-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Input type="email" required />
        <Field.Error match="valueMissing">Enter your email address.</Field.Error>
        <Field.Error match="typeMismatch">Enter an email like tendai@example.com.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Get the word of the day
      </Button>
    </form>
  )
}

export { Example }
