import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { fireEvent } from "../../../../../common/dom/fire_event";
import { Action, ParallelAction } from "../../../../../data/script";
import { HaDeviceAction } from "./ha-automation-action-device_id";
import { haStyle } from "../../../../../resources/styles";
import type { ThirdEye } from "../../../../../types";
import "../ha-automation-action";
import "../../../../../components/ha-textfield";
import type { ActionElement } from "../ha-automation-action-row";

@customElement("ha-automation-action-parallel")
export class HaParallelAction extends LitElement implements ActionElement {
  @property({ attribute: false }) public hass!: ThirdEye;

  @property({ attribute: false }) public action!: ParallelAction;

  public static get defaultConfig() {
    return {
      parallel: [HaDeviceAction.defaultConfig],
    };
  }

  protected render() {
    const action = this.action;

    return html`
      <ha-automation-action
        .actions=${action.parallel}
        @value-changed=${this._actionsChanged}
        .hass=${this.hass}
      ></ha-automation-action>
    `;
  }

  private _actionsChanged(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as Action[];
    fireEvent(this, "value-changed", {
      value: {
        ...this.action,
        parallel: value,
      },
    });
  }

  static get styles(): CSSResultGroup {
    return haStyle;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-automation-action-parallel": HaParallelAction;
  }
}
