import { Reload, Warning, WarningAlt } from "@kova-ui/icons"
import { Button, EmptyState } from "kova-ui/components"

function Example() {
  return (
    <div className="sm:grid-cols-2 grid w-full gap-10">
      <EmptyState>
        <EmptyState.Icon color="danger">
          <Warning />
        </EmptyState.Icon>
        <EmptyState.Title color="danger">Couldn't load recordings</EmptyState.Title>
        <EmptyState.Description>Check your connection, then try again.</EmptyState.Description>
        <EmptyState.ActionRow>
          <Button variant="secondary">
            <Reload />
            Try again
          </Button>
        </EmptyState.ActionRow>
      </EmptyState>
      <EmptyState>
        <EmptyState.Icon color="warning">
          <WarningAlt />
        </EmptyState.Icon>
        <EmptyState.Title>You're offline</EmptyState.Title>
        <EmptyState.Description>
          Your bookmarked words still work. New entries load when you're back online.
        </EmptyState.Description>
      </EmptyState>
    </div>
  )
}

export { Example }
