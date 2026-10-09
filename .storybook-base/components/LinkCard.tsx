import { linkTo } from "@storybook/addon-links"
import { type MouseEvent, type ReactNode } from "react"
import { LayerCard } from "../../src/components/LayerCard/index.js"

export const LinkCard = ({
  icon,
  title,
  subtitle,
  to,
  story,
  docsId,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  to: string
  story?: string
  docsId: string
}) => {
  const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    if (evt.button !== 0 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
      return
    }
    evt.preventDefault()
    linkTo(to, story)()
  }

  return (
    <LayerCard
      className="flex-1 cursor-pointer no-underline"
      render={<a href={`./?path=/docs/${docsId}`} target="_top" onClick={handleClick} />}
    >
      <LayerCard.Secondary>
        {icon}
        {title}
      </LayerCard.Secondary>
      <LayerCard.Primary>
        <p className="m-0 text-sm text-secondary">{subtitle}</p>
      </LayerCard.Primary>
    </LayerCard>
  )
}
