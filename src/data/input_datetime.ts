import { HassEntity } from "home-assistant-js-websocket";
import { ThirdEye } from "../types";

export interface InputDateTime {
  id: string;
  name: string;
  icon?: string;
  initial?: string;
  has_time: boolean;
  has_date: boolean;
}

export interface InputDateTimeMutableParams {
  name: string;
  icon: string;
  initial: string;
  has_time: boolean;
  has_date: boolean;
}

export const stateToIsoDateString = (entityState: HassEntity) =>
  `${entityState.attributes.year || "1970"}-${String(
    entityState.attributes.month || "01"
  ).padStart(2, "0")}-${String(entityState.attributes.day || "01").padStart(
    2,
    "0"
  )}T${String(entityState.attributes.hour || "00").padStart(2, "0")}:${String(
    entityState.attributes.minute || "00"
  ).padStart(2, "0")}:${String(entityState.attributes.second || "00").padStart(
    2,
    "0"
  )}`;

export const setInputDateTimeValue = (
  hass: ThirdEye,
  entityId: string,
  time: string | undefined = undefined,
  date: string | undefined = undefined
) => {
  const param = { entity_id: entityId, time, date };
  hass.callService(entityId.split(".", 1)[0], "set_datetime", param);
};

export const fetchInputDateTime = (hass: ThirdEye) =>
  hass.callWS<InputDateTime[]>({ type: "input_datetime/list" });

export const createInputDateTime = (
  hass: ThirdEye,
  values: InputDateTimeMutableParams
) =>
  hass.callWS<InputDateTime>({
    type: "input_datetime/create",
    ...values,
  });

export const updateInputDateTime = (
  hass: ThirdEye,
  id: string,
  updates: Partial<InputDateTimeMutableParams>
) =>
  hass.callWS<InputDateTime>({
    type: "input_datetime/update",
    input_datetime_id: id,
    ...updates,
  });

export const deleteInputDateTime = (hass: ThirdEye, id: string) =>
  hass.callWS({
    type: "input_datetime/delete",
    input_datetime_id: id,
  });
