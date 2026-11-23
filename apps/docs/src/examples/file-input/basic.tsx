import { FileAudio, FileUpload } from "@kova-ui/icons"
import { Button, FileInput, formatFileSize } from "kova-ui/components"

function Example() {
  return (
    <FileInput multiple className="max-w-sm">
      <FileInput.Dropzone>
        <FileUpload aria-hidden="true" />
        <p>Drag and drop recordings here</p>
        <p>Or paste them from your clipboard.</p>
        <FileInput.Trigger render={<Button variant="outline" size="sm" />}>
          Browse recordings
        </FileInput.Trigger>
      </FileInput.Dropzone>
      <FileInput.List aria-label="Recordings">
        <FileInput.Item>
          {({ file }) => (
            <>
              <FileAudio aria-hidden="true" />
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
