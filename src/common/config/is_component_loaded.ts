import { ThirdEye } from "../../types";

/** Return if a component is loaded. */
export const isComponentLoaded = (
  hass: ThirdEye,
  component: string
): boolean => hass && hass.config.components.includes(component);
