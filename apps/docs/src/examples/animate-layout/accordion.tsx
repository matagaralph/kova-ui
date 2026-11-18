import { ChevronDown } from "@kova-ui/icons"
import { AnimateLayout } from "kova-ui/components"
import { useState } from "react"

const questions = [
  {
    id: "billing",
    question: "When am I billed?",
    answer: "On the first day of each month, for the seats you had the month before.",
  },
  {
    id: "seats",
    question: "Can I remove seats?",
    answer: "Yes. Removed seats stop counting from the next billing period.",
  },
]

function Example() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="w-96 divide-y divide-(--color-border)">
      {questions.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-sm font-medium"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.question}
              <ChevronDown className={open ? "rotate-180" : undefined} />
            </button>
            <AnimateLayout
              enter={{ y: 0, delay: 150, duration: 450 }}
              exit={{ y: -8 }}
              layoutEnter={{ duration: 400 }}
            >
              {open && (
                <p key="answer" className="pb-3 text-sm text-secondary">
                  {item.answer}
                </p>
              )}
            </AnimateLayout>
          </div>
        )
      })}
    </div>
  )
}

export { Example }
