import { PropertyValues } from "lit";
import { HASSDomEvent } from "../common/dom/fire_event";
import { HapticType } from "../data/haptics";
import { Constructor, ThirdEye } from "../types";
import { storeState } from "../util/ha-pref-storage";
import { HassBaseEl } from "./hass-base-mixin";

interface VibrateParams {
  vibrate: ThirdEye["vibrate"];
}

declare global {
  // for fire event
  interface HASSDomEvents {
    "hass-vibrate": VibrateParams;
  }
  // for add event listener
  interface HTMLElementEventMap {
    "hass-vibrate": HASSDomEvent<VibrateParams>;
  }
}

const hapticPatterns = {
  success: [50, 50, 50],
  warning: [100, 50, 100],
  failure: [200, 100, 200],
  light: [50],
  medium: [100],
  heavy: [200],
  selection: [20],
};

const handleHaptic = (hapticTypeEvent: HASSDomEvent<HapticType>) => {
  navigator.vibrate(hapticPatterns[hapticTypeEvent.detail]);
};

export const hapticMixin = <T extends Constructor<HassBaseEl>>(superClass: T) =>
  class extends superClass {
    protected firstUpdated(changedProps: PropertyValues) {
      super.firstUpdated(changedProps);
      this.addEventListener("hass-vibrate", (ev) => {
        const vibrate = ev.detail.vibrate;
        // @ts-expect-error not all browsers support vibrate
        if (navigator.vibrate && vibrate) {
          window.addEventListener("haptic", handleHaptic);
        } else {
          window.removeEventListener("haptic", handleHaptic);
        }
        this._updateHass({ vibrate });
        storeState(this.hass!);
      });
    }

    protected hassConnected() {
      super.hassConnected();
      // @ts-expect-error not all browsers support vibrate
      if (navigator.vibrate && this.hass!.vibrate) {
        window.addEventListener("haptic", handleHaptic);
      }
    }
  };
