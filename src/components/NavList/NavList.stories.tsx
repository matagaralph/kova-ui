import { type Meta } from "@storybook/react-vite"
import { forwardRef, type ReactElement, type ReactNode, cloneElement, isValidElement } from "react"
import {
  Analytics,
  ArrowLeft,
  ArrowRight,
  Bell,
  Book,
  CreditCard,
  Document,
  Folder,
  Home,
  Invoice,
  Key,
  Lock,
  Settings,
  Star,
  Users,
} from "../Icon/index.js"
import { NavList, type NavListGroupExpandItem, type NavListProps } from "./index.js"

const meta = {
  title: "Components/NavList",
  component: NavList,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof NavList>

export default meta

const Sidebar = ({ children }: { children: ReactNode }) => (
  <div className="w-64 max-w-full">{children}</div>
)

export const Base = (args: Partial<NavListProps>) => (
  <Sidebar>
    <NavList aria-label="Workspace" {...args}>
      <NavList.Item href="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Item href="#">Projects</NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithLeadingVisuals = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        <NavList.LeadingVisual>
          <Home />
        </NavList.LeadingVisual>
        Overview
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Folder />
        </NavList.LeadingVisual>
        Projects
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Users />
        </NavList.LeadingVisual>
        Members
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Settings />
        </NavList.LeadingVisual>
        Settings
      </NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithTrailingVisuals = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        <NavList.LeadingVisual>
          <Folder />
        </NavList.LeadingVisual>
        Projects
        <NavList.TrailingVisual>24</NavList.TrailingVisual>
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Bell />
        </NavList.LeadingVisual>
        Notifications
        <NavList.TrailingVisual>8</NavList.TrailingVisual>
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Users />
        </NavList.LeadingVisual>
        Members
        <NavList.TrailingVisual>132</NavList.TrailingVisual>
      </NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithSubItems = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#">Overview</NavList.Item>
      <NavList.Item>
        Projects
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Active
          </NavList.Item>
          <NavList.Item href="#">Archived</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithNestedSubItems = () => (
  <Sidebar>
    <NavList aria-label="Documentation">
      <NavList.Item defaultOpen href="#">
        Getting started
        <NavList.SubNav>
          <NavList.Item href="#">Installation</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">
        Guides
        <NavList.SubNav>
          <NavList.Item href="#">
            Theming
            <NavList.SubNav>
              <NavList.Item href="#">Colors</NavList.Item>
              <NavList.Item href="#" aria-current="page">
                Dark mode
              </NavList.Item>
            </NavList.SubNav>
          </NavList.Item>
          <NavList.Item href="#">Accessibility</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Changelog</NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithGroup = () => (
  <Sidebar>
    <NavList aria-label="Settings">
      <NavList.Group title="Account">
        <NavList.Item href="#" aria-current="page">
          Profile
        </NavList.Item>
        <NavList.Item href="#">Notifications</NavList.Item>
        <NavList.Item href="#">Appearance</NavList.Item>
      </NavList.Group>
      <NavList.Group title="Workspace">
        <NavList.Item href="#">General</NavList.Item>
        <NavList.Item href="#">Members</NavList.Item>
        <NavList.Item href="#">Billing</NavList.Item>
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithGroupHeadingLinks = () => (
  <Sidebar>
    <NavList aria-label="Settings">
      <NavList.Group>
        <NavList.GroupHeading>
          <a href="#account">Account</a>
        </NavList.GroupHeading>
        <NavList.Item href="#" aria-current="page">
          Profile
        </NavList.Item>
        <NavList.Item href="#">Notifications</NavList.Item>
      </NavList.Group>
      <NavList.Group>
        <NavList.GroupHeading>
          <a href="#workspace">Workspace</a>
        </NavList.GroupHeading>
        <NavList.Item href="#">General</NavList.Item>
        <NavList.Item href="#">Members</NavList.Item>
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithHeading = () => (
  <Sidebar>
    <NavList>
      <NavList.Heading>Settings</NavList.Heading>
      <NavList.Group title="Account">
        <NavList.Item href="#" aria-current="page">
          Profile
        </NavList.Item>
        <NavList.Item href="#">Appearance</NavList.Item>
      </NavList.Group>
      <NavList.Group title="Security">
        <NavList.Item href="#">Password and authentication</NavList.Item>
        <NavList.Item href="#">Sessions</NavList.Item>
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithVisuallyHiddenHeading = () => (
  <Sidebar>
    <NavList>
      <NavList.Heading visuallyHidden>Settings</NavList.Heading>
      <NavList.Group title="Account" hideDivider>
        <NavList.Item href="#" aria-current="page">
          Profile
        </NavList.Item>
        <NavList.Item href="#">Appearance</NavList.Item>
      </NavList.Group>
      <NavList.Group title="Security">
        <NavList.Item href="#">Password and authentication</NavList.Item>
        <NavList.Item href="#">Sessions</NavList.Item>
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithoutDivider = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Group hideDivider>
        <NavList.Item defaultOpen href="#">
          Projects
          <NavList.SubNav>
            <NavList.Item href="#">Active</NavList.Item>
            <NavList.Item href="#">Archived</NavList.Item>
          </NavList.SubNav>
        </NavList.Item>
        <NavList.Item href="#">Members</NavList.Item>
      </NavList.Group>
      <NavList.Group>
        <NavList.Item href="#">Settings</NavList.Item>
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithDescription = () => (
  <Sidebar>
    <NavList aria-label="Resources">
      <NavList.Item href="#" aria-current="page">
        <NavList.LeadingVisual>
          <Folder />
        </NavList.LeadingVisual>
        Projects
        <NavList.Description>12 active</NavList.Description>
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Book />
        </NavList.LeadingVisual>
        Documentation
        <NavList.Description variant="block">
          Guides, API references, and examples
        </NavList.Description>
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Analytics />
        </NavList.LeadingVisual>
        Reports
        <NavList.Description variant="block">
          Usage, revenue, and retention across every workspace you manage.
        </NavList.Description>
      </NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithInactiveItems = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" inactiveText="Unavailable during maintenance">
        Reports
      </NavList.Item>
      <NavList.Item>
        Billing
        <NavList.SubNav>
          <NavList.Item href="#" aria-current="page">
            Plans
          </NavList.Item>
          <NavList.Item href="#" inactiveText="Unavailable during maintenance">
            Invoices
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithTooltips = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page" tooltipText="Summary of your workspace">
        Overview
      </NavList.Item>
      <NavList.Item href="#" tooltipText="Everything your team is working on">
        Projects
      </NavList.Item>
    </NavList>
  </Sidebar>
)

export const WithTrailingAction = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        <NavList.LeadingVisual>
          <Folder />
        </NavList.LeadingVisual>
        Projects
        <NavList.TrailingAction label="Collapse sidebar" icon={ArrowLeft} />
      </NavList.Item>
      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <Star />
        </NavList.LeadingVisual>
        Favorites
        <NavList.TrailingAction as="a" href="#" label="Open favorites" icon={ArrowRight} />
      </NavList.Item>
      <NavList.Item>
        <NavList.LeadingVisual>
          <Document />
        </NavList.LeadingVisual>
        Documents
        <NavList.SubNav>
          <NavList.Item href="#">
            Drafts
            <NavList.TrailingAction label="View drafts" icon={Book} />
          </NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
    </NavList>
  </Sidebar>
)

const moreItems: NavListGroupExpandItem[] = [
  { href: "#", text: "Reports" },
  { href: "#", text: "Integrations" },
  { href: "#", text: "Audit log" },
  { href: "#", text: "Webhooks" },
  { href: "#", text: "Exports" },
  { href: "#", text: "Labs" },
]

export const WithExpand = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Item href="#">Projects</NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
      <NavList.GroupExpand label="Show more" items={moreItems} />
    </NavList>
  </Sidebar>
)

export const ExpandWithPages = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item href="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Item href="#">Projects</NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
      <NavList.GroupExpand pages={2} label="Show more" items={moreItems} />
    </NavList>
  </Sidebar>
)

export const ExpandWithCustomItems = () => {
  const items: NavListGroupExpandItem[] = [
    { href: "#", text: "Billing", leadingVisual: CreditCard, trailingVisual: "3" },
    { href: "#", text: "Invoices", leadingVisual: Invoice, trailingVisual: "24" },
    { href: "#", text: "API keys", leadingVisual: Key, trailingVisual: "5" },
    { href: "#", text: "Security", leadingVisual: Lock, trailingVisual: ArrowRight },
  ]

  return (
    <Sidebar>
      <NavList aria-label="Workspace">
        <NavList.Group>
          <NavList.Item href="#" aria-current="page">
            <NavList.LeadingVisual>
              <Home />
            </NavList.LeadingVisual>
            Overview
          </NavList.Item>
          <NavList.Item href="#">
            <NavList.LeadingVisual>
              <Folder />
            </NavList.LeadingVisual>
            Projects
            <NavList.TrailingVisual>24</NavList.TrailingVisual>
          </NavList.Item>
          <NavList.GroupExpand
            items={items}
            renderItem={({
              text,
              leadingVisual: LeadingIcon,
              trailingVisual: TrailingIcon,
              ...rest
            }) => (
              <NavList.Item {...rest}>
                {LeadingIcon && (
                  <NavList.LeadingVisual>
                    <LeadingIcon />
                  </NavList.LeadingVisual>
                )}
                {text}
                {TrailingIcon && (
                  <NavList.TrailingVisual>
                    {typeof TrailingIcon === "string" ? TrailingIcon : <TrailingIcon />}
                  </NavList.TrailingVisual>
                )}
              </NavList.Item>
            )}
          />
        </NavList.Group>
      </NavList>
    </Sidebar>
  )
}

export const WithGroupExpand = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Group title="Projects">
        <NavList.Item href="#" aria-current="page">
          Website redesign
        </NavList.Item>
        <NavList.Item href="#">Mobile app</NavList.Item>
        <NavList.GroupExpand
          label="More projects"
          items={[
            { href: "#", text: "Design system" },
            { href: "#", text: "Analytics", trailingAction: { label: "Open", icon: ArrowRight } },
          ]}
        />
      </NavList.Group>
      <NavList.Group title="Teams">
        <NavList.Item href="#">Design</NavList.Item>
        <NavList.Item href="#">Engineering</NavList.Item>
        <NavList.GroupExpand
          label="More teams"
          items={[
            { href: "#", text: "Marketing", trailingVisual: Star },
            { href: "#", text: "Support", trailingVisual: Users },
          ]}
        />
      </NavList.Group>
    </NavList>
  </Sidebar>
)

export const WithoutItemGap = () => (
  <Sidebar>
    <NavList aria-label="Workspace" disableItemGap>
      <NavList.Item href="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Item defaultOpen href="#">
        Projects
        <NavList.SubNav>
          <NavList.Item href="#">Active</NavList.Item>
          <NavList.Item href="#">Archived</NavList.Item>
        </NavList.SubNav>
      </NavList.Item>
      <NavList.Item href="#">Members</NavList.Item>
    </NavList>
  </Sidebar>
)

type RouterLinkProps = { to: string; children: ReactNode; className?: string }

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...props }, ref) => (
  <a ref={ref} href={to} {...props} />
))

export const WithRouterLink = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NavList.Item as={RouterLink} to="#" aria-current="page">
        Overview
      </NavList.Item>
      <NavList.Item as={RouterLink} to="#">
        Projects
      </NavList.Item>
      <NavList.Item as={RouterLink} to="#">
        Members
      </NavList.Item>
    </NavList>
  </Sidebar>
)

const NextLikeLink = ({ href, children }: { href: string; children: ReactElement }) =>
  isValidElement(children)
    ? cloneElement(children as ReactElement<{ href?: string }>, { href })
    : null

export const WithNextJsLink = () => (
  <Sidebar>
    <NavList aria-label="Workspace">
      <NextLikeLink href="#">
        <NavList.Item aria-current="page">Overview</NavList.Item>
      </NextLikeLink>
      <NextLikeLink href="#">
        <NavList.Item>Projects</NavList.Item>
      </NextLikeLink>
    </NavList>
  </Sidebar>
)
