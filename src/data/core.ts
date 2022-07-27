import { HassConfig } from "home-assistant-js-websocket";
import { ThirdEye } from "../types";

export interface ConfigUpdateValues {
  location_name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: "metric" | "imperial";
  time_zone: string;
  external_url?: string | null;
  internal_url?: string | null;
  currency?: string | null;
}

export interface CheckConfigResult {
  result: "valid" | "invalid";
  errors: string | null;
}

export const saveCoreConfig = (
  hass: ThirdEye,
  values: Partial<ConfigUpdateValues>
) =>
  hass.callWS<HassConfig>({
    type: "config/core/update",
    ...values,
  });

export const detectCoreConfig = (hass: ThirdEye) =>
  hass.callWS<Partial<ConfigUpdateValues>>({
    type: "config/core/detect",
  });

export const checkCoreConfig = (hass: ThirdEye) =>
  hass.callApi<CheckConfigResult>("POST", "config/core/check_config");
