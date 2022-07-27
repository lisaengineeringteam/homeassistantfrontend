import { ThirdEye } from "../types";

export const documentationUrl = (hass: ThirdEye, path: string) =>
  `https://${
    hass.config.version.includes("b")
      ? "rc"
      : hass.config.version.includes("dev")
      ? "next"
      : "www"
  }.home-assistant.io${path}`;
