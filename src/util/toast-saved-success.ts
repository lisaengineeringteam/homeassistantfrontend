import { ThirdEye } from "../types";
import { showToast } from "./toast";

export const showSaveSuccessToast = (el: HTMLElement, hass: ThirdEye) =>
  showToast(el, {
    message: hass!.localize("ui.common.successfully_saved"),
  });
