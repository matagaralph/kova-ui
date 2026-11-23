import { ChevronDown } from "@kova-ui/icons"
import { AnimateLayout } from "kova-ui/components"
import { useState } from "react"

const questions = [
  {
    id: "review",
    question: "Who reviews new words?",
    answer: "Reviewers who speak the word's dialect check each entry before it's published.",
  },
  {
    id: "record",
    question: "Can I record my own dialect?",
    answer: "Yes. Recordings in Zezuru, Karanga, Korekore, Manyika and Ndau are all welcome.",
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
