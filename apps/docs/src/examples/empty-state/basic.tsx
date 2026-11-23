import { BookBookmark } from "@kova-ui/icons"
import { Button, EmptyState } from "kova-ui/components"

function Example() {
  return (
    <EmptyState>
      <EmptyState.Icon>
        <BookBookmark />
      </EmptyState.Icon>
      <EmptyState.Title>No bookmarks yet</EmptyState.Title>
      <EmptyState.Description>
        Bookmark words, proverbs and stories to find them here again.
      </EmptyState.Description>
      <EmptyState.ActionRow>
        <Button>Browse the dictionary</Button>
      </EmptyState.ActionRow>
    </EmptyState>
  )
}

export { Example }
