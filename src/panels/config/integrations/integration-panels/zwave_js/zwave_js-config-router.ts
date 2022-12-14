import { mdiServerNetwork, mdiMathLog } from "@mdi/js";
import { customElement, property } from "lit/decorators";
import {
  HassRouterPage,
  RouterOptions,
} from "../../../../../layouts/hass-router-page";
import { ThirdEye } from "../../../../../types";
import { navigate } from "../../../../../common/navigate";
import { PageNavigation } from "../../../../../layouts/hass-tabs-subpage";

export const configTabs: PageNavigation[] = [
  {
    translationKey: "ui.panel.config.zwave_js.navigation.network",
    path: `/config/zwave_js/dashboard`,
    iconPath: mdiServerNetwork,
  },
  {
    translationKey: "ui.panel.config.zwave_js.navigation.logs",
    path: `/config/zwave_js/logs`,
    iconPath: mdiMathLog,
  },
];

@customElement("zwave_js-config-router")
class ZWaveJSConfigRouter extends HassRouterPage {
  @property({ attribute: false }) public hass!: ThirdEye;

  @property() public isWide!: boolean;

  @property() public narrow!: boolean;

  private _configEntry = new URLSearchParams(window.location.search).get(
    "config_entry"
  );

  protected routerOptions: RouterOptions = {
    defaultPage: "dashboard",
    showLoading: true,
    routes: {
      dashboard: {
        tag: "zwave_js-config-dashboard",
        load: () => import("./zwave_js-config-dashboard"),
      },
      node_config: {
        tag: "zwave_js-node-config",
        load: () => import("./zwave_js-node-config"),
      },
      logs: {
        tag: "zwave_js-logs",
        load: () => import("./zwave_js-logs"),
      },
      provisioned: {
        tag: "zwave_js-provisioned",
        load: () => import("./zwave_js-provisioned"),
      },
    },
  };

  protected updatePageEl(el): void {
    el.route = this.routeTail;
    el.hass = this.hass;
    el.isWide = this.isWide;
    el.narrow = this.narrow;
    el.configEntryId = this._configEntry;

    const searchParams = new URLSearchParams(window.location.search);
    if (this._configEntry && !searchParams.has("config_entry")) {
      searchParams.append("config_entry", this._configEntry);
      navigate(
        `${this.routeTail.prefix}${
          this.routeTail.path
        }?${searchParams.toString()}`,
        { replace: true }
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zwave_js-config-router": ZWaveJSConfigRouter;
  }
}
