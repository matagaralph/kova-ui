import { Markdown } from "@kova-ui/markdown"

const comment = `Thanks! <img src=x onerror="alert(1)"> See [this link](javascript:alert(1)).

![diagram](https://example.com/diagram.png)`

function Example() {
  return (
    <Markdown skipHtml disallowedElements={["img"]}>
      {comment}
    </Markdown>
  )
}

export { Example }
