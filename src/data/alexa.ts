import { ThirdEye } from "../types";

export interface AlexaEntity {
  entity_id: string;
  display_categories: string[];
  interfaces: string[];
}

export const fetchCloudAlexaEntities = (hass: ThirdEye) =>
  hass.callWS<AlexaEntity[]>({ type: "cloud/alexa/entities" });

export const syncCloudAlexaEntities = (hass: ThirdEye) =>
  hass.callWS({ type: "cloud/alexa/sync" });
