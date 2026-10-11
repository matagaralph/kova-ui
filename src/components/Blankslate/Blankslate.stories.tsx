import { Button } from "../Button/index.js"
import { ArrowUpRight, Beta, Explore, Mic, Plus, Search } from "../Icon/index.js"
import { TextLink } from "../TextLink/index.js"
import { Blankslate } from "./Blankslate.js"

export default {
  title: "Components/Blankslate",
}

export const Base = () => (
  <Blankslate>
    <Blankslate.Icon>
      <Explore />
    </Blankslate.Icon>
    <Blankslate.Title>Your evaluations will appear here</Blankslate.Title>
    <Blankslate.Description>
      Create an evaluation to assess your model's responses
    </Blankslate.Description>
    <Blankslate.ActionRow>
      <Button color="primary" onClick={() => {}} size="lg">
        <Plus className="mr-[-2px]" />
        Create
      </Button>
    </Blankslate.ActionRow>
  </Blankslate>
)

export const Error = () => (
  <Blankslate>
    <Blankslate.Icon color="danger">
      <Mic />
    </Blankslate.Icon>
    <Blankslate.Title color="danger">
      Enable microphone access in your browser's settings.
    </Blankslate.Title>
  </Blankslate>
)

export const Warning = () => (
  <Blankslate>
    <Blankslate.Icon color="warning">
      <Beta />
    </Blankslate.Icon>
    <Blankslate.Title>o1-preview is in beta</Blankslate.Title>
    <Blankslate.Description>
      System instructions and model configuration are not available yet. Responses may take longer.
    </Blankslate.Description>
    <Blankslate.ActionRow className="text-sm">
      <TextLink href="/">
        Learn more
        <ArrowUpRight />
      </TextLink>
    </Blankslate.ActionRow>
  </Blankslate>
)

export const Empty = () => (
  <Blankslate fill="none">
    <Blankslate.Icon size="sm">
      <Search />
    </Blankslate.Icon>
    <Blankslate.Description>
      No icons found matching <span className="font-semibold">"pizza"</span>
    </Blankslate.Description>
  </Blankslate>
)
