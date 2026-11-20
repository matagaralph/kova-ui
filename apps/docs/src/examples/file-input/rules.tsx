import { FileUpload } from "@kova-ui/icons"
import { Button, FileInput, type FileRejection, formatFileSize } from "kova-ui/components"
import { useState } from "react"

const messages: Record<string, string> = {
  "file-type": "isn't an image",
  "file-too-large": "is larger than 2 MB",
  "too-many-files": "goes over the limit of 3 images",
}

function Example() {
  const [rejected, setRejected] = useState<readonly FileRejection[]>([])

  return (
    <FileInput
      multiple
      accept="image/*"
      maxFiles={3}
      maxSize={2_000_000}
      onReject={setRejected}
      onValueChange={() => setRejected([])}
      className="max-w-sm"
    >
      <FileInput.Dropzone>
        <FileUpload aria-hidden="true" />
        <p>Drop up to 3 images</p>
        <p>PNG, JPG or GIF, up to 2 MB each.</p>
        <FileInput.Trigger render={<Button color="secondary" variant="outline" size="sm" />}>
          Choose images
        </FileInput.Trigger>
      </FileInput.Dropzone>
      {rejected.length > 0 && (
        <ul className="m-0 list-none p-0 text-sm text-danger">
          {rejected.map(({ file, reasons }) => (
            <li key={file.name}>
              {file.name} {messages[reasons[0] ?? ""] ?? "can't be added"}.
            </li>
          ))}
        </ul>
      )}
      <FileInput.List aria-label="Images">
        <FileInput.Item>
          {({ file }) => (
            <>
              <span>{file.name}</span>
              <span>{formatFileSize(file.size)}</span>
              <FileInput.ItemRemove />
            </>
          )}
        </FileInput.Item>
      </FileInput.List>
    </FileInput>
  )
}

export { Example }
