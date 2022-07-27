import { atLeastVersion } from "../../common/config/version";
import { ThirdEye } from "../../types";
import { HassioResponse } from "../hassio/common";

export const restartCore = async (hass: ThirdEye) => {
  await hass.callService("thirdeye", "restart");
};

export const updateCore = async (hass: ThirdEye, backup: boolean) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    await hass.callWS({
      type: "supervisor/api",
      endpoint: "/core/update",
      method: "post",
      timeout: null,
      data: { backup },
    });
  } else {
    await hass.callApi<HassioResponse<void>>("POST", `hassio/core/update`, {
      backup,
    });
  }
};
