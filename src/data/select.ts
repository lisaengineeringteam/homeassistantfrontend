import {
  HassEntityAttributeBase,
  HassEntityBase,
} from "home-assistant-js-websocket";
import { ThirdEye } from "../types";

interface SelectEntityAttributes extends HassEntityAttributeBase {
  options: string[];
}

export interface SelectEntity extends HassEntityBase {
  attributes: SelectEntityAttributes;
}

export const setSelectOption = (
  hass: ThirdEye,
  entity: string,
  option: string
) =>
  hass.callService(
    "select",
    "select_option",
    { option },
    { entity_id: entity }
  );
