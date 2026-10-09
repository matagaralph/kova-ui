import clsx from "clsx"
import { Fragment, type ReactNode, useState } from "react"

import { Button } from "../Button/index.js"
import { ArrowUp, Wave } from "../Icon/index.js"
import { TextLink } from "../TextLink/index.js"
import { AnimateLayout } from "../Transition/index.js"

import type { Meta } from "@storybook/react"

const meta = {
  title: "Transitions/AnimateLayout",
  component: AnimateLayout,
} satisfies Meta<typeof AnimateLayout>

export default meta

export const SimpleHeight = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="m-auto w-[450px]">
      <div className="mx-auto mb-6 w-[100px]">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <Secondary className="h-12 w-full" />
      <AnimateLayout transitionClassName="pt-4">
        {show && <Primary key="box" className="h-[80px] w-full" />}
      </AnimateLayout>
      <Secondary className="mt-4 h-12 w-full" />
    </div>
  )
}

export const SimpleWidth = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="mx-auto mb-6 w-[100px]">
        <Button block color="primary" variant="outline" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <div className="flex">
        <Secondary className="h-[200px] w-[200px]" />
        <AnimateLayout
          dimension="width"
          transitionClassName="pl-6"
          enter={{ delay: 200 }}
          layoutExit={{ delay: 75 }}
        >
          {show && <Primary key="box" className="h-[200px] w-[200px]" />}
        </AnimateLayout>
        <Secondary className="ml-6 h-[1200px00px] w-[200px]" />
      </div>
    </div>
  )
}

export const Accordion = () => {
  return (
    <div className="m-auto max-w-[500px]">
      <AccordionItem header="Which plan should I choose?">
        <p>
          We recommend the Starter plan for small teams and early projects. It covers everyday needs
          with generous limits, while the Growth plan adds priority support and higher quotas for
          busier workloads. Our Scale plan is ideal for complex, multi-team projects that need
          dedicated infrastructure and custom integrations. We recommend comparing all of these
          plans on the{" "}
          <TextLink underline color="secondary" href="#">
            Pricing page
          </TextLink>{" "}
          to find the best balance of features and cost for your usage.
        </p>
      </AccordionItem>
      <AccordionItem header="Do you offer an enterprise package or SLAs?">
        <p>
          We offer different tiers of access to our enterprise customers that include SLAs, lower
          latency, and more. Please{" "}
          <TextLink underline color="secondary" href="#">
            contact our sales team
          </TextLink>{" "}
          to learn more.
        </p>
      </AccordionItem>
      <AccordionItem header="Will I be charged for API usage in the Playground?">
        <p>
          Yes, we treat Playground usage the same as regular API usage. You will be billed at the
          per-token input and output prices mentioned above.
        </p>
      </AccordionItem>
      <AccordionItem header="How will I know how many tokens I've used each month?">
        <p>
          A token is a mathematical representation of natural language. Log in to your account to
          view your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          . This dashboard will show you how many tokens you've used during the current and past
          billing cycles.
        </p>
      </AccordionItem>
      <AccordionItem header="How can I manage my spending on the API platform?">
        <p>
          You can set a monthly budget in{" "}
          <TextLink underline color="secondary" href="#">
            your billing settings
          </TextLink>
          , after which we'll stop serving your requests. There may be a delay in enforcing the
          limit, and you are responsible for any overage incurred. You can also configure an email
          notification threshold to receive an email alert once you cross that threshold each month.
          We recommend checking your{" "}
          <TextLink underline color="secondary" href="#">
            usage tracking dashboard
          </TextLink>{" "}
          regularly to monitor your spend.
        </p>
        <p className="mt-3">
          For customers managing work with Projects, you can set and manage billing restrictions per
          project in the Dashboard.
        </p>
      </AccordionItem>
    </div>
  )
}

const AccordionItem = ({ header, children }: { header: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="overflow-hidden border-0 border-b border-solid border-gray-150 hover:border-gray-350"
      style={{ transition: "border-color .15s ease" }}
      data-state={open ? "open" : "closed"}
    >
      <div
        className="flex cursor-pointer items-center justify-between pt-4 pb-3 select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="font-[500]">{header}</div>
        <div className="story-example-plus" />
      </div>
      <AnimateLayout
        initial={{ blur: 0 }}
        enter={{ y: 0, delay: 150, duration: 450 }}
        exit={{ y: -8, blur: 2 }}
        layoutEnter={{ duration: 350 }}
        layoutExit={{ duration: 300 }}
      >
        {open && (
          <div key="content" className="pb-4 text-[15px] leading-[1.6] text-secondary">
            {children}
          </div>
        )}
      </AnimateLayout>
      <div className="mt-1" />
    </div>
  )
}

export const Controls = () => {
  return <div>Realtime playground controls, toggle to reveal more</div>
}

export const Form = () => {
  return <div>Form stuff here, submit button shows error fields</div>
}

export const TalkButton = () => {
  const [recording, setRecording] = useState(false)
  const [sending, setSending] = useState(false)

  const handleClick = () => {
    if (!recording) {
      setRecording(true)
      return
    }

    setSending(true)

    window.setTimeout(() => {
      setSending(false)
      setRecording(false)
    }, 800)
  }

  return (
    <Button
      color={recording ? "danger" : "primary"}
      size="xl"
      iconSize="lg"
      onClick={handleClick}
      loading={sending}
    >
      <AnimateLayout dimension="width" transitionClassName="h-full flex items-center gap-2">
        {recording ? (
          <ArrowUp key="recording" />
        ) : (
          <Fragment key="record">
            <Wave /> Talk
          </Fragment>
        )}
      </AnimateLayout>
    </Button>
  )
}

export const Secondary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-secondary rounded-lg", className)} {...restProps} />
)

export const Primary = ({ className, ...restProps }: { className?: string }) => (
  <div className={clsx("story-example-primary rounded-lg shadow-xl", className)} {...restProps} />
)
