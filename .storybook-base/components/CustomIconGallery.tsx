import * as Icons from "@kova-ui/icons"
import { IconGallery, IconItem, Unstyled } from "@storybook/addon-docs/blocks"
import { useMemo, useState } from "react"
import { Blankslate } from "../../packages/ui/src/components/Blankslate/index.js"
import s from "./CustomIconGallery.module.css"

export const CustomIconGallery = () => {
  const [search, setSearch] = useState<string>("")
  const iconList = useMemo(
    () =>
      Object.entries(Icons).filter(([name]) =>
        name.toLowerCase().includes(search.toLocaleLowerCase().trim()),
      ),
    [search],
  )

  return (
    <Unstyled>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Icons.Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      {iconList.length === 0 ? (
        <Blankslate className={s.Blankslate} fill="none">
          <Blankslate.Icon size="sm">
            <Icons.Search />
          </Blankslate.Icon>
          <Blankslate.Description>
            No icons found matching <span className={s.SearchTerm}>"{search}"</span>
          </Blankslate.Description>
        </Blankslate>
      ) : (
        <IconGallery>
          {iconList.map(([name, Icon]) => (
            <IconItem key={name} name={name}>
              <Icon />
            </IconItem>
          ))}
        </IconGallery>
      )}
    </Unstyled>
  )
}
