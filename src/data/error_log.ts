import { ThirdEye } from "../types";

export interface LogProvider {
  key: string;
  name: string;
}

export const fetchErrorLog = (hass: ThirdEye) =>
  hass.callApi<string>("GET", "error_log");
