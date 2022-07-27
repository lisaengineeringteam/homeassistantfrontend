import { ThirdEye } from "../../types";

/** Return an array of domains with the service. */
export const componentsWithService = (
  hass: ThirdEye,
  service: string
): Array<string> =>
  hass &&
  Object.keys(hass.services).filter((key) => service in hass.services[key]);
