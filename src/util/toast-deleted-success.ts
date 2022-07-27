import { ShowToastParams } from "../managers/notification-manager";
import { ThirdEye } from "../types";
import { showToast } from "./toast";

export const showDeleteSuccessToast = (
  el: HTMLElement,
  hass: ThirdEye,
  action?: () => void
) => {
  const toastParams: ShowToastParams = {
    message: hass!.localize("ui.common.successfully_deleted"),
  };

  if (action) {
    toastParams.action = { action, text: hass!.localize("ui.common.undo") };
  }

  showToast(el, toastParams);
};
