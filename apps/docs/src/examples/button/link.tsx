import { ButtonLink } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ButtonLink href="#installation">Get started</ButtonLink>
      <ButtonLink href="https://github.com" color="secondary" variant="outline">
        GitHub
      </ButtonLink>
      <ButtonLink href="#changelog" color="secondary" variant="ghost" disabled>
        Changelog
      </ButtonLink>
    </div>
  )
}

export { Example }
