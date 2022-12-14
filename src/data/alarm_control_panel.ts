import { ThirdEye } from "../types";

export const FORMAT_TEXT = "text";
export const FORMAT_NUMBER = "number";

export const callAlarmAction = (
  hass: ThirdEye,
  entity: string,
  action:
    | "arm_away"
    | "arm_home"
    | "arm_night"
    | "arm_vacation"
    | "arm_custom_bypass"
    | "disarm",
  code?: string
) => {
  hass!.callService("alarm_control_panel", `alarm_${action}`, {
    entity_id: entity,
    code,
  });
};
