import { Alert, TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="max-w-lg flex w-full flex-col gap-3">
      <Alert title="Only reviewers can publish entries" />
      <Alert
        description={
          <>
            Dialect preferences now live in your profile settings.{" "}
            <TextLink href="#">Learn more</TextLink>
          </>
        }
      />
    </div>
  )
}

export { Example }
