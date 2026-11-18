import { ArrowUpRight, Beta, Warning } from "@kova-ui/icons"
import { Blankslate, TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="sm:grid-cols-2 grid w-full gap-10">
      <Blankslate>
        <Blankslate.Icon color="danger">
          <Warning />
        </Blankslate.Icon>
        <Blankslate.Title color="danger">Couldn't load your projects</Blankslate.Title>
        <Blankslate.Description>
          Check your connection, then reload the page.
        </Blankslate.Description>
      </Blankslate>
      <Blankslate>
        <Blankslate.Icon color="warning">
          <Beta />
        </Blankslate.Icon>
        <Blankslate.Title>Reports are in beta</Blankslate.Title>
        <Blankslate.Description>Exports may take a few minutes.</Blankslate.Description>
        <Blankslate.ActionRow className="text-sm">
          <TextLink href="#">
            Learn more
            <ArrowUpRight />
          </TextLink>
        </Blankslate.ActionRow>
      </Blankslate>
    </div>
  )
}

export { Example }
