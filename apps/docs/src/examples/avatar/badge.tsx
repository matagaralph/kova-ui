import { CheckCircleFilled, Clock, Mic } from "@kova-ui/icons"
import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size={32}>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/med/women/30.jpg"
          alt="Chipo Mapfumo"
        />
        <Avatar.Fallback name="Chipo Mapfumo" />
        <Avatar.Badge aria-label="Recording">
          <Mic aria-hidden="true" />
        </Avatar.Badge>
      </Avatar>
      <Avatar size={32}>
        <Avatar.Image src="https://randomuser.me/api/portraits/med/men/54.jpg" alt="Farai Gumbo" />
        <Avatar.Fallback name="Farai Gumbo" />
        <Avatar.Badge aria-label="Published">
          <CheckCircleFilled aria-hidden="true" />
        </Avatar.Badge>
      </Avatar>
      <Avatar size={32}>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/med/women/36.jpg"
          alt="Tsitsi Marufu"
        />
        <Avatar.Fallback name="Tsitsi Marufu" />
        <Avatar.Badge aria-label="In review">
          <Clock aria-hidden="true" />
        </Avatar.Badge>
      </Avatar>
    </div>
  )
}

export { Example }
