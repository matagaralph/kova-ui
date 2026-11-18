import { Folder, Plus } from "@kova-ui/icons"
import { Blankslate, Button } from "kova-ui/components"

function Example() {
  return (
    <Blankslate>
      <Blankslate.Icon>
        <Folder />
      </Blankslate.Icon>
      <Blankslate.Title>No projects yet</Blankslate.Title>
      <Blankslate.Description>Create a project to start inviting your team.</Blankslate.Description>
      <Blankslate.ActionRow>
        <Button color="primary" size="lg">
          <Plus />
          New project
        </Button>
      </Blankslate.ActionRow>
    </Blankslate>
  )
}

export { Example }
