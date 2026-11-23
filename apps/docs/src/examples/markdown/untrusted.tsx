import { Markdown } from "@kova-ui/markdown"

const comment = `Ndatenda for the recording! <img src=x onerror="alert(1)"> See [this link](javascript:alert(1)).

![ngoma](https://example.com/ngoma.png)`

function Example() {
  return (
    <Markdown skipHtml disallowedElements={["img"]}>
      {comment}
    </Markdown>
  )
}

export { Example }
