import { type Meta } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../Button/index.js"
import { DeleteResource } from "./index.js"

const meta = {
  title: "Components/DeleteResource",
  component: DeleteResource,
  argTypes: {
    onOpenChange: { control: false },
    onDelete: { control: false },
  },
} satisfies Meta<typeof DeleteResource>

export default meta

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Base = () => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await wait(2000)
    setIsDeleting(false)
    setOpen(false)
  }

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="Project"
        resourceName="website-redesign"
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

export const ApiKey = () => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await wait(2000)
    setIsDeleting(false)
    setOpen(false)
  }

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete API key
      </Button>
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="API key"
        resourceName="production-payments-key"
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

export const ErrorState = () => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleDelete = async () => {
    setErrorMessage("")
    setIsDeleting(true)
    await wait(2000)
    setIsDeleting(false)
    setErrorMessage("Something went wrong")
  }

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="Project"
        resourceName="website-redesign"
        onDelete={handleDelete}
        isDeleting={isDeleting}
        errorMessage={errorMessage}
      />
    </>
  )
}

export const CaseInsensitive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete workspace
      </Button>
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="Workspace"
        resourceName="Northwind Studio"
        caseSensitive={false}
        deleteButtonText="Delete forever"
        onDelete={() => setOpen(false)}
      />
    </>
  )
}
