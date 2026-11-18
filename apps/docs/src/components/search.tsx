import { useStaticSearch } from "fumadocs-core/search/client"
import {
  SearchDialog as Dialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search"

import { withBase } from "../lib/shared.js"

/** Searches an index built at build time, so search works on a static host */
export function SearchDialog(props: SharedProps) {
  const search = useStaticSearch({ from: withBase("/search.json") })

  return (
    <Dialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </Dialog>
  )
}
