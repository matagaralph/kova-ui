// Ported from Primer React's FormControl tests.

import { render } from "@testing-library/react"
import { describe, expect, it, test, vi } from "vite-plus/test"
import { Checkbox } from "../Checkbox/index.js"
import { Star } from "../Icon/index.js"
import { Input } from "../Input/index.js"
import { Select } from "../Select/index.js"
import { Switch } from "../Switch/index.js"
import { TagInput } from "../TagInput/index.js"
import { Textarea } from "../Textarea/index.js"
import classes from "./FormControl.module.css"
import { FormControl, useFormControlForwardedProps } from "./index.js"

const LABEL_TEXT = "Form control"
const CAPTION_TEXT = "Hint text"
const ERROR_TEXT = "This field is invalid"

const SELECT_OPTIONS = [
  { value: "one", label: "Choice one" },
  { value: "two", label: "Choice two" },
  { value: "three", label: "Choice three" },
]

const WrappedLabelComponent = () => (
  <div>
    <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
  </div>
)

WrappedLabelComponent.__SLOT__ = FormControl.Label.__SLOT__

const WrappedCaptionComponent = () => (
  <div>
    <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
  </div>
)

WrappedCaptionComponent.__SLOT__ = FormControl.Caption.__SLOT__

const WrappedLeadingVisualComponent = () => (
  <div>
    <FormControl.LeadingVisual>
      <Star aria-label="Icon label" />
    </FormControl.LeadingVisual>
  </div>
)

WrappedLeadingVisualComponent.__SLOT__ = FormControl.LeadingVisual.__SLOT__

const WrappedValidationComponent = () => (
  <div>
    <FormControl.Validation variant="error">{ERROR_TEXT}</FormControl.Validation>
  </div>
)

WrappedValidationComponent.__SLOT__ = FormControl.Validation.__SLOT__

