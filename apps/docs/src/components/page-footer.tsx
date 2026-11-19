import Link from "fumadocs-core/link"
import { findNeighbour, type Root } from "fumadocs-core/page-tree"

export function PageFooter({ tree, url }: { tree: Root; url: string }) {
  const { previous, next } = findNeighbour(tree, url)
  if (!previous && !next) return null

  return (
    <nav aria-label="Pages" className="docs-page-footer">
      {previous && (
        <Link href={previous.url} rel="prev" className="docs-page-footer-link">
          <span>Previous</span>
          {previous.name}
        </Link>
      )}
      {next && (
        <Link href={next.url} rel="next" className="docs-page-footer-link" data-next="">
          <span>Next</span>
          {next.name}
        </Link>
      )}
    </nav>
  )
}
