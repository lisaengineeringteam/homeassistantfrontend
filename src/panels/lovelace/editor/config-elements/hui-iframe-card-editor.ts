import "../../../../components/ha-form/ha-form";
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { assert, assign, object, optional, string } from "superstruct";
import { fireEvent } from "../../../../common/dom/fire_event";
import type { HaFormSchema } from "../../../../components/ha-form/types";
import type { ThirdEye } from "../../../../types";
import type { IframeCardConfig } from "../../cards/types";
import type { LovelaceCardEditor } from "../../types";
import { baseLovelaceCardConfig } from "../structs/base-card-struct";

const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    title: optional(string()),
    url: optional(string()),
    aspect_ratio: optional(string()),
  })
);

const SCHEMA: HaFormSchema[] = [
  { name: "title", selector: { text: {} } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "url", required: true, selector: { text: {} } },
      { name: "aspect_ratio", selector: { text: {} } },
    ],
  },
];

@customElement("hui-iframe-card-editor")
export class HuiIframeCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: ThirdEye;

  @state() private _config?: IframeCardConfig;

  public setConfig(config: IframeCardConfig): void {
    assert(config, cardConfigStruct);
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }

  private _computeLabelCallback = (schema: HaFormSchema) =>
    this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-iframe-card-editor": HuiIframeCardEditor;
  }
}
