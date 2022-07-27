import { ThirdEye } from "../types";

export interface AnalyticsPreferences {
  base?: boolean;
  diagnostics?: boolean;
  usage?: boolean;
  statistics?: boolean;
}

export interface Analytics {
  preferences: AnalyticsPreferences;
}

export const getAnalyticsDetails = (hass: ThirdEye) =>
  hass.callWS<Analytics>({
    type: "analytics",
  });

export const setAnalyticsPreferences = (
  hass: ThirdEye,
  preferences: AnalyticsPreferences
) =>
  hass.callWS<AnalyticsPreferences>({
    type: "analytics/preferences",
    preferences,
  });
