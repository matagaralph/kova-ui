import { FileUpload } from "@kova-ui/icons"
import { Button, FileInput } from "kova-ui/components"

function Example() {
  return (
    <FileInput disabled className="max-w-sm">
      <FileInput.Dropzone>
        <FileUpload aria-hidden="true" />
        <p>Uploads are paused</p>
        <p>This entry is locked while it's in review.</p>
        <FileInput.Trigger render={<Button variant="outline" size="sm" />}>
          Browse files
        </FileInput.Trigger>
      </FileInput.Dropzone>
    </FileInput>
  )
}

export { Example }
