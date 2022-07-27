import { DeviceRegistryEntry } from "../../../../../../data/device_registry";
import { fetchZwaveNodeComments } from "../../../../../../data/zwave_js";
import { ThirdEye } from "../../../../../../types";
import { DeviceAlert } from "../../../ha-config-device-page";

export const getZwaveDeviceAlerts = async (
  hass: ThirdEye,
  device: DeviceRegistryEntry
): Promise<DeviceAlert[]> => {
  const nodeComments = await fetchZwaveNodeComments(hass, device.id);

  if (!nodeComments?.comments?.length) {
    return [];
  }

  return nodeComments.comments.map((comment) => ({
    level: comment.level,
    text: comment.text,
  }));
};
