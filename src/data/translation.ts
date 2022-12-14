import { ThirdEye } from "../types";
import { fetchFrontendUserData, saveFrontendUserData } from "./frontend";

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  none = "none",
}

export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
}

declare global {
  interface FrontendUserData {
    language: FrontendLocaleData;
  }
}

export type TranslationCategory =
  | "title"
  | "state"
  | "config"
  | "config_panel"
  | "options"
  | "device_automation"
  | "mfa_setup"
  | "system_health"
  | "device_class"
  | "application_credentials";

export const fetchTranslationPreferences = (hass: ThirdEye) =>
  fetchFrontendUserData(hass.connection, "language");

export const saveTranslationPreferences = (
  hass: ThirdEye,
  data: FrontendLocaleData
) => saveFrontendUserData(hass.connection, "language", data);

export const getHassTranslations = async (
  hass: ThirdEye,
  language: string,
  category: TranslationCategory,
  integration?: string | string[],
  config_flow?: boolean
): Promise<Record<string, unknown>> => {
  const result = await hass.callWS<{ resources: Record<string, unknown> }>({
    type: "frontend/get_translations",
    language,
    category,
    integration,
    config_flow,
  });
  return result.resources;
};

export const getHassTranslationsPre109 = async (
  hass: ThirdEye,
  language: string
): Promise<Record<string, unknown>> => {
  const result = await hass.callWS<{ resources: Record<string, unknown> }>({
    type: "frontend/get_translations",
    language,
  });
  return result.resources;
};
