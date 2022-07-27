import { ThirdEye } from "../types";

export interface GoogleEntity {
  entity_id: string;
  traits: string[];
  might_2fa: boolean;
}

export const fetchCloudGoogleEntities = (hass: ThirdEye) =>
  hass.callWS<GoogleEntity[]>({ type: "cloud/google_assistant/entities" });

export const syncCloudGoogleEntities = (hass: ThirdEye) =>
  hass.callApi("POST", "cloud/google_actions/sync");
