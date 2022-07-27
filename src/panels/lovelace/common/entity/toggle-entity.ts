import { STATES_OFF } from "../../../../common/const";
import { ThirdEye, ServiceCallResponse } from "../../../../types";
import { turnOnOffEntity } from "./turn-on-off-entity";

export const toggleEntity = (
  hass: ThirdEye,
  entityId: string
): Promise<ServiceCallResponse> => {
  const turnOn = STATES_OFF.includes(hass.states[entityId].state);
  return turnOnOffEntity(hass, entityId, turnOn);
};
