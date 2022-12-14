import { mdiAlert } from "@mdi/js";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators";
import "../../../components/ha-label-badge";
import "../../../components/ha-svg-icon";
import { ThirdEye } from "../../../types";
import { LovelaceBadge } from "../types";
import { ErrorBadgeConfig } from "./types";

export const createErrorBadgeElement = (config) => {
  const el = document.createElement("hui-error-badge");
  el.setConfig(config);
  return el;
};

export const createErrorBadgeConfig = (error) => ({
  type: "error",
  error,
});

@customElement("hui-error-badge")
export class HuiErrorBadge extends LitElement implements LovelaceBadge {
  public hass?: ThirdEye;

  @state() private _config?: ErrorBadgeConfig;

  public setConfig(config: ErrorBadgeConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    return html`
      <ha-label-badge label="Error" description=${this._config.error}>
        <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
      </ha-label-badge>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --ha-label-badge-color: var(--label-badge-red, #fce588);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-error-badge": HuiErrorBadge;
  }
}
