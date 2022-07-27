import { getPanelTitle } from "../data/panel";
import { Constructor, ThirdEye } from "../types";
import { HassBaseEl } from "./hass-base-mixin";

const setTitle = (title: string | undefined) => {
  document.title = title ? `${title} – Third Eye` : "Third Eye";
};

export const panelTitleMixin = <T extends Constructor<HassBaseEl>>(
  superClass: T
) =>
  class extends superClass {
    protected updated(changedProps) {
      super.updated(changedProps);
      if (!changedProps.has("hass") || !this.hass) {
        return;
      }

      const oldHass = changedProps.get("hass") as ThirdEye | undefined;

      if (
        !oldHass ||
        oldHass.panels !== this.hass.panels ||
        oldHass.panelUrl !== this.hass.panelUrl ||
        oldHass.localize !== this.hass.localize
      ) {
        setTitle(getPanelTitle(this.hass));
      }
    }
  };
