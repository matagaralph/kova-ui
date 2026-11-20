import { File, FileUpload } from "@kova-ui/icons"
import { Button, FileInput, formatFileSize } from "kova-ui/components"

function Example() {
  return (
    <FileInput multiple className="max-w-sm">
      <FileInput.Dropzone>
        <FileUpload aria-hidden="true" />
        <p>Drag and drop files here</p>
        <p>Or paste them from your clipboard.</p>
        <FileInput.Trigger render={<Button color="secondary" variant="outline" size="sm" />}>
          Browse files
        </FileInput.Trigger>
      </FileInput.Dropzone>
      <FileInput.List aria-label="Files">
        <FileInput.Item>
          {({ file }) => (
            <>
              <File aria-hidden="true" />
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
