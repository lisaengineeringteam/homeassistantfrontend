import { navigate } from "../common/navigate";
import { ThirdEye } from "../types";

export interface Zone {
  id: string;
  name: string;
  icon?: string;
  latitude: number;
  longitude: number;
  passive?: boolean;
  radius?: number;
}

export interface ZoneMutableParams {
  name: string;
  icon?: string;
  latitude: number;
  longitude: number;
  passive?: boolean;
  radius?: number;
}

export const fetchZones = (hass: ThirdEye) =>
  hass.callWS<Zone[]>({ type: "zone/list" });

export const createZone = (hass: ThirdEye, values: ZoneMutableParams) =>
  hass.callWS<Zone>({
    type: "zone/create",
    ...values,
  });

export const updateZone = (
  hass: ThirdEye,
  zoneId: string,
  updates: Partial<ZoneMutableParams>
) =>
  hass.callWS<Zone>({
    type: "zone/update",
    zone_id: zoneId,
    ...updates,
  });

export const deleteZone = (hass: ThirdEye, zoneId: string) =>
  hass.callWS({
    type: "zone/delete",
    zone_id: zoneId,
  });

let inititialZoneEditorData: Partial<ZoneMutableParams> | undefined;

export const showZoneEditor = (data?: Partial<ZoneMutableParams>) => {
  inititialZoneEditorData = data;
  navigate("/config/zone/new");
};

export const getZoneEditorInitData = () => {
  const data = inititialZoneEditorData;
  inititialZoneEditorData = undefined;
  return data;
};
