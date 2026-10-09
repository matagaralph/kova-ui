import { type Meta } from "@storybook/react-vite"
import { type ChangeEvent, type InputHTMLAttributes, useState } from "react"
import { Checkbox } from "../Checkbox/index.js"
import { Bell, Globe, Lock, Mail } from "../Icon/index.js"
import { Input } from "../Input/index.js"
import { Select } from "../Select/index.js"
import { Switch } from "../Switch/index.js"
import { type Tag, TagInput } from "../TagInput/index.js"
import { Textarea } from "../Textarea/index.js"
import { FormControl } from "./index.js"

const meta = {
  title: "Components/FormControl",
  component: FormControl,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: { control: false },
    className: { control: false },
    style: { control: false },
    ref: { control: false },
  },
} satisfies Meta<typeof FormControl>

export default meta

export const Base = () => (
  <div className="max-w-xs w-full">
    <FormControl>
      <FormControl.Label>Full name</FormControl.Label>
      <Input />
    </FormControl>
  </div>
)

const ROLE_OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "operations", label: "Operations" },
]

const DEFAULT_TAGS: Tag[] = [
  { value: "react", valid: true },
  { value: "typescript", valid: true },
  { value: "css", valid: true },
]

export const WithComplexInputs = () => {
  const [role, setRole] = useState("design")

  return (
    <div className="max-w-md grid w-full gap-6">
      <FormControl>
        <FormControl.Label>TagInput</FormControl.Label>
        <TagInput defaultValue={DEFAULT_TAGS} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Select</FormControl.Label>
        <Select options={ROLE_OPTIONS} value={role} onChange={(option) => setRole(option.value)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Textarea</FormControl.Label>
        <Textarea />
      </FormControl>
    </div>
  )
}

const CustomTextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="text"
    className="h-8 w-full rounded-md border border-default px-2.5 text-sm outline-none focus-visible:ring-2"
    {...props}
  />
)

const CustomCheckboxInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input type="checkbox" className="m-0 size-4 appearance-auto" {...props} />
)

const hasSpaces = (value: string) => /\s/g.test(value)

export const WithCustomInput = () => {
  const [value, setValue] = useState("amara osei")
  const invalid = hasSpaces(value)

  return (
    <div className="max-w-md grid w-full gap-6">
      <FormControl>
        <FormControl.Label htmlFor="custom-input">Username</FormControl.Label>
        <CustomTextInput
          id="custom-input"
          aria-describedby="custom-input-validation custom-input-caption"
          aria-invalid={invalid}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
        />
        {invalid && (
          <FormControl.Validation id="custom-input-validation" variant="error">
            Usernames cannot contain spaces
          </FormControl.Validation>
        )}
        {!invalid && value && (
          <FormControl.Validation id="custom-input-validation" variant="success">
            Valid username
          </FormControl.Validation>
        )}
        <FormControl.Caption id="custom-input-caption">
          With or without "@". For example "amara" or "@amara"
        </FormControl.Caption>
      </FormControl>

      <fieldset className="m-0 grid gap-3 border-0 p-0">
        <legend className="mb-3 p-0 text-sm font-medium">Checkboxes</legend>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-one"
            aria-describedby="custom-checkbox-one-caption"
            value="checkOne"
          />
          <FormControl.Label htmlFor="custom-checkbox-one">Checkbox one</FormControl.Label>
          <FormControl.Caption id="custom-checkbox-one-caption">
            Hint text for checkbox one
          </FormControl.Caption>
        </FormControl>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-two"
            aria-describedby="custom-checkbox-two-caption"
            value="checkTwo"
          />
          <FormControl.Label htmlFor="custom-checkbox-two">Checkbox two</FormControl.Label>
          <FormControl.Caption id="custom-checkbox-two-caption">
            Hint text for checkbox two
          </FormControl.Caption>
        </FormControl>
      </fieldset>
    </div>
  )
}

export const WithCheckboxAndSwitchInputs = () => (
  <div className="flex flex-wrap gap-12">
    <fieldset className="m-0 grid gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-sm font-medium">Checkboxes</legend>
      <FormControl>
        <Checkbox value="checkOne" />
        <FormControl.Label>Checkbox one</FormControl.Label>
      </FormControl>
      <FormControl>
        <Checkbox value="checkTwo" />
        <FormControl.Label>Checkbox two</FormControl.Label>
      </FormControl>
      <FormControl>
        <Checkbox value="checkThree" />
        <FormControl.Label>Checkbox three</FormControl.Label>
      </FormControl>
    </fieldset>

    <fieldset className="m-0 grid gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-sm font-medium">Switches</legend>
      <FormControl>
        <Switch defaultChecked />
        <FormControl.Label>Switch one</FormControl.Label>
      </FormControl>
      <FormControl>
        <Switch />
        <FormControl.Label>Switch two</FormControl.Label>
      </FormControl>
      <FormControl>
        <Switch />
        <FormControl.Label>Switch three</FormControl.Label>
      </FormControl>
    </fieldset>
  </div>
)

