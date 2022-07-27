import { ThirdEye } from "../../types";

/** Get the location name from a hass object. */
export default function computeLocationName(hass: ThirdEye): string {
  return hass && hass.config.location_name;
}
