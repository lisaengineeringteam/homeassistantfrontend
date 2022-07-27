import { html } from "lit";
import { ThirdEye } from "../types";
import { documentationUrl } from "../util/documentation-url";

export const analyticsLearnMore = (hass: ThirdEye) => html`<a
  .href=${documentationUrl(hass, "/integrations/analytics/")}
  target="_blank"
  rel="noreferrer"
>
  How we process your data
</a>`;