describe("FormControl", () => {
  it("renders the FormControl class and a custom className", () => {
    const { container } = render(
      <FormControl className="test-class">
        <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
        <Input />
      </FormControl>,
    )

    expect(container.firstElementChild).toHaveClass(classes.FormControl)
    expect(container.firstElementChild).toHaveClass("test-class")
    expect(container.firstElementChild).toHaveAttribute("data-layout", "vertical")
  })

  it("renders the horizontal layout", () => {
    const { container } = render(
      <FormControl layout="horizontal" className="test-class">
        <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
        <Input />
      </FormControl>,
    )

    expect(container.firstElementChild).toHaveClass(classes.FormControl)
    expect(container.firstElementChild).toHaveClass("test-class")
    expect(container.firstElementChild).toHaveAttribute("data-layout", "horizontal")
    expect(container.querySelectorAll("input")).toHaveLength(1)
  })

  it("renders the subcomponent classes and a custom className", () => {
    const { getByText } = render(
      <FormControl>
        <FormControl.Label className="label-class">{LABEL_TEXT}</FormControl.Label>
        <Input />
        <FormControl.Caption className="caption-class">{CAPTION_TEXT}</FormControl.Caption>
        <FormControl.Validation variant="error" className="validation-class">
          {ERROR_TEXT}
        </FormControl.Validation>
      </FormControl>,
    )

    expect(getByText(LABEL_TEXT)).toHaveClass(classes.Label, "label-class")
    expect(getByText(CAPTION_TEXT)).toHaveClass(classes.Caption, "caption-class")
    expect(getByText(ERROR_TEXT).parentElement).toHaveClass(classes.Validation, "validation-class")
  })

  it("renders data-component attributes (vertical, non-choice input)", () => {
    const { container, getByText } = render(
      <FormControl id="test-id">
        <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
        <Input />
        <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
        <FormControl.Validation variant="error">{ERROR_TEXT}</FormControl.Validation>
      </FormControl>,
    )

    expect(container.firstElementChild).toHaveAttribute("data-component", "FormControl")
    expect(getByText(LABEL_TEXT)).toHaveAttribute("data-component", "FormControl.Label")
    expect(getByText(CAPTION_TEXT)).toHaveAttribute("data-component", "FormControl.Caption")

    const validation = container.querySelector('[data-component="FormControl.Validation"]')
    expect(validation).toHaveTextContent(ERROR_TEXT)
  })

  it("renders data-component attributes (choice input)", () => {
    const { container, getByText } = render(
      <FormControl id="test-id-choice">
        <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
        <Checkbox />
        <FormControl.LeadingVisual>
          <Star aria-label="Icon label" />
        </FormControl.LeadingVisual>
      </FormControl>,
    )

    expect(container.firstElementChild).toHaveAttribute("data-component", "FormControl")
    expect(getByText(LABEL_TEXT)).toHaveAttribute("data-component", "FormControl.Label")

    const leadingVisual = container.querySelector('[data-component="FormControl.LeadingVisual"]')
    expect(leadingVisual).not.toBeNull()
  })

  describe("vertically stacked layout (default)", () => {
    describe("rendering", () => {
      it("renders with a hidden label", () => {
        const { getByLabelText, getByText } = render(
          <FormControl>
            <FormControl.Label visuallyHidden>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)
        const label = getByText(LABEL_TEXT)

        expect(input).toBeDefined()
        expect(label).toHaveAttribute("data-visually-hidden")
      })

      it("renders with a custom ID", () => {
        const { getByLabelText } = render(
          <FormControl id="customId">
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)

        expect(input.getAttribute("id")).toBe("customId")
      })

      it("renders as disabled", () => {
        const { getByLabelText } = render(
          <FormControl disabled>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)

        expect(input.getAttribute("disabled")).not.toBeNull()
      })

      it("renders as required", () => {
        const { getByRole } = render(
          <FormControl required>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const input = getByRole("textbox")

        expect(input).toBeRequired()
      })

      it("renders the required indicator", () => {
        const { getByText } = render(
          <FormControl required>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        expect(getByText("*")).not.toHaveAttribute("aria-hidden")
      })

      it("hides the required indicator from the accessibility tree", () => {
        const { getByText } = render(
          <FormControl required>
            <FormControl.Label requiredIndicator={false}>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        expect(getByText("*")).toHaveAttribute("aria-hidden", "true")
      })

      it("renders custom required text", () => {
        const { getByText } = render(
          <FormControl>
            <FormControl.Label requiredText="(optional)">{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        expect(getByText("(optional)")).toBeDefined()
      })

      it("renders with a caption", () => {
        const { getByText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        const caption = getByText(CAPTION_TEXT)

        expect(caption).toBeDefined()
      })

      it("renders with a successful validation message", () => {
        const { getByText, container } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Validation variant="success">{ERROR_TEXT}</FormControl.Validation>
          </FormControl>,
        )

        const validationMessage = getByText(ERROR_TEXT)

        expect(validationMessage).toBeDefined()
        expect(container.querySelector("input")).not.toHaveAttribute("aria-invalid")
      })

      it("renders with an error validation message", () => {
        const { getByText, getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Validation variant="error">{ERROR_TEXT}</FormControl.Validation>
          </FormControl>,
        )

        const validationMessage = getByText(ERROR_TEXT)

        expect(validationMessage).toBeDefined()
        expect(getByLabelText(LABEL_TEXT)).toHaveAttribute("aria-invalid", "true")
      })

      it("renders with the input as a TagInput", () => {
        const { getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <TagInput
              defaultValue={[
                { value: "zero", valid: true },
                { value: "one", valid: true },
                { value: "two", valid: true },
              ]}
            />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)

        expect(input).toBeDefined()
      })

      it("renders with the input as a Select", () => {
        const { getByLabelText, getByText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Select options={SELECT_OPTIONS} value="one" onChange={() => {}} />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)
        const label = getByText(LABEL_TEXT)

        expect(input).toBeDefined()
        expect(label).toBeDefined()
      })

      it("renders with the input as a Textarea", () => {
        const { getByLabelText, getByText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Textarea />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)
        const label = getByText(LABEL_TEXT)

        expect(input).toBeDefined()
        expect(label).toBeDefined()
      })

      it("passes through props on the label element", () => {
        const { getByLabelText, getByText } = render(
          <FormControl>
            <FormControl.Label data-testid="some-test-id">{LABEL_TEXT}</FormControl.Label>
            <Textarea />
          </FormControl>,
        )

        const input = getByLabelText(LABEL_TEXT)
        const label = getByText(LABEL_TEXT)

        expect(input).toBeDefined()
        expect(label).toBeDefined()
        expect(label).toHaveAttribute("data-testid", "some-test-id")
      })

      it("renders the label as a span, without htmlFor", () => {
        const { getByText } = render(
          <FormControl id="span-label">
            <FormControl.Label as="span">{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const label = getByText(LABEL_TEXT)

        expect(label.tagName).toBe("SPAN")
        expect(label).toHaveAttribute("id", "span-label-label")
        expect(label).not.toHaveAttribute("for")
      })
    })

    describe("ARIA attributes", () => {
      it("associates the label with the input", () => {
        const { getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
          </FormControl>,
        )

        const inputNode = getByLabelText(LABEL_TEXT)
        expect(inputNode).toBeDefined()
      })

      it("associates caption text with the input", () => {
        const fieldId = "captionedInput"
        const { getByLabelText, getByText } = render(
          <FormControl id={fieldId}>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        const inputNode = getByLabelText(LABEL_TEXT)
        const captionNode = getByText(CAPTION_TEXT)

        expect(captionNode.getAttribute("id")).toBe(`${fieldId}-caption`)
        expect(inputNode.getAttribute("aria-describedby")).toBe(`${fieldId}-caption`)
      })

      it("associates validation text with the input", () => {
        const fieldId = "validatedInput"
        const { getByLabelText, getByText } = render(
          <FormControl id={fieldId}>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Validation variant="error">{ERROR_TEXT}</FormControl.Validation>
          </FormControl>,
        )

        const inputNode = getByLabelText(LABEL_TEXT)
        const validationNode = getByText(ERROR_TEXT)

        expect(validationNode.getAttribute("id")).toBe(`${fieldId}-validationMessage`)
        expect(inputNode.getAttribute("aria-describedby")).toBe(`${fieldId}-validationMessage`)
      })

      it("uses custom caption and validation ids in aria-describedby", () => {
        const { getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Validation id="custom-validation" variant="error">
              {ERROR_TEXT}
            </FormControl.Validation>
            <FormControl.Caption id="custom-caption">{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(getByLabelText(LABEL_TEXT)).toHaveAttribute(
          "aria-describedby",
          "custom-validation custom-caption",
        )
      })

      it("associates caption and validation text with a Select", () => {
        const fieldId = "describedSelect"
        const { container } = render(
          <FormControl id={fieldId}>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Select options={SELECT_OPTIONS} value="one" onChange={() => {}} />
            <FormControl.Validation variant="error">{ERROR_TEXT}</FormControl.Validation>
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        const trigger = container.querySelector('[id^="select-trigger-"]')
        expect(trigger).toHaveAttribute(
          "aria-describedby",
          `${fieldId}-validationMessage ${fieldId}-caption`,
        )
      })

      it("associates caption text with a TagInput", () => {
        const fieldId = "describedTags"
        const { getByLabelText } = render(
          <FormControl id={fieldId}>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <TagInput />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(getByLabelText(LABEL_TEXT)).toHaveAttribute("aria-describedby", `${fieldId}-caption`)
      })

      it("renders validation messages as text only", () => {
        const { container } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <FormControl.Validation variant="success">Looks good</FormControl.Validation>
          </FormControl>,
        )

        const validation = container.querySelector('[data-component="FormControl.Validation"]')
        expect(validation?.querySelector("svg")).toBeNull()
      })

      it("keeps aria-describedby passed directly to the input", () => {
        const fieldId = "describedInput"
        const { getByLabelText } = render(
          <FormControl id={fieldId}>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input aria-describedby="external-hint" />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(getByLabelText(LABEL_TEXT)).toHaveAttribute(
          "aria-describedby",
          `external-hint ${fieldId}-caption`,
        )
      })
    })

    describe("warnings", () => {
      it("should log an error if a user does not pass a label", () => {
        const spy = vi.spyOn(console, "error").mockImplementationOnce(() => {})

        render(
          <FormControl>
            <Input />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
      })

      it("should warn users if they try to render a leading visual when using a vertical layout", async () => {
        const spy = vi.spyOn(console, "warn").mockImplementationOnce(() => {})

        render(
          <FormControl>
            <FormControl.LeadingVisual>
              <Star />
            </FormControl.LeadingVisual>
            <FormControl.Label>Name</FormControl.Label>
            <Input />
          </FormControl>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
      })

      it("should warn users if they pass an id directly to the input", async () => {
        const spy = vi.spyOn(console, "warn").mockImplementationOnce(() => {})

        render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input id="testId" />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
      })

      it("should warn users if they pass a `disabled` prop directly to the input", async () => {
        const spy = vi.spyOn(console, "warn").mockImplementationOnce(() => {})

        render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input disabled />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
      })

      it("should warn users if they pass a `required` prop directly to the input", async () => {
        const spy = vi.spyOn(console, "warn").mockImplementationOnce(() => {})

        render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input required />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(spy).toHaveBeenCalledTimes(1)
        spy.mockRestore()
      })
    })

    describe("slot identification", () => {
      it("should correctly identify a label wrapped in a div using __SLOT__ property", () => {
        const spy = vi.spyOn(console, "error").mockImplementationOnce(() => {})

        const { container, getByLabelText } = render(
          <FormControl>
            <WrappedLabelComponent />
            <Input />
          </FormControl>,
        )

        // The label is found as a slot because of the __SLOT__ property,
        // so the error about a missing FormControl.Label is not logged
        expect(spy).toHaveBeenCalledTimes(0)

        const input = getByLabelText(LABEL_TEXT)
        expect(input).toBeDefined()
        expect(container.textContent).toContain(LABEL_TEXT)

        spy.mockRestore()
      })

      it("should correctly identify a caption wrapped in a div using __SLOT__ property", () => {
        const { container } = render(
          <FormControl id="test-caption">
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <WrappedCaptionComponent />
          </FormControl>,
        )

        const input = container.querySelector("input")
        const ariaDescribedBy = input?.getAttribute("aria-describedby") || ""
        expect(ariaDescribedBy).toContain("test-caption-caption")

        expect(container.textContent).toContain(CAPTION_TEXT)
      })

      it("should correctly identify a validation wrapped in a div using __SLOT__ property", () => {
        const { container } = render(
          <FormControl id="test-validation">
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <WrappedValidationComponent />
          </FormControl>,
        )

        const input = container.querySelector("input")
        const ariaDescribedBy = input?.getAttribute("aria-describedby") || ""
        expect(ariaDescribedBy).toContain("test-validation-validationMessage")

        expect(container.textContent).toContain(ERROR_TEXT)
      })

      it("should correctly identify a leading visual wrapped in a div using __SLOT__ property for non-choice inputs", () => {
        const spy = vi.spyOn(console, "warn").mockImplementationOnce(() => {})

        const { container } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Input />
            <WrappedLeadingVisualComponent />
          </FormControl>,
        )

        // Leading visuals are only for choice inputs, so this warns
        expect(spy).toHaveBeenCalledTimes(1)

        expect(container.querySelector("svg")).toBeDefined()

        spy.mockRestore()
      })

      it("should correctly identify a leading visual wrapped in a div using __SLOT__ property for choice inputs", () => {
        const { container, getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Checkbox />
            <WrappedLeadingVisualComponent />
          </FormControl>,
        )

        const leadingVisualContainer = container.querySelector("[data-has-leading-visual]")
        expect(leadingVisualContainer).not.toBeNull()

        expect(getByLabelText("Icon label")).toBeDefined()
        expect(container.querySelector("svg")).toBeDefined()
      })
    })
  })

  describe("checkbox and switch layout", () => {
    describe("rendering", () => {
      it("renders with a LeadingVisual", () => {
        const { getByLabelText } = render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Checkbox />
            <FormControl.LeadingVisual>
              <Star aria-label="Icon label" />
            </FormControl.LeadingVisual>
          </FormControl>,
        )

        expect(getByLabelText("Icon label")).toBeDefined()
      })

      it("uses the horizontal layout and associates the label with the checkbox", () => {
        const { container, getByLabelText } = render(
          <FormControl>
            <Checkbox />
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
          </FormControl>,
        )

        expect(container.firstElementChild).toHaveAttribute("data-layout", "horizontal")
        expect(getByLabelText(LABEL_TEXT)).toHaveAttribute("role", "checkbox")
      })

      it("associates caption text with a switch", () => {
        const { getByRole } = render(
          <FormControl id="notifications">
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Switch />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(getByRole("switch", { name: LABEL_TEXT })).toHaveAttribute(
          "aria-describedby",
          "notifications-caption",
        )
      })

      it("disables the checkbox", () => {
        const { getByRole } = render(
          <FormControl disabled>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Checkbox />
          </FormControl>,
        )

        expect(getByRole("checkbox")).toBeDisabled()
      })
    })

    describe("warnings", () => {
      it("should warn users if they try to render a validation message when using a checkbox", async () => {
        const consoleSpy = vi.spyOn(globalThis.console, "warn").mockImplementation(() => {})
        render(
          <FormControl>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Checkbox />
            <FormControl.Validation variant="error">Some error</FormControl.Validation>
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
      })

      it("should allow required prop to individual checkbox", async () => {
        const { getByRole } = render(
          <FormControl required>
            <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
            <Checkbox />
            <FormControl.Caption>{CAPTION_TEXT}</FormControl.Caption>
          </FormControl>,
        )

        expect(getByRole("checkbox")).toBeRequired()
      })

      it("should allow required prop on one checkbox of a group", async () => {
        const { getByTestId } = render(
          <fieldset>
            <legend>Checkboxes</legend>
            <FormControl required>
              <Checkbox value="checkOne" data-testid="checkbox-1" />
              <FormControl.Label>Checkbox one</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="checkTwo" data-testid="checkbox-2" />
              <FormControl.Label>Checkbox two</FormControl.Label>
            </FormControl>
            <FormControl>
              <Checkbox value="checkThree" />
              <FormControl.Label>Checkbox three</FormControl.Label>
            </FormControl>
          </fieldset>,
        )

        expect(getByTestId("checkbox-1")).toBeRequired()
        expect(getByTestId("checkbox-2")).not.toBeRequired()
      })
    })
  })
})

describe("FormControl.Validation", () => {
  it("renders the Validation class and the validation status", () => {
    const { container } = render(
      <FormControl>
        <FormControl.Label>{LABEL_TEXT}</FormControl.Label>
        <Input />
        <FormControl.Validation variant="success" className="test-class">
          Looks good
        </FormControl.Validation>
      </FormControl>,
    )

    const validation = container.querySelector('[data-component="FormControl.Validation"]')
    expect(validation).toHaveClass(classes.Validation, "test-class")
    expect(validation).toHaveAttribute("data-validation-status", "success")
  })
})

describe("useFormControlForwardedProps", () => {
  describe("when used outside FormControl", () => {
    test("returns empty object when no props object passed", () => {
      const calls: Array<ReturnType<typeof useFormControlForwardedProps>> = []

      function TestComponent() {
        const props = useFormControlForwardedProps({})
        calls.push(props)
        return null
      }

      render(<TestComponent />)

      expect(calls[0]).toEqual({})
    })

    test("returns passed props object instance when passed", () => {
      const props = { id: "test-id" }
      const calls: Array<ReturnType<typeof useFormControlForwardedProps>> = []

      function TestComponent() {
        calls.push(useFormControlForwardedProps(props))
        return null
      }

      render(<TestComponent />)

      expect(calls[0]).toBe(props)
    })
  })

  test("provides context value when no props object is passed", () => {
    const id = "test-id"
    const calls: Array<ReturnType<typeof useFormControlForwardedProps>> = []

    function TestComponent() {
      calls.push(useFormControlForwardedProps({}))
      return null
    }

    render(
      <FormControl id={id} disabled required>
        <FormControl.Label>Label</FormControl.Label>
        <TestComponent />
      </FormControl>,
    )

    expect(calls[0].disabled).toBe(true)
    expect(calls[0].id).toBe(id)
    expect(calls[0].required).toBe(true)
  })

  test("merges with props object, overriding to prioritize props when conflicting", () => {
    const props = { id: "override-id", xyz: "someValue" }
    const calls: Array<ReturnType<typeof useFormControlForwardedProps> & typeof props> = []

    function TestComponent() {
      calls.push(useFormControlForwardedProps(props))
      return null
    }

    render(
      <FormControl id="form-control-id" disabled>
        <FormControl.Label>Label</FormControl.Label>
        <TestComponent />
      </FormControl>,
    )

    expect(calls[0].disabled).toBe(true)
    expect(calls[0].id).toBe(props.id)
    expect(calls[0].required).toBeFalsy()
    expect(calls[0].xyz).toBe(props.xyz)
  })
})
