import { ThirdEye } from "../types";
import { Action } from "./script";

export const callExecuteScript = (
  hass: ThirdEye,
  sequence: Action | Action[]
) =>
  hass.callWS({
    type: "execute_script",
    sequence,
  });

export const serviceCallWillDisconnect = (domain: string, service: string) =>
  domain === "thirdeye" && ["restart", "stop"].includes(service);