export const ValidationExample = () => {
  const [value, setValue] = useState("amara osei")
  const invalid = hasSpaces(value)

  return (
    <div className="max-w-sm w-full">
      <FormControl>
        <FormControl.Label>Username</FormControl.Label>
        <Input value={value} onChange={(event) => setValue(event.currentTarget.value)} />
        {invalid && (
          <FormControl.Validation variant="error">
            Usernames cannot contain spaces
          </FormControl.Validation>
        )}
        {!invalid && value && (
          <FormControl.Validation variant="success">Valid username</FormControl.Validation>
        )}
        <FormControl.Caption>
          With or without "@". For example "amara" or "@amara"
        </FormControl.Caption>
      </FormControl>
    </div>
  )
}

export const WithLeadingVisual = () => (
  <div className="grid gap-3">
    <FormControl>
      <FormControl.Label>Email notifications</FormControl.Label>
      <FormControl.LeadingVisual>
        <Mail />
      </FormControl.LeadingVisual>
      <Checkbox />
    </FormControl>

    <FormControl>
      <FormControl.Label>Push notifications</FormControl.Label>
      <FormControl.LeadingVisual>
        <Bell />
      </FormControl.LeadingVisual>
      <Checkbox />
      <FormControl.Caption>Sent to every device you are signed in on</FormControl.Caption>
    </FormControl>

    <FormControl disabled>
      <FormControl.Label>Public profile</FormControl.Label>
      <FormControl.LeadingVisual>
        <Globe />
      </FormControl.LeadingVisual>
      <Checkbox />
    </FormControl>

    <FormControl disabled>
      <FormControl.Label>Private workspace</FormControl.Label>
      <FormControl.LeadingVisual>
        <Lock />
      </FormControl.LeadingVisual>
      <Checkbox />
      <FormControl.Caption>Only members you invite can see it</FormControl.Caption>
    </FormControl>
  </div>
)

export const DisabledInputs = () => (
  <div className="max-w-xs grid w-full gap-4">
    <FormControl disabled>
      <FormControl.Label>Disabled checkbox</FormControl.Label>
      <Checkbox />
    </FormControl>
    <FormControl disabled>
      <FormControl.Label>Disabled input</FormControl.Label>
      <Input />
    </FormControl>
    <FormControl disabled>
      <FormControl.Label>Disabled select</FormControl.Label>
      <Select options={ROLE_OPTIONS} value="design" onChange={() => {}} />
    </FormControl>
  </div>
)

export const CustomRequired = () => (
  <div className="max-w-sm grid w-full gap-6">
    <FormControl required>
      <FormControl.Label requiredText="(required)">Form input label</FormControl.Label>
      <FormControl.Caption>
        This is a form field with a custom required indicator
      </FormControl.Caption>
      <Input />
    </FormControl>

    <p className="m-0 text-sm text-secondary">Required fields are marked with an asterisk (*)</p>
    <FormControl required>
      <FormControl.Label requiredIndicator={false}>Form input label</FormControl.Label>
      <FormControl.Caption>
        This is a form field with a required indicator that is hidden in the accessibility tree
      </FormControl.Caption>
      <Input />
    </FormControl>

    <FormControl required={false}>
      <FormControl.Label requiredText="(optional)" requiredIndicator={false}>
        Form input label
      </FormControl.Label>
      <FormControl.Caption>
        This is a form field that is marked as optional, it is not required
      </FormControl.Caption>
      <Input />
    </FormControl>
  </div>
)

export const WithCaption = () => (
  <div className="max-w-xs w-full">
    <FormControl>
      <FormControl.Label>Example label</FormControl.Label>
      <Input />
      <FormControl.Caption>Example caption</FormControl.Caption>
    </FormControl>
  </div>
)

export const WithCaptionAndDisabled = () => (
  <div className="max-w-xs w-full">
    <FormControl disabled>
      <FormControl.Label>Example label</FormControl.Label>
      <Input />
      <FormControl.Caption>Example caption</FormControl.Caption>
    </FormControl>
  </div>
)

export const WithHiddenLabel = () => (
  <div className="max-w-xs w-full">
    <FormControl>
      <FormControl.Label visuallyHidden>Example label</FormControl.Label>
      <Input placeholder="Label is visually hidden" />
    </FormControl>
  </div>
)

export const WithRequiredIndicator = () => (
  <div className="max-w-xs w-full">
    <FormControl required>
      <FormControl.Label requiredIndicator>Example label</FormControl.Label>
      <Input />
    </FormControl>
  </div>
)

export const WithSuccessValidation = () => (
  <div className="max-w-xs w-full">
    <FormControl required>
      <FormControl.Label requiredIndicator>Example label</FormControl.Label>
      <Input defaultValue="Input value" />
      <FormControl.Validation variant="success">
        Example success validation message
      </FormControl.Validation>
    </FormControl>
  </div>
)

export const WithErrorValidation = () => (
  <div className="max-w-xs w-full">
    <FormControl required>
      <FormControl.Label requiredIndicator>Example label</FormControl.Label>
      <Input defaultValue="Input value" />
      <FormControl.Validation variant="error">
        Example error validation message
      </FormControl.Validation>
    </FormControl>
  </div>
)
