import { ThirdEye } from "../types";

export const scanUSBDevices = (hass: ThirdEye) =>
  hass.callWS({ type: "usb/scan" });
