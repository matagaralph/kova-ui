import { Alert, TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-lg flex w-full flex-col gap-3">
      <Alert title="Your access level limits what you can view or change" />
      <Alert
        description={
          <>
            Single sign-on settings now live in each product's settings.{" "}
            <TextLink href="#">Learn more</TextLink>
          </>
        }
      />
    </div>
  )
}

export { Example }
