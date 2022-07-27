import { ThirdEye } from "../types";

export interface InputBoolean {
  id: string;
  name: string;
  icon?: string;
  initial?: boolean;
}

export interface InputBooleanMutableParams {
  name: string;
  icon: string;
  initial: boolean;
}

export const fetchInputBoolean = (hass: ThirdEye) =>
  hass.callWS<InputBoolean[]>({ type: "input_boolean/list" });

export const createInputBoolean = (
  hass: ThirdEye,
  values: InputBooleanMutableParams
) =>
  hass.callWS<InputBoolean>({
    type: "input_boolean/create",
    ...values,
  });

export const updateInputBoolean = (
  hass: ThirdEye,
  id: string,
  updates: Partial<InputBooleanMutableParams>
) =>
  hass.callWS<InputBoolean>({
    type: "input_boolean/update",
    input_boolean_id: id,
    ...updates,
  });

export const deleteInputBoolean = (hass: ThirdEye, id: string) =>
  hass.callWS({
    type: "input_boolean/delete",
    input_boolean_id: id,
  });
